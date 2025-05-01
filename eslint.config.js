// @ts-check
const eslint = require("@eslint/js");

module.exports = {
  overrides: [
    {
      files: ["**/*.ts"],
      extends: [
        eslint.configs.recommended, // Use the recommended TypeScript ESLint rules
      ],
      rules: {
        // Add your specific rules for TypeScript files here
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
          },
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case",
          },
        ],
        // Add or remove rules as needed
      },
    },
    {
      files: ["**/*.html"],
      extends: [
        // Add HTML-specific rule sets here if necessary
      ],
      rules: {},
    },
  ],
};
