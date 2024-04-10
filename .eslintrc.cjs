module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs","node_modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    eqeqeq: ["error", "always"],
    "no-empty-function": "error",
    "no-implicit-coercion": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-duplicate-enum-values": "warn"
  }
}
