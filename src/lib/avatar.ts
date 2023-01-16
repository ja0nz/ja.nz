import { createAvatar as cA } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

export const createAvatar = (seed?: string, bgColor?: string) =>
  cA(bottts, {
    seed,
    scale: 110,
    radius: 40,
    backgroundColor: [bgColor || "transparent"],
  }).toString();
