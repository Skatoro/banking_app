import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'selector',
    theme: {
        backgroundColor: theme => ({
            'primary': '#654084',
            'bang': '#222222',
            'bang1': '#333333',
            'bang1Darker': '#2B2B2B',
            'primary-darker': '#50346b',
            'secondary': '#f5f5f5',
            'secondary-darker': '#ececec',
            'pink': '#f4b4b4',
            'pink-lighter': '#ffd9d9',
            'white': '#fff',
            'black': '#000',
            'grey': '#333333',
            'darkGrey': '#1f1f1f',
            'orange': '#FB7B22',
            'green': '#0BD639',
            'flicker': '#dbdfe4',
            'flickerActive': '#0f1419',
            'flickerCircle': '#fff',
            'flickerDark': '#494e53',
            'flickerDarkActive': '#f8f9f9',
            'flickerDarkCircle': '#0f1419',
        }),
        extend: {
            width: {
                '72': '18rem',
                '18': '4.5rem'
            },
            minWidth: {
                '243': '60.75rem',
                '142': '35.5rem',
                '140': '35rem',
                '100': '25rem',
                '72': '18rem'
            },
            maxWidth: {
                '338': '84.5rem',
                '22': '5.5rem',
            },
            height: {
                '125': '31.25rem',
                '26': '6.5rem',
                '22': '5.5rem',
                '21': '5.25rem',
                '10': '2.5rem',
            },
            minHeight: {
                '105': '26.25rem',
            },
            spacing: {
                '15': '3.75rem',
                '11': '2.75rem'
            },
            translate: {
                '14' : '3.5rem'
            },
            colors: {
                primary: '000',
                'secondary-lighter': '#794fa1',
                secondary: '#654084',
                tertiary: '#e3e3e3',
                grey: '#333333',
                darkGrey: '#1f1f1f',
                icon_grey: '#9d9d9d',
            },
        },
    },
    plugins: [],
};
export default config;
