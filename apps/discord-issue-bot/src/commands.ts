import {
  ApplicationCommandOptionType,
  REST,
  Routes,
  type RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import type { BotConfig } from "./config.js";

export const commandNames = {
  issue: "issue",
  articleReview: "article-review",
  articleNew: "article-new",
  help: "help",
  status: "status",
  pr: "pr",
  articleCandidates: "article-candidates",
  articleCandidateSelect: "article-candidate-select",
} as const;

export type SupportedCommandName = (typeof commandNames)[keyof typeof commandNames];

export const commandDefinitions: RESTPostAPIApplicationCommandsJSONBody[] = [
  {
    name: commandNames.issue,
    description: "Create a general Codex task GitHub Issue.",
    options: [
      {
        name: "summary",
        description: "Short task summary.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "purpose",
        description: "Why this task is needed.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "scope",
        description: "Target page, feature, file, or area.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "allowed_changes",
        description: "What may be changed.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "forbidden_changes",
        description: "What must not be changed.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "verification",
        description: "Expected verification method.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name: commandNames.articleReview,
    description: "Create a GitHub Issue for improving an existing article or draft.",
    options: [
      {
        name: "slug",
        description: "Target article or draft slug.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "source",
        description: "Target source type.",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "draft article", value: "draft article" },
          { name: "published article", value: "published article" },
          { name: "unsure", value: "unsure" },
        ],
      },
      {
        name: "goal",
        description: "Improvement goal.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "fact_check",
        description: "Whether fact check is required.",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "required", value: "required" },
          { name: "not required", value: "not_required" },
          { name: "let Codex decide", value: "codex_decides" },
        ],
      },
      {
        name: "additions",
        description: "Content that should be added.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "internal_links",
        description: "Candidate internal links.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "forbidden_changes",
        description: "Slug, URL, or content constraints.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name: commandNames.articleNew,
    description: "Create a GitHub Issue for a new draft article.",
    options: [
      {
        name: "topic",
        description: "Article topic.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "target_reader",
        description: "Target reader.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "fact_check",
        description: "Whether fact check is required.",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "required", value: "required" },
          { name: "not required", value: "not_required" },
          { name: "let Codex decide", value: "codex_decides" },
        ],
      },
      {
        name: "category",
        description: "Expected category.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "search_intent",
        description: "Reader problem or search intent.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "difference",
        description: "Difference from existing articles.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "internal_links",
        description: "Candidate internal links.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name: commandNames.help,
    description: "Show the safe operating guide for this bot.",
  },
  {
    name: commandNames.status,
    description: "Show recent open GitHub Issues and Pull Requests.",
  },
  {
    name: commandNames.pr,
    description: "Show recent open GitHub Pull Requests.",
  },
  {
    name: commandNames.articleCandidates,
    description: "Show latest article candidates without creating an Issue.",
    options: [
      {
        name: "candidate",
        description: "Candidate number for detail view.",
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: "limit",
        description: "Number of candidates to show in list view.",
        type: ApplicationCommandOptionType.Integer,
        required: false,
        min_value: 1,
        max_value: 10,
      },
    ],
  },
  {
    name: commandNames.articleCandidateSelect,
    description: "Create a GitHub Issue from a selected article candidate.",
    options: [
      {
        name: "candidate",
        description: "Candidate number to create an Issue from.",
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
      {
        name: "note",
        description: "User note for Codex.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "priority",
        description: "Priority note for this request.",
        type: ApplicationCommandOptionType.String,
        required: false,
        choices: [
          { name: "high", value: "high" },
          { name: "normal", value: "normal" },
          { name: "low", value: "low" },
        ],
      },
    ],
  },
];

export async function registerCommands(config: BotConfig): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(config.discordBotToken);

  if (config.discordGuildId) {
    await rest.put(
      Routes.applicationGuildCommands(config.discordApplicationId, config.discordGuildId),
      { body: commandDefinitions },
    );
    console.log(`Registered ${commandDefinitions.length} guild commands.`);
    return;
  }

  await rest.put(Routes.applicationCommands(config.discordApplicationId), {
    body: commandDefinitions,
  });
  console.log(`Registered ${commandDefinitions.length} global commands.`);
}
