import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
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
    const errorUrl = new URL(`/admin/drafts/${slug}`, request.url);
    errorUrl.searchParams.set("token", token);
    errorUrl.searchParams.set("error", "Draft review token is invalid.");
    return NextResponse.redirect(errorUrl);
  }

  try {
    publishApprovedDraft(slug);
    revalidatePath("/admin/drafts");
    revalidatePath("/articles");
    revalidatePath(`/articles/${slug}`);

    const publishedUrl = new URL("/admin/drafts", request.url);
    publishedUrl.searchParams.set("token", token);
    publishedUrl.searchParams.set("published", slug);
    return NextResponse.redirect(publishedUrl);
  } catch (error) {
    const errorUrl = new URL(`/admin/drafts/${slug}`, request.url);
    errorUrl.searchParams.set("token", token);
    errorUrl.searchParams.set("error", errorMessage(error));
    return NextResponse.redirect(errorUrl);
  }
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
