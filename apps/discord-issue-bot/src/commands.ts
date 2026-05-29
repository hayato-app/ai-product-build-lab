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
