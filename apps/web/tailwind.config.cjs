const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const daisyui = require('daisyui');
const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Comfortaa', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [daisyui, forms, typography],
	daisyui: {
		themes: [
			{
				stoopid: {
					primary: '#ffeda3',
					secondary: '#39a9cb',
					accent: '#000',
					neutral: '#2a2a2a',
					'base-100': '#232323',
					info: '#39a9cb',
					success: '#77dd77',
					warning: '#e66465',
					error: '#e65455'
				}
			}
		]
	}
};

module.exports = config;
