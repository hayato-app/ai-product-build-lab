export type BotConfig = {
  discordBotToken: string;
  discordApplicationId: string;
  discordGuildId?: string;
  discordAllowedUserIds: string[];
  discordAllowedChannelIds: string[];
  githubOwner: string;
  githubRepo: string;
  githubIssueToken: string;
};

const requiredEnv = [
  "DISCORD_BOT_TOKEN",
  "DISCORD_APPLICATION_ID",
  "GITHUB_OWNER",
  "GITHUB_REPO",
  "GITHUB_ISSUE_TOKEN",
] as const;

function parseCsvEnv(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function loadConfig(): BotConfig {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    discordBotToken: process.env.DISCORD_BOT_TOKEN!,
    discordApplicationId: process.env.DISCORD_APPLICATION_ID!,
    discordGuildId: process.env.DISCORD_GUILD_ID,
    discordAllowedUserIds: parseCsvEnv(process.env.DISCORD_ALLOWED_USER_IDS),
    discordAllowedChannelIds: parseCsvEnv(process.env.DISCORD_ALLOWED_CHANNEL_IDS),
    githubOwner: process.env.GITHUB_OWNER!,
    githubRepo: process.env.GITHUB_REPO!,
    githubIssueToken: process.env.GITHUB_ISSUE_TOKEN!,
  };
}
