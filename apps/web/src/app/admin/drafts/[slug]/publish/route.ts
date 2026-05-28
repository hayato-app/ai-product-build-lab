import { revalidatePath } from "next/cache";
import { isDraftReviewAllowed, publishApprovedDraft } from "@/lib/drafts";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const formData = await request.formData();
  const token = readString(formData, "token");

  if (!isDraftReviewAllowed(token)) {
    const params = new URLSearchParams({
      token,
      error: "Draft review token is invalid.",
    });
    return redirectTo(`/admin/drafts/${slug}?${params.toString()}`);
  }

  try {
    publishApprovedDraft(slug);
    revalidatePath("/admin/drafts");
    revalidatePath("/articles");
    revalidatePath(`/articles/${slug}`);

    const params = new URLSearchParams({ token, published: slug });
    return redirectTo(`/admin/drafts?${params.toString()}`);
  } catch (error) {
    const params = new URLSearchParams({
      token,
      error: errorMessage(error),
    });
    return redirectTo(`/admin/drafts/${slug}?${params.toString()}`);
  }
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function redirectTo(location: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
    },
  });
}
