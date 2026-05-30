import type { ChatInputCommandInteraction } from "discord.js";
import type { BotConfig } from "./config.js";

export type AccessDecision = {
  allowed: boolean;
  reason?: string;
};

export function checkInteractionAccess(
  config: BotConfig,
  interaction: ChatInputCommandInteraction,
): AccessDecision {
  if (
    config.discordAllowedUserIds.length > 0 &&
    !config.discordAllowedUserIds.includes(interaction.user.id)
  ) {
    return {
      allowed: false,
      reason: "このBotを利用できるユーザーに含まれていません。",
    };
  }

  if (
    config.discordAllowedChannelIds.length > 0 &&
    !config.discordAllowedChannelIds.includes(interaction.channelId)
  ) {
    return {
      allowed: false,
      reason: "このチャンネルではBotを利用できません。",
    };
  }

  return { allowed: true };
}
