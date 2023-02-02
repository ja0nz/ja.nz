{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = with pkgs; [
    nodejs
    yarn
    nixfmt
    nodePackages.prettier
    nodePackages.eslint
    nodePackages.ts-node
  ];

   # https://devenv.sh/scripts/
  scripts = with pkgs; {
    go-format.exec = "${nodePackages.prettier}/bin/prettier . --write";
    go-repl.exec = "${nodePackages.ts-node}/bin/ts-node";
    go-lint.exec = "${nodePackages.eslint}/bin/eslint .";
    go-check.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro check";
    go-build.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro build";
    go-preview.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro preview";
    go-dev.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro dev";
    go-clean.exec = "rm -rf dist";
  };

  # https://devenv.sh/languages/
  languages.typescript.enable = true;
}
