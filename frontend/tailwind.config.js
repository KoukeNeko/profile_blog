/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
          keyframes: {
            blink: {
              '0%, 100%': { opacity: '1' },
              '50%': { opacity: '0' },
            }
          },
          animation: {
            blink: 'blink 1s ease-in-out infinite',
          },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {}
        }
    },
    plugins: [
        (async () => {
            const tailwindcssAnimate = await import("tailwindcss-animate");
            return tailwindcssAnimate.default;
        })()
    ]
}

