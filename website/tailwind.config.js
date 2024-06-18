/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#00a9ff",
                    50: "#7fd4ff",
                    100: "#66cbff",
                    200: "#4cc2ff",
                    300: "#32baff",
                    400: "#19b1ff",
                    500: "#00a9ff",
                    600: "#0098e5",
                    700: "#0087cc",
                    800: "#0076b2",
                    900: "#006599",
                    1000: "#00547f",
                },
                secondary: {
                    DEFAULT: "#ed5b2d",
                    50: "#f6ad96",
                    100: "#f49c81",
                    200: "#f28c6c",
                    300: "#f07b56",
                    400: "#ee6b42",
                    500: "#ed5b2d",
                    600: "#d55128",
                    700: "#bd4824",
                    800: "#a53f1f",
                    900: "#8e361b",
                    1000: "#762d16",
                },
            },
        },
    },
    plugins: [],
};
