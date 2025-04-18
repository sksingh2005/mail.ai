/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
        'tailwindcss', // Tailwind CSS should be loaded via this plugin
        'autoprefixer', // Optional, but useful for prefixing CSS properties
      ],
  }
  