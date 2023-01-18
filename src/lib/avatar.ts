import { createAvatar as cA, Result } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import { comp } from "@thi.ng/compose";
import { default as svgToMiniDataURI } from "mini-svg-data-uri";

export const createAvatar = (seed?: string) =>
  comp(
    svgToMiniDataURI,
    (x: Result) => x.toString(),
    cA
  )(bottts, { seed, scale: 90 });
