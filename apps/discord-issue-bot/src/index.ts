import {
  Client,
  GatewayIntentBits,
  type ChatInputCommandInteraction,
} from "discord.js";
import { commandNames } from "./commands.js";
import { loadConfig } from "./config.js";
import { createGitHubIssue } from "./github.js";
import {
  buildArticleNewPayload,
  buildArticleReviewPayload,
  buildIssuePayload,
  type IssuePayload,
} from "./issueBodies.js";
import { registerCommands } from "./commands.js";

function option(interaction: ChatInputCommandInteraction, name: string): string | undefined {
  return interaction.options.getString(name) ?? undefined;
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
  }

  return "Issue creation failed. Please check the bot logs.";
}

async function safeDeferReply(interaction: ChatInputCommandInteraction): Promise<boolean> {
  try {
    if (interaction.deferred || interaction.replied) {
      return true;
    }

    await interaction.deferReply({ ephemeral: true });
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

    await interaction.reply({ content: message, ephemeral: true });
  } catch (error) {
    console.error("Failed to send Discord reply:", error instanceof Error ? error.message : error);
  }
}

async function main(): Promise<void> {
  const config = loadConfig();

  await registerCommands(config);

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
      const canReply = await safeDeferReply(interaction);

      const payload = payloadFromInteraction(interaction);
      const createdIssue = await createGitHubIssue({
        owner: config.githubOwner,
        repo: config.githubRepo,
        token: config.githubIssueToken,
        title: payload.title,
        body: payload.body,
        labels: payload.labels,
      });

      console.log(
        `Created issue #${createdIssue.number} from /${interaction.commandName} by ${interaction.user.id}.`,
      );

      if (canReply) {
        await safeReply(interaction, `GitHub Issueを作成しました: ${createdIssue.htmlUrl}`);
      }
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
