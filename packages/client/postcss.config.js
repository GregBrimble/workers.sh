const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./public/**/*.html", "./src/**/*.{ts,js,tsx,jsx}"],

  efaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV == "production" ? [purgecss] : []),
  ],
};
