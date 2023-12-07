const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: { project },
  settings: {
    "import/resolver": { typescript: { project } },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
    // sort named imports within an import statement
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
  },
  overrides: [
    // module declarations
    {
      files: ["**/*.d.ts"],
      rules: { "import/no-default-export": "off" },
    },
  ],
};
