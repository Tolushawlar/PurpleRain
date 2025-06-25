/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purplerain: {
          primary: '#5D5FEF',
          accent: '#F97316',
          bg: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: {
            primary: '#111827',
            secondary: '#6B7280',
            link: '#3B82F6',
          },
          status: {
            success: '#10B981',
            error: '#EF4444',
            info: '#2563EB',
          }
        }
      }
    },
  },
  plugins: [],
}