/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dominus: {
          bg: '#F5F2EB', // Light cream background from reference
          surface: '#FFFFFF',
          border: '#E5E0D5',
          text: '#1C1C1C', // Almost black for text
          muted: '#6B6B6B',
          accent: '#FF6600', // Orange/Red accent from reference
          accentHover: '#CC3D1E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Changing back to Inter/system sans for the bold clean look
        display: ['Inter', 'sans-serif'], // The reference uses a heavy sans-serif for the display too
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
