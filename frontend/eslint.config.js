import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  tseslint.configs.base,
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx, js, jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // JavaScript 核心错误
      "no-undef": "off", // ⚠️ TypeScript 已经能检查 undefined，所以这里关掉
      "@typescript-eslint/no-undef": "off",

      // TypeScript 相关
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off", // 需要的话可以打开
      "@typescript-eslint/no-explicit-any": "warn", // 尽量避免 any

      // React 相关错误
      "react/jsx-no-undef": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/no-direct-mutation-state": "error",

      // Hooks 相关错误
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Fast Refresh 相关
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
