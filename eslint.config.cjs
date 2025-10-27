module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    plugins: ["react"],
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    rules: {
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        react: { version: "detect" },
    },
};
