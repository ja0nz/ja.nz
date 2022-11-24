{ pkgs ? import <nixpkgs> {
  overlays = [
    (self: super: {
      yarn = super.yarn.override { nodejs = pkgs.nodejs-19_x; };
    })
  ];
} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-19_x
    yarn
    nixfmt
    nodePackages.ts-node
    nodePackages.typescript-language-server
    nodePackages.vscode-html-languageserver-bin
    nodePackages.vscode-css-languageserver-bin
    nodePackages.vscode-json-languageserver
    nodePackages.prettier
    nodePackages.eslint
  ];
}
