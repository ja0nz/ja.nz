{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = with pkgs; [
    yarn
    nixfmt
    just
    nodePackages.ts-node
    nodePackages.typescript-language-server
    nodePackages.vscode-html-languageserver-bin
    nodePackages.vscode-css-languageserver-bin
    nodePackages.vscode-json-languageserver
  ];

  # https://devenv.sh/languages/
  languages.typescript.enable = true;
}
