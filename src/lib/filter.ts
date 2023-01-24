import type { Fn } from "@thi.ng/api";
import { filterFuzzy } from "@thi.ng/transducers";

/* Create Filter */
export const filterFuzzFn = <T>(target: T[], getFn: Fn<T, string>) => {
  const fn = (s: T) => getFn(s).toLowerCase();
  const all = target.flatMap((x) => fn(x).split(" "));
  return (search: string) => {
    // Multiple words search query
    if (search.includes(" ")) {
      return [...filterFuzzy(search.toLowerCase(), { key: fn }, target)];
    }
    // Single word search query
    const uniq = [...filterFuzzy(search.toLowerCase(), all)];
    return target.filter((x) => uniq.some((y) => fn(x).includes(y)));
  };
};

export const filterFn =
  <T>(target: T[], getFn: Fn<T, string>) =>
  (search: string) => {
    const r = new RegExp(search, "ig");
    return target.filter((x) => r.test(getFn(x)));
  };

/* Create RegExp */
export const regExpF = (s: string) =>
  new RegExp(`(${s.split("").join("\\S*")})`, "ig");
export const regExp = (s: string) => new RegExp(`(${s})`, "ig");

/* Highlight */
export const createHighlight =
  (r: Fn<string, RegExp>, css: string[]) => (search: string, el: string) => {
    if (search === "") return el;
    return el.replaceAll(r(search), `<span class="${css.join(" ")}">$1</span>`);
  };
