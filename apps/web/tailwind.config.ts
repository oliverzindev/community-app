import type { Config } from "tailwindcss";

/** Design System Community App — paleta azul, dark por omissão. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071A38",
        deep: "#102C52",
        royal: "#2563EB",
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8"
        },
        ink: "#EFF6FF",
        muted: "#9FB3D1",
        faint: "#64748B",
        line: "#17315C",
        surface: "#0B2140",
        surface2: "#102C52"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px"
      },
      boxShadow: {
        card: "0 12px 40px rgba(2, 8, 23, 0.45)",
        glow: "0 0 0 1px rgba(37,99,235,0.35), 0 12px 40px rgba(37,99,235,0.18)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "none" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease both",
        shimmer: "shimmer 1.5s infinite"
      }
    }
  },
  plugins: []
};
export default config;
