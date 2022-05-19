import type { RequestEvent } from "@sveltejs/kit/types/private";

export async function get({ url }: RequestEvent) {
  const query = url.searchParams.toString();
  return {
    status: 301,
    headers: { Location: `/:${query ? `?${query}` : ""}` },
  };
}
