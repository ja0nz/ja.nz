/*
Needed a highlighter working on raw HTML markup text. Got deep into DOM manipulation
This module exports two members:
* highlightDOMFragment: string -> DocumentFragment (f.e. for diffing nodes, el.replaceChildren, el.replaceWith)
* highlightDOMString: string -> string (f.e. for el.innerHTML)

Usage example:
 highlightDOMString(
   "<div>Highlight this</div>", // HTML markup string (f.e. obtained from el.innerHTML)
   "this", // query string (match to highlight in HTML)
   (token) => `<span style="text-decoration-line: underline;">${token}</span>`, // how to style the match
   true // optional: case sensitive match behaviour or not
 )

 Output: `<div>Highlight <span style="text-decoration-line: underline;">this</span></div>`
*/
// ------------

type Split = string | [string];

/*
 * Split each TOKEN match and interpose a non destructible highlight TOKEN in between
 * - f.e. "stringFOUNDother" -> ["string", [token], "other"]
 */
function _splitToken(
  content: string,
  token: string,
  highlight: (a: string) => string
): Split[] {
  const acc: Split[] = [];
  for (const str of content.split(token)) {
    if (acc.length % 2) acc.push([highlight(token)]);
    acc.push(str);
  }
  return acc;
}

/*
 * Convert HTML markup to DocumentFragment interposing highlighter tags
 * - generating DocumentFragment
 * - generate unique split TOKEN
 * - treewalking TEXT_NODEs
 * - split text per TOKEN && interposing highlight TOKEN
 * - flatMap over splitted text nodes escaping text for HTML parsing while leaving highlight TOKEN unescaped
 */
export function highlightDOMFragment(
  html: string,
  search: string,
  highlight: (a: string) => string,
  insentitive = true
) {
  const element = document.createRange().createContextualFragment(html);
  if (!search) return element;
  const match = element.textContent?.matchAll(
    new RegExp(search, insentitive ? "gi" : "g")
  );
  if (!match) return element;
  const uniq = [...new Set([...match].map((x) => x[0]))];

  let n: Node | null;
  const nodes: Text[] = [];
  const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  while ((n = walk.nextNode())) n && nodes.push(n as Text);
  for (const n of nodes) {
    if (!n.data) continue;

    let iterate: Split[] = [n.data];
    for (const s of uniq) {
      iterate = iterate.reduce(
        (acc: Split[], content) =>
          typeof content === "string"
            ? acc.concat(_splitToken(content, s, highlight))
            : acc.concat([content]),
        []
      );
    }

    const newText = iterate
      .flatMap((sfrag: Split) =>
        typeof sfrag === "string"
          ? sfrag
              .replaceAll("&", "&amp;")
              .replaceAll("<", "&lt;")
              .replaceAll(">", "&gt;")
          : sfrag
      )
      .join("");
    const fragment = document.createRange().createContextualFragment(newText);
    n.replaceWith(fragment);
  }
  return element;
}

/*
 * Convert HTML markup to HTML markup
 * by parsing outerHTML from a generated DocumentFragment
 */
export function highlightDOMString(
  html: string,
  search: string,
  highlight: (a: string) => string,
  insentitive = true
) {
  if (!search) return html; // protects agains SSR error
  const element = highlightDOMFragment(html, search, highlight, insentitive);
  return [].map
    .call(element.childNodes, (x: HTMLElement) => x.outerHTML)
    .join("");
}
