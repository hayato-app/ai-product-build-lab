export type CreateIssueInput = {
  owner: string;
  repo: string;
  token: string;
  title: string;
  body: string;
  labels: string[];
};

export type CreatedIssue = {
  number: number;
  htmlUrl: string;
};

type GitHubIssueResponse = {
  number?: number;
  html_url?: string;
  message?: string;
};

export async function createGitHubIssue(input: CreateIssueInput): Promise<CreatedIssue> {
  const response = await fetch(
    `https://api.github.com/repos/${input.owner}/${input.repo}/issues`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${input.token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        title: input.title,
        body: input.body,
        labels: input.labels,
      }),
    },
  );

  const data = (await response.json()) as GitHubIssueResponse;

  if (!response.ok || typeof data.number !== "number" || !data.html_url) {
    const message = data.message ? `: ${data.message}` : "";
    throw new Error(`GitHub Issue creation failed (${response.status})${message}`);
  }

  return {
    number: data.number,
    htmlUrl: data.html_url,
  };
}
