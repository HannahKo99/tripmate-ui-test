/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ed072', // Green
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ed072',
          500: '#22c55e', // Using standard emerald-like for better scale, but mapping provided #4ed072 as a middle ground or re-generating.
          // Let's use the USER PROVIDED colors as the anchors (500/DEFAULT)
          DEFAULT: '#4ed072',
          50: '#f2fcf6',
          100: '#e1f8e9',
          200: '#c3f0d5',
          300: '#94e4b7',
          400: '#60d590',
          500: '#4ed072',
          600: '#3bb364',
          700: '#328f52',
          800: '#2d7145',
          900: '#265d3b',
        },
        secondary: {
          DEFAULT: '#8c46b9', // Purple
          50: '#f9f5fc',
          100: '#f1e8f8',
          200: '#e3d0f0',
          300: '#ceabe4',
          400: '#ad7dd4',
          500: '#8c46b9',
          600: '#76319e',
          700: '#632684',
          800: '#53216d',
          900: '#461e5a',
        },
        accent: {
          DEFAULT: '#ff6a50', // Orange/Red
          50: '#fff7f5',
          100: '#ffedea',
          200: '#ffdcd6',
          300: '#ffc1b6',
          400: '#ff9785',
          500: '#ff6a50',
          600: '#ed482a',
          700: '#c53116',
          800: '#a32a15',
          900: '#882618',
        },
        warning: {
          DEFAULT: '#ffb81d', // Yellow
          50: '#fffbf2',
          100: '#fff6e0',
          200: '#ffeab8',
          300: '#ffde8a',
          400: '#ffce5c',
          500: '#ffb81d',
          600: '#e59b0d',
          700: '#bf7609',
          800: '#995a0d',
          900: '#7d490f',
        },
        info: {
          DEFAULT: '#5ab6e2', // Blue
          50: '#f3fbfe',
          100: '#e3f5fc',
          200: '#c8ebfa',
          300: '#9eddca',
          400: '#75cbef',
          500: '#5ab6e2',
          600: '#3ea5d8',
          700: '#207cb3',
          800: '#1b6490',
          900: '#1a5477',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      },
    },
  },
  plugins: [],
}
