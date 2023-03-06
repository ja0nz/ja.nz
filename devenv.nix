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
    run-fmt.exec = "${nodePackages.prettier}/bin/prettier . --write --plugin-search-dir=$DEVENV_ROOT";
    run-repl.exec = "${nodePackages.ts-node}/bin/ts-node";
    run-lint.exec = "${nodePackages.eslint}/bin/eslint .";
    run-check.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro check";
    run-build.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro build";
    run-preview.exec = "cd $DEVENV_ROOT && ${yarn}/bin/yarn astro preview";
    run-dev.exec = "cd $DEVENV_ROOT && NODE_OPTIONS='--inspect' ${yarn}/bin/yarn astro dev";
    run-clean.exec = "rm -rf dist";
  };

  # https://devenv.sh/languages/
  languages.typescript.enable = true;
}
