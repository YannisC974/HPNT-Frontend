/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}"
  ],
  darkMode: "class",
  theme: {
    screens: {
      lg: { max: "1440px" },
      md: { max: "1050px" },
      sm: { max: "550px" },
    },
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      colors: {
        amber: {
          500_00: "#f9bc0100",
          a700_99: "#f7a90999"
        },
        black: {
          900: "#000000",
          "900_14": "#00000014"
        },
        blue_gray: {
          100: "#d9d9d9"
        },
        deep_orange: {
          a200: "#f17430",
          a200_cc: "#f17430cc"
        },
        gray: {
          50: "#fffbf4"
        },
        red: {
          500: "#ee4e36",
          600: "#ea3527",
          "600_cc": "#e73a3fcc"
        },
        white: {
          "a700": "#ffffff"
        },
        yellow: {
          50: "#fff8ee",
          800: "#f6aa1a",
          900: "#f47a2a",
          "800_01": "#fbac18",
          "900_b2": "#ed7125b2",
          "12": "#F17430",
          "bg": "#fff8ee",
        }
      },
      boxShadow: {},
      fontFamily: {
        roboto: "Roboto",
        notosans: "Noto Sans"
      },
      dropShadow: {
        'custom': '0px 4px 3px rgba(0, 0, 0, 0.25)',
        'custom2': '0px 3px 3px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        gradient: "linear-gradient(129deg, #f9bc0100, #f7a90999, #ed7125b2, #e73a3fcc)",
        gradient1: "linear-gradient(313deg, #f6aa1a, #ee4e36)"
      },
      margin: {
        'custom-left': '10rem',   // Par exemple, une marge de 2 rem à gauche
        'custom-right': '3rem',  // Par exemple, une marge de 3 rem à droite
      }
    }
  },
  plugins: [],
}


  
