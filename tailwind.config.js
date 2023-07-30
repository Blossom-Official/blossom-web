const PX0_300 = { ...Array.from(Array(301)).map((_, i) => `${i / 10}rem`) };
const PX0_50 = { ...Array.from(Array(51)).map((_, i) => `${i / 10}rem`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: PX0_300,
      borderRadius: PX0_50,
      minWidth: PX0_300,
      maxWidth: PX0_300,
      minHeight: PX0_300,

      colors: {
        grey: '#BCBCBC',
        green: {
          100: '#8E9A78',
          200: '#4B523F',
          300: '#26291F',
          400: '#333A29',
        },
        yellow: '#FFCE00',
        pink: { 100: '#FFCBF1', 200: '#976489' },
        blue: '#7A7EA4',
      },
      lineHeight: PX0_50,
      fontSize: {
        ...PX0_50,
        /**
         * @deprecated
         */
        '24-bold-24': [
          '2.4rem',
          { lineHeight: '24px', letterSpacing: '0em', fontWeight: '700' },
        ],
        '16-light-24': [
          '1.6rem',
          { lineHeight: '24px', letterSpacing: '0em', fontWeight: '300' },
        ],
        '24-bold-32': [
          '2.4rem',
          { lineHeight: '32px', letterSpacing: '0em', fontWeight: '700' },
        ],
        '10-regular-12': [
          '1.0rem',
          { lineHeight: '12px', letterSpacing: '0em', fontWeight: '400' },
        ],
        '14-light-24': [
          '1.4rem',
          { lineHeight: '24px', letterSpacing: '0em', fontWeight: '300' },
        ],
        '14-regular-24': [
          '1.4rem',
          { lineHeight: '24px', letterSpacing: '0em', fontWeight: '400' },
        ],
        '24-light-32': [
          '2.4rem',
          { lineHeight: '32px', letterSpacing: '0em', fontWeight: '300' },
        ],
        '24-regular-32': [
          '2.4rem',
          { lineHeight: '32px', letterSpacing: '0em', fontWeight: '400' },
        ],
        '20-semibold-24': [
          '2.0rem',
          { lineHeight: '24px', letterSpacing: '0em', fontWeight: '600' },
        ],
        '24-semibold-24': [
          '2.4rem',
          { lineHeight: '24px', letterSpacing: '0em', fontWeight: '600' },
        ],
      },
      fontFamily: {
        'lemon-milk': ['var(--font-lemon-milk)'],
        pretendard: ['var(--font-pretendardVariable)'],
      },
      backgroundImage: {
        'content-overlay':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)',
      },
    },
  },
  plugins: [],
};
