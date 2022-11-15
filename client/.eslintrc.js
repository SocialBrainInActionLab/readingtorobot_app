module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  plugins: ["prettier", "react"],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "import/extensions": "off",
    "prettier/prettier": ["error"],
  },
};
