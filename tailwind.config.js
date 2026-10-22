/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* 112 Market brand — deep market green (UK-sourced, Nigeria-sold) */
        brand: {
          50: "#F1F6F2",
          100: "#E0EBE2",
          200: "#C2D7C6",
          300: "#9BBDA3",
          400: "#6C9C77",
          500: "#458054",
          600: "#346743",
          700: "#2A5238",
          800: "#23422F",
          900: "#1C3527",
        },
        /* Warm secondary — used for savings, badges and accents */
        accent: {
          50: "#FDF5EC",
          100: "#FAE8D3",
          200: "#F4CBA8",
          300: "#EDA871",
          400: "#E2823D",
          500: "#D26A22",
          600: "#B55317",
          700: "#93400F",
          800: "#75340F",
          900: "#5E2C10",
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
        /* Semantic storefront tokens */
        canvas: "#FBF8F3",
        surface: "#FFFFFF",
        ink: "#1A1714",
        muted: "#6F6A61",
        line: "#E8E1D6",
        danger: "#B42318",
        warning: "#A15C00",
        success: "#16794A",
        /* Legacy aliases kept so existing utility classes keep working */
        background: "#FBF8F3",
        foreground: "#1A1714",
        card: "#FFFFFF",
        border: "#E8E1D6",
        primary: "#2A5238",
        "primary-foreground": "#FFFFFF",
        secondary: "#F1F6F2",
        "muted-foreground": "#6F6A61",
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
        soft: "0 1px 2px rgba(26, 23, 20, 0.04), 0 8px 24px -12px rgba(26, 23, 20, 0.12)",
        card: "0 1px 2px rgba(26, 23, 20, 0.05), 0 12px 32px -18px rgba(26, 23, 20, 0.22)",
        lift: "0 2px 4px rgba(26, 23, 20, 0.05), 0 22px 48px -24px rgba(26, 23, 20, 0.3)",
        overlay: "0 24px 70px -28px rgba(26, 23, 20, 0.45)",
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
        "route-fade": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
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
        "route-fade": "route-fade 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [],
}
