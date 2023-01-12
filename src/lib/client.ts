import type { Fn } from "@thi.ng/api";
// import { filterFuzzy } from "@thi.ng/transducers";
// export const createFilterFuzzy =
//   <T>(getFn: Fn<T, string>) =>
//   (search: string, target: T[]) =>
//     [...filterFuzzy(search, { key: getFn }, target)];

export const createFilter =
  <T>(target: T[], getFn: Fn<T, string>) =>
  (search: string) => {
    const r = new RegExp(search, "ig");
    return target.filter((x) => r.test(getFn(x)));
  };

export const highlightSearch =
  (css: string[]) => (search: string, el: string) => {
    if (search === "") return el;
    return el.replaceAll(
      new RegExp(`(${search})`, "ig"),
      `<strong class="${css.join(" ")}">$1</strong>`
    );
  };
