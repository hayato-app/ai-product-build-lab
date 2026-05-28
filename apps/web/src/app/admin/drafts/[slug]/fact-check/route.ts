import { revalidatePath } from "next/cache";
import { isDraftReviewAllowed, updateDraftFactCheck } from "@/lib/drafts";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const formData = await request.formData();
  const token = readString(formData, "token");
  const action = readString(formData, "fact_check_action");
  const nextParams = new URLSearchParams({ token });

  if (!isDraftReviewAllowed(token)) {
    nextParams.set("error", "レビュー用トークンが正しくありません。");
    return redirectTo(`/admin/drafts/${slug}?${nextParams.toString()}`);
  }

  try {
    if (action === "required") {
      updateDraftFactCheck(slug, "required");
      nextParams.set("saved", "fact_check_required");
    } else if (action === "done") {
      updateDraftFactCheck(slug, "completed");
      nextParams.set("saved", "fact_check_done");
    } else if (action === "not_started") {
      updateDraftFactCheck(slug, "not_started");
      nextParams.set("saved", "fact_check_not_started");
    } else {
      throw new Error(`Unknown fact check action: ${action}`);
    }

    revalidatePath("/admin/drafts");
    revalidatePath(`/admin/drafts/${slug}`);
  } catch (error) {
    nextParams.set("error", errorMessage(error));
  }

  return redirectTo(`/admin/drafts/${slug}?${nextParams.toString()}`);
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
