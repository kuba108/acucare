import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#004f45',
        'primary-container': '#00695c',
        'on-primary': '#ffffff',
        'on-primary-container': '#94e5d5',
        'secondary': '#286b33',
        'secondary-container': '#abf4ac',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#2e7238',
        'tertiary': '#7f262a',
        'tertiary-container': '#9e3d3f',
        'on-tertiary-fixed-variant': '#80272b',
        'surface': '#f4faff',
        'surface-bright': '#f4faff',
        'surface-dim': '#ccdce7',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#e7f6ff',
        'surface-container': '#e0f0fb',
        'surface-container-high': '#daebf5',
        'surface-container-highest': '#d5e5ef',
        'on-surface': '#0e1d25',
        'on-surface-variant': '#3e4946',
        'outline': '#6e7976',
        'outline-variant': '#bec9c5',
        'inverse-primary': '#84d5c5',
        'inverse-surface': '#23323a',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        'surface-tint': '#046b5e',
      },
      fontFamily: {
        'headline': ['Merriweather', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['40px', { lineHeight: '52px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      spacing: {
        'section-gap': '48px',
        'container-padding': '24px',
        'gutter': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
