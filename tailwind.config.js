const path = require("path");

module.exports = {
    content: ['./src/**/*.{svelte,html,js}'],
    //content: [path.join(__dirname, "./src/*.(js|jsx|ts|tsx)")],
    theme: {
      extend: {
        transformOrigin: {
          "0": "0%",
        },
        zIndex: {
          "-1": "-1",
        },
        width: {
          '9/20': '45.0000000%',
          '9/19': '47.3684211%',
        }
      },
    },
    plugins: [require('@tailwindcss/forms'),],
  };