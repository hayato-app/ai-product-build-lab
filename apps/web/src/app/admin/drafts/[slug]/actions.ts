"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function updateDraftReviewAction(formData: FormData) {
  const token = readString(formData, "token");
  const slug = readString(formData, "slug");
  const action = readString(formData, "review_action");
  const reviewNotes = readString(formData, "review_notes");

  if (!isDraftReviewAllowed(token)) {
    throw new Error("Draft review token is invalid.");
  }

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
  redirect(`/admin/drafts/${slug}?token=${encodeURIComponent(token)}`);
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
