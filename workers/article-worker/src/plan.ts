import path from "path";
import { defaultDraftOutputDir } from "./config";
import { writeContentPlan } from "./content-planner";

function main(): void {
  const args = process.argv.slice(2);
  const topic = readStringArg(args, "--topic");
  const outputDirArg = readStringArg(args, "--output-dir");
  const outputDir = outputDirArg
    ? path.resolve(outputDirArg)
    : path.join(defaultDraftOutputDir, "_worker-reports");

  if (!topic) {
    throw new Error("--topic is required");
  }

  const outputPath = writeContentPlan({
    topic,
    outputDir,
  });

  console.log(`Article planning report written: ${outputPath}`);
}

function readStringArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index < 0) {
    return undefined;
  }

  return args[index + 1];
}

try {
  main();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Article Worker planning failed: ${message}`);
  process.exitCode = 1;
}
