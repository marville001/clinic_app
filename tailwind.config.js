module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                dimgray: "#546a83",
                seagreen: "#00bd9c",
                darkslate: "#263648",
                salmon: "#ff6d6f",
                lightgray: "#d2dae3",
                whitesmoke: "#eff2f5",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
