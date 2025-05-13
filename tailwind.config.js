import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                zentry: ["zentry", "sans-serif"],
                general: ["general", "sans-serif"],
                "circular-web": ["circular-web", "sans-serif"],
                "robert-medium": ["robert-medium", "sans-serif"],
                "robert-regular": ["robert-regular", "sans-serif"],
            },
            colors: {
                blue: {
                    50: "#DFDFF0",
                    75: "#dfdff2",
                    100: "#F0F2FA",
                    200: "#010101",
                    300: "#4FB7DD",
                },
                violet: {
                    300: "#5724ff",
                },
                yellow: {
                    100: "#8e983f",
                    300: "#edff66",
                },
            },
            keyframes: {
                "border-spin": {
                    "100%": {
                        transform: "rotate(-360deg)",
                    },
                },
            },
            animation: {
                "border-spin": "border-spin 7s linear infinite",
            },
        },
    },

    plugins: [forms],
};
