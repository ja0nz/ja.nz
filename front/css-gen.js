import { writeFile, readFile, rm } from "node:fs/promises";
import { format } from "prettier";
import { watch } from "chokidar";
import { chdir } from "node:process";
import { dirname, extname } from "node:path";
import resolveConfig from "tailwindcss/resolveConfig.js";
import tw from "./tailwind.config.cjs";

const { theme } = resolveConfig(tw);

/*
 * Mode arguments following the *svelte-kit* terminology
 * dev -> development
 * build -> production
 */
const mode = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

chdir("./src/css/");

/*
    Converts the tailwind config elements into custom props.
  */
let result = "";

const groups = [
  { key: "colors", prefix: "color" },
  { key: "spacing", prefix: "space" },
  { key: "fontSize", prefix: "step" },
];

// Add a note that this is auto generated
result += `
      /* VARIABLES GENERATED WITH TAILWIND.
      Tokens location: ./tailwind.config.js */

      :root {
    `;

// Loop each group's keys, use that and the associated
// property to define a :root custom prop
groups.forEach(({ key, prefix }) => {
  const group = theme[key];

  if (!group) {
    return;
  }

  Object.keys(group).forEach((key) => {
    result += `--${prefix}-${key}: ${group[key]};`;
  });
});

// Close the :root block
result += `
      }
    `;

// Make the CSS readable to help people with auto-complete in their editors
result = format(result, { parser: "scss" });

// Push this file into the CSS dir, ready to go
await writeFile(`custom-props.css`, result);

/*
 * CUBE section
 * https://cube.fyi/
 */
const genCSS = watch(["compositions", "blocks", "utilities"]).on(
  "all",
  async (event, path) => {
    const dest = `_${dirname(path)}.css`;
    if (event === "addDir") {
      await rm(`_${path}.css`, { force: true });
    }
    if (event === "add" && extname(path) === ".css") {
      await writeFile(dest, `@import "${path}";\n`, { flag: "a+" });
    }
    if (event === "unlink") {
      const file = await readFile(dest);
      const buffer = Buffer.from(file).toString("utf-8");
      await writeFile(
        dest,
        buffer.replace(new RegExp(`^.*?${path}.*?$`, "m"), "")
      );
    }
  }
);

if (mode === "build") {
  await sleep(500); // wait for the initial .on block
  await genCSS.close();
}
