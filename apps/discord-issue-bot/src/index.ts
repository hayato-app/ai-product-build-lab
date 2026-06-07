import {
  Client,
  GatewayIntentBits,
  MessageFlags,
  type ChatInputCommandInteraction,
} from "discord.js";
import { checkInteractionAccess } from "./access-control.js";
import {
  type CandidateFileType,
  findArticleCandidate,
  formatCandidateDetail,
  formatCandidateList,
  isSelectableCandidate,
  loadLatestCandidateFile,
} from "./articleCandidates.js";
import { commandNames } from "./commands.js";
import { loadConfig } from "./config.js";
import {
  createGitHubIssue,
  getGitHubStatusSummary,
  listRecentOpenPullRequests,
  type GitHubListItem,
} from "./github.js";
import {
  buildArticleNewPayload,
  buildArticleCandidateSelectPayload,
  buildArticleReviewPayload,
  buildIssuePayload,
  type IssuePayload,
} from "./issueBodies.js";

function option(interaction: ChatInputCommandInteraction, name: string): string | undefined {
  return interaction.options.getString(name) ?? undefined;
}

function candidateFileType(
  interaction: ChatInputCommandInteraction,
): CandidateFileType | undefined {
  const type = interaction.options.getString("type");

  if (type === "daily" || type === "weekly") {
    return type;
  }

  return undefined;
}

function payloadFromInteraction(interaction: ChatInputCommandInteraction): IssuePayload {
  switch (interaction.commandName) {
    case commandNames.issue:
      return buildIssuePayload({
        summary: interaction.options.getString("summary", true),
        purpose: interaction.options.getString("purpose", true),
        scope: option(interaction, "scope"),
        allowedChanges: option(interaction, "allowed_changes"),
        forbiddenChanges: option(interaction, "forbidden_changes"),
        verification: option(interaction, "verification"),
      });

    case commandNames.articleReview:
      return buildArticleReviewPayload({
        slug: interaction.options.getString("slug", true),
        source: interaction.options.getString("source", true),
        goal: interaction.options.getString("goal", true),
        additions: option(interaction, "additions"),
        internalLinks: option(interaction, "internal_links"),
        factCheck: interaction.options.getString("fact_check", true),
        forbiddenChanges: option(interaction, "forbidden_changes"),
      });

    case commandNames.articleNew:
      return buildArticleNewPayload({
        topic: interaction.options.getString("topic", true),
        category: option(interaction, "category"),
        targetReader: interaction.options.getString("target_reader", true),
        searchIntent: option(interaction, "search_intent"),
        difference: option(interaction, "difference"),
        internalLinks: option(interaction, "internal_links"),
        factCheck: interaction.options.getString("fact_check", true),
      });

    case commandNames.articleCandidateSelect: {
      const candidateFile = loadLatestCandidateFile(candidateFileType(interaction));
      const candidateNumber = interaction.options.getInteger("candidate", true);
      const candidate = findArticleCandidate(candidateFile, candidateNumber);

      if (!candidate) {
        throw new Error(`Article candidate ${candidateNumber} was not found.`);
      }

      if (!isSelectableCandidate(candidate)) {
        throw new Error(
          `Article candidate ${candidateNumber} is not selectable because its status is ${candidate.status || "available"}.`,
        );
      }

      return buildArticleCandidateSelectPayload({
        candidateFile,
        candidate,
        note: option(interaction, "note"),
        priority: option(interaction, "priority"),
      });
    }

    default:
      throw new Error(`Unsupported command: ${interaction.commandName}`);
  }
}

function publicErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("Missing required environment variables")) {
      return "Bot configuration is incomplete. Please check environment variables.";
    }

    if (error.message.includes("GitHub Issue creation failed")) {
      return "GitHub Issue creation failed. Please check token permissions and repository settings.";
    }

    if (error.message.includes("GitHub read failed")) {
      return "GitHubの情報取得に失敗しました。tokenのIssue/PR読み取り権限を確認してください。";
    }

    if (error.message.includes("Article candidate") && error.message.includes("was not found")) {
      return "指定された記事候補が見つかりませんでした。/article-candidates で候補番号を確認してください。";
    }

    if (error.message.includes("Article candidate files were not found")) {
      return "指定されたtypeの記事候補ファイルが見つかりませんでした。dailyまたはweeklyの候補ファイルが作成済みか確認してください。";
    }

    if (error.message.includes("is not selectable")) {
      return "指定された記事候補は現在選択できません。/article-candidates でStatusが available の候補を選んでください。";
    }
  }

  return "Issue creation failed. Please check the bot logs.";
}

