/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: { // definir os parametros de aparencia. O Tailwind transforma os parametros abaixo em CSS
    container: {
      center: true
    },
    fontSize: { // em css seria clase xs { font-size: 12 px, line-height :16px}
      xs: ['12px', '16px'], // array possui o tamanho da fonte e o  espaçamento entre linha, mas pode-se declarar apenas a fonte.
      sm: ['14px', '18px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '2xl': ['32px', '40x'],  // como o tamanho começa com um número e possui letras entramos com uma string na definição
      '3xl': ['48px', '56px'],
    },
    extend: {
      colors: {
        black: "#0B0E16",
        white: "#F4F6FF",
        grey1: {
          300: "#B1B4BD",    //grey3
          500: "#91949D",    //grey2
          700: "#696C74",    //grey1
        },
        red: {
          300: "#BB2E57", //red1 note que o nome começou com numero, mas como não possui letras, naõ é necessário usar string
          500: "#AF053F", //red2
          700: "#300219", //red3
        },
      },
    },

  },
  plugins: [],
}