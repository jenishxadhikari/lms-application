const config = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,

   importOrder: [
    '^react$',
    '^react/(.*)$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/config(/.*)?$',
    '',
    '^@/lib(/.*)?$',
    '^@/utils(/.*)?$',
    '^@/types(/.*)?$',
    '^@/schemas(/.*)?$',
    '',
    '^@/hooks(/.*)?$',
    '^@/context(/.*)?$',
    '',
    '^@/styles(/.*)?$',
    '^@/components/ui(/.*)?$',
    '^@/components(/.*)?$',
    '',
    '^@/features(/.*)?$',
    '^@/pages(/.*)?$',
    '^@/app(/.*)?$',
    '^@/routes(/.*)?$',
    '',
    '^[./]'
  ],

  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  tailwindStylesheet: "src/index.css",
  tailwindFunctions: ["cn", "cva"],
}

export default config