import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [".node_modules/*", "dist/"],
  },
  // { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { project: "./tsconfig.json" },
    },
  },
  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: "@eslint/js",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: ["error", "always"], // Enforce semicolons
      quotes: ["error", "double"], // Use double quotes
    },
  },
  eslintPluginPrettierRecommended,
];
