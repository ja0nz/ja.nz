module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  presets: [],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primary: "#ff5400",
      secondary: "#86c7f0",
      light: "#f3f3f3",
      dark: "#252525",
    },
    // 21-24
    // https://utopia.fyi/space/calculator?c=320,21,1.2,1140,24,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l
    spacing: {
      "3xs": "clamp(0.31rem, calc(0.29rem + 0.12vw), 0.38rem)",
      "2xs": "clamp(0.69rem, calc(0.66rem + 0.12vw), 0.75rem)",
      xs: "clamp(1.00rem, calc(0.95rem + 0.24vw), 1.13rem)",
      s: "clamp(1.31rem, calc(1.24rem + 0.37vw), 1.50rem)",
      m: "clamp(2.00rem, calc(1.90rem + 0.49vw), 2.25rem)",
      l: "clamp(2.63rem, calc(2.48rem + 0.73vw), 3.00rem)",
      xl: "clamp(3.94rem, calc(3.72rem + 1.10vw), 4.50rem)",
      "2xl": "clamp(5.25rem, calc(4.96rem + 1.46vw), 6.00rem)",
      "3xl": "clamp(7.88rem, calc(7.44rem + 2.20vw), 9.00rem)",

      /* One-up pairs */
      "3xs-2xs": "clamp(0.31rem, calc(0.14rem + 0.85vw), 0.75rem)",
      "2xs-xs": "clamp(0.69rem, calc(0.52rem + 0.85vw), 1.13rem)",
      "xs-s": "clamp(1.00rem, calc(0.80rem + 0.98vw), 1.50rem)",
      "s-m": "clamp(1.31rem, calc(0.95rem + 1.83vw), 2.25rem)",
      "m-l": "clamp(2.00rem, calc(1.61rem + 1.95vw), 3.00rem)",
      "l-xl": "clamp(2.63rem, calc(1.89rem + 3.66vw), 4.50rem)",
      "xl-2xl": "clamp(3.94rem, calc(3.13rem + 4.02vw), 6.00rem)",
      "2xl-3xl": "clamp(5.25rem, calc(3.79rem + 7.32vw), 9.00rem)",

      /*Custom pair*/
      sidebar: "clamp(18.38rem, calc(16.77rem + 8.05vw), 22.50rem)",
    },
    // 21-24
    // https://utopia.fyi/type/calculator?c=320,21,1.2,1140,24,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l */
    fontSize: {
      "-2": "clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)",
      "-1": "clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)",
      0: "clamp(1.31rem, calc(1.24rem + 0.37vw), 1.50rem)",
      1: "clamp(1.58rem, calc(1.46rem + 0.59vw), 1.88rem)",
      2: "clamp(1.89rem, calc(1.71rem + 0.89vw), 2.34rem)",
      3: "clamp(2.27rem, calc(2.01rem + 1.29vw), 2.93rem)",
      4: "clamp(2.72rem, calc(2.36rem + 1.83vw), 3.66rem)",
      5: "clamp(3.27rem, calc(2.75rem + 2.56vw), 4.58rem)",
    },
    fontFamily: {
      sans: [
        '"Inter"',
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ],
    },
    gap: ({ theme }) => theme("spacing"),
    margin: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
    }),
    scrollMargin: ({ theme }) => ({
      ...theme("spacing"),
    }),
    backgroundColor: ({ theme }) => theme("colors"),
    textColor: ({ theme }) => theme("colors"),
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
    },
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
    "read-only",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled",
  ],
  plugins: [],
};