async function safeDeferReply(interaction: ChatInputCommandInteraction): Promise<boolean> {
  try {
    if (interaction.deferred || interaction.replied) {
      return true;
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    return true;
  } catch (error) {
    console.error("Failed to defer interaction:", error instanceof Error ? error.message : error);
    return false;
  }
}

async function safeReply(interaction: ChatInputCommandInteraction, message: string): Promise<void> {
  try {
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(message);
      return;
    }

    await interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  } catch (error) {
    console.error("Failed to send Discord reply:", error instanceof Error ? error.message : error);
  }
}

function githubInput(config: ReturnType<typeof loadConfig>) {
  return {
    owner: config.githubOwner,
    repo: config.githubRepo,
    token: config.githubIssueToken,
  };
}

function formatGitHubItems(items: GitHubListItem[], emptyText: string): string {
  if (items.length === 0) {
    return emptyText;
  }

  return items.map((item) => `#${item.number} ${item.title}\n${item.htmlUrl}`).join("\n");
}

function helpMessage(): string {
  return [
    "利用できるコマンド:",
    "- /issue: Codex向けの一般作業Issueを作成します。",
    "- /article-review: 既存記事またはドラフト記事の改善Issueを作成します。",
    "- /article-new: 新規記事下書きの作成Issueを作成します。",
    "- /status: open Issueとopen PRを確認します。",
    "- /pr: open PRを確認します。",
    "- /article-candidates: 最新の記事候補を確認します。",
    "- /article-candidate-select: 選択した記事候補からGitHub Issueを作成します。",
    "",
    "このBotはGitHub Issue作成、状態確認、候補確認だけを行います。ファイル編集、push、VPS操作、公開操作は行いません。",
  ].join("\n");
}

async function handleReadOnlyCommand(
  config: ReturnType<typeof loadConfig>,
  interaction: ChatInputCommandInteraction,
): Promise<boolean> {
  switch (interaction.commandName) {
    case commandNames.help:
      await safeReply(interaction, helpMessage());
      return true;

    case commandNames.status: {
      const canReply = await safeDeferReply(interaction);
      if (!canReply) {
        return true;
      }

      const summary = await getGitHubStatusSummary(githubInput(config));
      await safeReply(
        interaction,
        [
          "GitHubの現在状況です。",
          "",
          "Open Issues:",
          formatGitHubItems(summary.issues, "現在表示できるopen Issueはありません。"),
          "",
          "Open PRs:",
          formatGitHubItems(summary.pullRequests, "現在表示できるopen PRはありません。"),
        ].join("\n"),
      );
      return true;
    }

    case commandNames.pr: {
      const canReply = await safeDeferReply(interaction);
      if (!canReply) {
        return true;
      }

      const pullRequests = await listRecentOpenPullRequests(githubInput(config));
      await safeReply(
        interaction,
        ["Open PRs:", formatGitHubItems(pullRequests, "現在表示できるopen PRはありません。")].join(
          "\n",
        ),
      );
      return true;
    }

    case commandNames.articleCandidates: {
      const canReply = await safeDeferReply(interaction);
      if (!canReply) {
        return true;
      }

      const candidateFile = loadLatestCandidateFile(candidateFileType(interaction));
      const candidateNumber = interaction.options.getInteger("candidate") ?? undefined;
      const limit = interaction.options.getInteger("limit") ?? 5;

      await safeReply(
        interaction,
        candidateNumber
          ? formatCandidateDetail(candidateFile, candidateNumber)
          : formatCandidateList(candidateFile, limit),
      );
      return true;
    }

    default:
      return false;
  }
}

async function main(): Promise<void> {
  const config = loadConfig();

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once("clientReady", (readyClient) => {
    console.log(`Discord Issue Bot logged in as ${readyClient.user.tag}.`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    try {
      const access = checkInteractionAccess(config, interaction);
      if (!access.allowed) {
        await safeReply(interaction, access.reason ?? "このBotを利用できません。");
        return;
      }

      if (await handleReadOnlyCommand(config, interaction)) {
        return;
      }

      const canReply = await safeDeferReply(interaction);
      if (!canReply) {
        console.error(
          `Skipping issue creation because /${interaction.commandName} could not be acknowledged.`,
        );
        return;
      }

      const payload = payloadFromInteraction(interaction);
      const createdIssue = await createGitHubIssue({
        ...githubInput(config),
        title: payload.title,
        body: payload.body,
        labels: payload.labels,
      });

      console.log(
        `Created issue #${createdIssue.number} from /${interaction.commandName} by ${interaction.user.id}.`,
      );

      await safeReply(interaction, `GitHub Issueを作成しました: ${createdIssue.htmlUrl}`);
    } catch (error) {
      console.error("Issue creation error:", error instanceof Error ? error.message : error);

      await safeReply(interaction, publicErrorMessage(error));
    }
  });

  await client.login(config.discordBotToken);
}

main().catch((error) => {
  console.error("Discord Issue Bot failed to start:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
