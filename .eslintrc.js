module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      'no-console': 'off'
    },
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module"
    }
  }