import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C5F2D',    // Forest Green
        secondary: '#7EC8E3',  // Sky Blue
        tertiary: '#6B4423',   // Earthy Brown
        accent: '#56C596',     // Waterfall Turquoise
        background: '#F5F5F5', // Cloud White
        text: '#333333',       // Dark Gray for text
      },
      fontFamily: {
        header: ['Cinzel', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
      spacing: {
        500: '500px',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      
    },
  },
  plugins: [],
};
export default config;
