/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors - no gradients, pure contrast
        'dark': '#000000',              // Pure black
        'dark-800': '#0a0a0a',         // Almost black
        'dark-700': '#1a1a1a',         // Very dark gray
        'dark-600': '#2a2a2a',         // Dark gray
        'dark-500': '#3a3a3a',         // Medium gray
        'light': '#ffffff',            // Pure white
        'light-800': '#f5f5f5',        // Very light gray
        'light-700': '#e5e5e5',        // Light gray
        'light-600': '#d5d5d5',        // Medium light gray
        'accent': '#ffffff',           // White accent
        'muted': '#888888',            // Muted gray
        'border': '#333333',           // Border color
      },
      fontFamily: {
        'chakra': ['Chakra Petch', 'sans-serif'],
        'matangi': ['Matangi', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'dark': '0 4px 15px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}