module.exports = {
  variants: {
    borderWidth: ["responsive", "first"],
    margin: ["responsive", "first"],
  },
  plugins: [require("@tailwindcss/ui")],
  theme: {
    extend: {
      spacing: {
        "108": "27rem",
        "120": "30rem",
      },
    },
  },
};
