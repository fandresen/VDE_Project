/** @type {import('tailwindcss').Config} */


export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     colors: {
      base: {
        DEFAULT: '#1A2B38',
        dark: '#FFFFFF',
      },
      muted: {
        DEFAULT: '#FFFFFF',
        dark: '#1A2B38',
      },
      primary: {
        DEFAULT: '#1171BA',
        dark: '#1171BA',
      },
      secondary: {
        DEFAULT: '#FF5252',
        dark: '#FF5252',
      },
      black20: "#CCD0D3",
      black80: "#33424E",
      black90: "#1A2B38",
      button: {
        DEFAULT: '#005EA8',
        darkvv: '#004D88',
      },
      shadow: {
        DEFAULT: '#66717A',
        dark: '#434A52',
      },
      bgdark: "#001322",
      bglight: "#F2F7FB",
     },
     width: {
      'icon': '46px',
    },
    height: {
      'icon': '46px',
    },
    boxShadow: {
      'box': '5px 5px  rgba(204, 208, 211, 1)',
    }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
  ],
}