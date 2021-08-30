module.exports = {
    purge: [],
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
    variants: { borderColor: ["responsive", "hover", "focus", "focus-within"] },
    plugins: [require('@tailwindcss/forms'),],
  };