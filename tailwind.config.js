const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@apideck/components/**/*.js'
  ],
  theme: {
    extend: {
      screens: {
        xxs: '420px',
        xs: '550px',
        sm: '630px',
        md: '1000px',
        xxl: '2300px'
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      mukta: ['Mukta Mahee', 'sans-serif'],
      poppins: ['Poppins'],
      bebas: ['Bebas Neue', 'sans-serif']
    },
    colors: {
      neutral: {
        100: '#F8F9FA',
        200: '#E9ECEF',
        300: '#DEE2E6',
        400: '#CED4DA',
        500: '#ADB5BD',
        600: '#6C757D',
        700: '#495057',
        800: '#343A40',
        900: '#212529'
      },
      red: colors.red,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      error: '#FA541C',
      tosca: '#00CBB4',
      'light-green': '#19C200',
      'dark-green': '#009100',
      pink: '#FF3A79',
      orange: '#FF9431',
      purple: '#5b21b6',
      'dark-blue': '#33424E'
    },
    minWidth: {
      xs: '20rem' /* 320px */,
      sm: '24rem' /* 384px */,
      md: '28rem' /* 448px */,
      lg: '32rem' /* 512px */,
      xl: '36rem' /* 576px */,
      '2xl': '42rem' /* 672px */,
      '3xl': '48rem' /* 768px */,
      '4xl': '56rem' /* 896px */,
      '5xl': '64rem' /* 1024px */,
      '6xl': '72rem' /* 1152px */,
      '7xl': '80rem' /* 1280px */
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          h1: {
            fontFamily: ['Poppins']
          },
          h2: {
            fontFamily: ['Poppins']
          },
          h3: {
            fontFamily: ['Poppins']
          },
          h4: {
            fontFamily: ['Poppins']
          },
          h5: {
            fontFamily: ['Poppins']
          },
          p: {
            fontFamily: ['Poppins']
          }
        }
      }
    })
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ]
}
