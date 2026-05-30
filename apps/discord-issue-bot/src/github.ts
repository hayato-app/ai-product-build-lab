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

export type GitHubListItem = {
  number: number;
  title: string;
  htmlUrl: string;
};

export type GitHubStatusSummary = {
  issues: GitHubListItem[];
  pullRequests: GitHubListItem[];
};

type GitHubIssueResponse = {
  number?: number;
  html_url?: string;
  message?: string;
};

type GitHubIssueListResponseItem = {
  number?: number;
  title?: string;
  html_url?: string;
  pull_request?: unknown;
};

type GitHubPullRequestListResponseItem = {
  number?: number;
  title?: string;
  html_url?: string;
};

type GitHubErrorResponse = {
  message?: string;
};

type GitHubRepositoryInput = {
  owner: string;
  repo: string;
  token: string;
};

async function fetchGitHubJson<T>(input: GitHubRepositoryInput, path: string): Promise<T> {
  const response = await fetch(`https://api.github.com/repos/${input.owner}/${input.repo}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${input.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const data = (await response.json()) as T | GitHubErrorResponse;

  if (!response.ok) {
    const message =
      typeof (data as GitHubErrorResponse).message === "string"
        ? `: ${(data as GitHubErrorResponse).message}`
        : "";
    throw new Error(`GitHub read failed (${response.status})${message}`);
  }

  return data as T;
}

function normalizeListItem(item: GitHubIssueListResponseItem | GitHubPullRequestListResponseItem) {
  if (typeof item.number !== "number" || !item.title || !item.html_url) {
    return undefined;
  }

  return {
    number: item.number,
    title: item.title,
    htmlUrl: item.html_url,
  };
}

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

export async function listRecentOpenIssues(
  input: GitHubRepositoryInput,
  limit = 5,
): Promise<GitHubListItem[]> {
  const data = await fetchGitHubJson<GitHubIssueListResponseItem[]>(
    input,
    "/issues?state=open&per_page=30",
  );

  return data
    .filter((item) => !item.pull_request)
    .map(normalizeListItem)
    .filter((item): item is GitHubListItem => Boolean(item))
    .slice(0, limit);
}

export async function listRecentOpenPullRequests(
  input: GitHubRepositoryInput,
  limit = 5,
): Promise<GitHubListItem[]> {
  const data = await fetchGitHubJson<GitHubPullRequestListResponseItem[]>(
    input,
    `/pulls?state=open&per_page=${limit}`,
  );

  return data
    .map(normalizeListItem)
    .filter((item): item is GitHubListItem => Boolean(item))
    .slice(0, limit);
}

export async function getGitHubStatusSummary(
  input: GitHubRepositoryInput,
): Promise<GitHubStatusSummary> {
  const [issues, pullRequests] = await Promise.all([
    listRecentOpenIssues(input),
    listRecentOpenPullRequests(input),
  ]);

  return {
    issues,
    pullRequests,
  };
}
