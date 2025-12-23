/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a1929', // Dark Navy
          light: '#132f4c',
        },
        sky: {
          DEFAULT: '#4FC3F7',
          light: '#B3E5FC',
        },
        success: '#8BC34A',
        warning: '#FF9800',
        error: '#F44336',
        purple: '#9C27B0',
        brand: {
          dark: '#0B1739',
          navy: '#1a2b5e',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
