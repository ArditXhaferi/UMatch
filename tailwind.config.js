/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
      './storage/framework/views/*.php',
      './resources/views/**/*.blade.php',
      './resources/js/**/*.jsx',
      './resources/js/**/*.tsx',
    ],
    theme: {
      extend: {
        fontFamily: {
          etna: ['"Etna Sans"', 'sans-serif'],
        },
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
          },
        },
        animation: {
          shake: 'shake 0.6s cubic-bezier(.36,.07,.19,.97) both',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
