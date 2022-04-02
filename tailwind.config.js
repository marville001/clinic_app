module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                dimgray: "#546a83",
                darkslate: "#263648",
                lightgray: "#d2dae3",
                ghostwhite: "#f8f9fa",
                seagreen: "#00bd9c", // success color
                burlywood: "#edba74", // warning color
                salmon: "#ff6d6f", // danger color
                flowerblue: "#527ff0", // primary color
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
