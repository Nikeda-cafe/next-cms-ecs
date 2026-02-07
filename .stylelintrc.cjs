module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null,
    'order/properties-alphabetical-order': true,
  },
  ignoreFiles: ['node_modules/**/*'],
};
