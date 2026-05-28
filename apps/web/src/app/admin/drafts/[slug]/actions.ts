"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  isDraftReviewAllowed,
  publishApprovedDraft,
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

export async function updateDraftReviewAction(formData: FormData) {
  const token = readString(formData, "token");
  const slug = readString(formData, "slug");
  const action = readString(formData, "review_action");
  const reviewNotes = readString(formData, "review_notes");

  if (!isDraftReviewAllowed(token)) {
    throw new Error("Draft review token is invalid.");
  }

  let nextUrl = `/admin/drafts/${slug}?token=${encodeURIComponent(token)}`;

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
    nextUrl += `&saved=${encodeURIComponent(action)}`;
  } catch (error) {
    nextUrl += `&error=${encodeURIComponent(errorMessage(error))}`;
  }

  redirect(nextUrl);
}

export async function publishDraftAction(formData: FormData) {
  const token = readString(formData, "token");
  const slug = readString(formData, "slug");

  if (!isDraftReviewAllowed(token)) {
    throw new Error("Draft review token is invalid.");
  }

  let nextUrl = `/admin/drafts?token=${encodeURIComponent(token)}`;

  try {
    publishApprovedDraft(slug);
    revalidatePath("/admin/drafts");
    revalidatePath("/articles");
    revalidatePath(`/articles/${slug}`);
    nextUrl += `&published=${encodeURIComponent(slug)}`;
  } catch (error) {
    nextUrl = `/admin/drafts/${slug}?token=${encodeURIComponent(
      token,
    )}&error=${encodeURIComponent(errorMessage(error))}`;
  }

  redirect(nextUrl);
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
