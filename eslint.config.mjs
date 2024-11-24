import reactPlugin from 'eslint-plugin-react'
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";


export default tseslint.config({

  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
  ],

  plugins: {
    "@typescript-eslint": typescriptEslint,
    "react-hooks": reactHooks,
  },

  languageOptions: {
    parser: tsParser,
    ...reactPlugin.configs.flat.recommended.languageOptions,
    globals: {
      ...globals.browser,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    "comma-dangle": ["warn", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "always-multiline",
      exports: "always-multiline",
      functions: "always-multiline",
    }],

    "keyword-spacing": ["error"],

    "no-console": ["warn", {
      allow: ["error"],
    }],

    "no-multiple-empty-lines": ["error", {
      max: 2,
      maxEOF: 2,
    }],

    "no-undef": "off",
    semi: ["error", "never"],

    "space-before-function-paren": ["error", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always",
    }],

    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    "react/jsx-closing-tag-location": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-no-undef": "off",
    "react/no-did-update-set-state": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
});