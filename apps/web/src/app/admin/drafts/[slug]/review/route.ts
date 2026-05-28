import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  isDraftReviewAllowed,
  updateDraftReview,
  type DraftReviewInput,
} from "@/lib/drafts";

const statusByAction: Record<
  string,
  Pick<DraftReviewInput, "reviewStatus" | "reviewResult">
> = {
  approve: {
    reviewStatus: "approved",
    reviewResult: "ok",
  },
  reject: {
    reviewStatus: "rejected",
    reviewResult: "ng",
  },
  changes: {
    reviewStatus: "changes_requested",
    reviewResult: "pending",
  },
  reset: {
    reviewStatus: "needs_review",
    reviewResult: "pending",
  },
};

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const formData = await request.formData();
  const token = readString(formData, "token");
  const action = readString(formData, "review_action");
  const reviewNotes = readString(formData, "review_notes");
  const nextUrl = new URL(`/admin/drafts/${slug}`, request.url);

  nextUrl.searchParams.set("token", token);

  if (!isDraftReviewAllowed(token)) {
    nextUrl.searchParams.set("error", "Draft review token is invalid.");
    return NextResponse.redirect(nextUrl);
  }

  try {
    const nextState = statusByAction[action];

    if (!nextState) {
      throw new Error(`Unknown review action: ${action}`);
    }

    updateDraftReview({
      slug,
      reviewNotes,
      ...nextState,
    });

    revalidatePath("/admin/drafts");
    revalidatePath(`/admin/drafts/${slug}`);
    nextUrl.searchParams.set("saved", action);
  } catch (error) {
    nextUrl.searchParams.set("error", errorMessage(error));
  }

  return NextResponse.redirect(nextUrl);
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
