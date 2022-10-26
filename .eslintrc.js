/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint"],
    overrides: [{ files: ["./.eslintrc.js"], parserOptions: { project: null } }],
    rules: {
      indent: ["warn", 2],
      "linebreak-style": ["warn", "windows"],
      quotes: ["warn", "single"],
      semi: ["error", "always"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "generic",
          readonly: "generic",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": ["off"],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/sort-type-union-intersection-members": 'warn',
      "@typescript-eslint/prefer-includes": "warn",
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          format: ["PascalCase"],
          selector: ["enumMember", "class", "interface", "typeAlias"],
        },
        {
          format: ["PascalCase", "camelCase"],
          selector: ["function", "classProperty", "classMethod", "typeProperty"],
        },
      ],
      // extensions
  
      "keyword-spacing": 'off',
      "@typescript-eslint/keyword-spacing": ["warn", { before:true, after:true }]
  
    },
  };
  