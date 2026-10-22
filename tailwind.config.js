/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* 112 Market brand navy, sampled from the logo's "112" and MARKET lettering.
           800 = logo body (#012160), 600 = logo highlight (#013B97), 900 = logo shadow. */
        brand: {
          50: "#EEF3FC",
          100: "#DCE6F8",
          200: "#BCCDF0",
          300: "#8AA8E4",
          400: "#4F7FD0",
          500: "#1F56B8",
          600: "#013B97",
          700: "#022C80",
          800: "#012160",
          900: "#00124A",
        },
        /* Logo orange: core #FA6804, highlight #FF9906, shadow #B1310A.
           Used for savings, badges, the cart and calls to action. */
        accent: {
          50: "#FFF4E8",
          100: "#FFE3C7",
          200: "#FFC78F",
          300: "#FFA854",
          400: "#FF8A1E",
          500: "#FA6804",
          600: "#C24E00",
          700: "#9C3E00",
          800: "#7A3200",
          900: "#5E2800",
        },
        /* Additional brand extensions for full site coverage */
        market: {
          50: "#F8F9FA",
          100: "#F2F3F4",
          200: "#E5E7E9",
          300: "#D6D8DB",
          400: "#C8C9CC",
          500: "#BBBEBF",
          600: "#9CA0A4",
          700: "#6E7075",
          800: "#505358",
          900: "#3A3C3F",
        },
        /* Union flag navy and red, used only for the first-visit intro accent */
        flag: {
          navy: "#012169",
          red: "#C8102E",
        },
        /* Semantic storefront tokens */
        canvas: "#F5F8FD",
        surface: "#FFFFFF",
        ink: "#08153A",
        muted: "#5A6481",
        line: "#DFE5F0",
        danger: "#B42318",
        warning: "#A15C00",
        success: "#16794A",
        /* Legacy aliases kept so existing utility classes keep working */
        background: "#F5F8FD",
        foreground: "#08153A",
        card: "#FFFFFF",
        border: "#DFE5F0",
        primary: "#022C80",
        "primary-foreground": "#FFFFFF",
        secondary: "#EEF3FC",
        "muted-foreground": "#5A6481",
        error: "#B42318",
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-lg": ["clamp(2.5rem, 5.4vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(8, 21, 58, 0.04), 0 8px 24px -12px rgba(8, 21, 58, 0.12)",
        card: "0 1px 2px rgba(8, 21, 58, 0.05), 0 12px 32px -18px rgba(8, 21, 58, 0.22)",
        lift: "0 2px 4px rgba(8, 21, 58, 0.05), 0 22px 48px -24px rgba(8, 21, 58, 0.3)",
        overlay: "0 24px 70px -28px rgba(8, 21, 58, 0.45)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /* Opacity only: a lingering transform would turn the page into a containing
           block for position:fixed children. */
        "route-fade": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-down": "slide-down 0.2s ease-out both",
        "route-fade": "route-fade 250ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [],
}
