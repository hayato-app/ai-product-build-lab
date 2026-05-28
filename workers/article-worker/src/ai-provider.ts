import OpenAI from "openai";

const defaultModel = "gpt-4.1-mini";

export async function generateArticleWithAi(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Set it in the environment before running generate:ai.",
    );
  }

  const model = process.env.ARTICLE_WORKER_MODEL || defaultModel;
  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model,
    input: prompt,
  });

  const outputText = response.output_text?.trim();

  if (!outputText) {
    throw new Error("OpenAI API returned an empty article response.");
  }

  return stripMarkdownFence(outputText);
}

export function getArticleWorkerModel(): string {
  return process.env.ARTICLE_WORKER_MODEL || defaultModel;
}

function stripMarkdownFence(markdown: string): string {
  const match = markdown.match(/^```(?:markdown|md)?\s*\r?\n([\s\S]*?)\r?\n```$/i);
  return (match ? match[1] : markdown).trim();
}
