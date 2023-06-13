/** @type {import('tailwindcss').Config} */
const PX0_300 = { ...Array.from(Array(301)).map((_, i) => `${i / 10}rem`) };
const PX0_50 = { ...Array.from(Array(51)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: PX0_300,
      borderRadius: PX0_50,
      minWidth: PX0_300,
      maxWidth: PX0_300,
      minHeight: PX0_300,
    },
  },
  plugins: [],
};
