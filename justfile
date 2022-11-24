alias f := format
alias l := lint

# format with prettier
format:
    yarn prettier . --write

# lint with eslint
lint:
    yarn eslint .

# astro check
check:
    yarn astro check

# check and build
build:
    just check && yarn astro build

# dev build
dev:
    yarn astro dev
