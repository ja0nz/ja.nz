import { createAvatar as cA } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

export const createAvatar = (seed?: string) =>
  cA(bottts, { seed, scale: 90 }).toDataUri();
