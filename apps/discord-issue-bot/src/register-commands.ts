import { registerCommands } from "./commands.js";
import { loadConfig } from "./config.js";

async function main(): Promise<void> {
  const config = loadConfig();
  await registerCommands(config);
}

main().catch((error) => {
  console.error("Slash command registration failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
