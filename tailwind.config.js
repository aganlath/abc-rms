module.exports = {
  purge: [
      './resources/**/*.blade.php',
      './resources/**/*.js',
      './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            'abc-body': '#EFEFF6',
            'abc-dark': '#0E0C28',
        },
        textColor: {
            'abc-dark': '#0E0C28',
            'abc-purple1': '#3D415C'
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
