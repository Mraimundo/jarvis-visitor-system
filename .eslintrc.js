module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // TypeScript essenciais
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],

    // React essenciais
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    // Gerais essenciais
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",

    // Prettier
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", ".next/", "dist/", "*.config.js"],
};
