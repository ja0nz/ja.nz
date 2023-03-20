/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />
import { Alpine as AlpineType } from "alpinejs";

declare global {
  var Alpine: AlpineType;
}
