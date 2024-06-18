import { bottts } from "@dicebear/collection";
import { createAvatar as cA } from "@dicebear/core";
import type { Result } from "@dicebear/core";
import { comp } from "@thi.ng/compose";
import { default as svgToMiniDataURI } from "mini-svg-data-uri";

export const createAvatar = (seed?: string) =>
  comp(
    svgToMiniDataURI,
    (x: Result) => x.toString(),
    cA,
  )(bottts, { seed, scale: 90 });
