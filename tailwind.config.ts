import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-instrument-serif)'],
                mono: ['var(--font-geist-mono)'],
            },
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            fontSize: '2.5rem',
                            fontWeight: '300',
                            fontFamily: 'var(--font-instrument-serif)',
                            color: 'rgb(22 101 52)',
                            lineHeight: '1.2',
                        },
                        h2: {
                            fontSize: '2rem',
                            fontWeight: '300',
                            fontFamily: 'var(--font-instrument-serif)',
                            color: 'rgb(22 101 52)',
                            lineHeight: '1.2',
                        },
                        h3: {
                            fontSize: '1.75rem',
                            fontWeight: '300',
                            fontFamily: 'var(--font-instrument-serif)',
                            color: 'rgb(22 101 52)',
                            lineHeight: '1.2',
                        },
                        img: {
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'block',
                        },
                    },
                },
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
