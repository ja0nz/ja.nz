import { getMDContent } from "../lib/api";
import { transduce, last } from "@thi.ng/transducers";

export async function get({ params }) {
  const slug = params.slug;
  if (!Number(slug)) return { status: 404 };
  const url = `https://api.ja.nz/v1`;
  const response = await fetch(url);
  const json = response.ok ? await response.json() : [];
  const content = transduce(getMDContent(params.slug), last(), json);
  return {
    body: {
      content,
    },
  };
}
