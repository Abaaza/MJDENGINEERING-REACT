/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1e2a38',
          light: '#f5f8fa',
          accent: '#2aa1ff',
        },
        status: {
          new: '#e53e3e',
          review: '#dd6b20',
          priced: '#3182ce',
          sent: '#38a169',
        },
      },
    },
  },
  plugins: [],
};
