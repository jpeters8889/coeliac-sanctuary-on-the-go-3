module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/function-component-definition": [
      2,
      {
        namedComponents: "function-declaration",
      },
    ],
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "max-len": ["error", { "code": 120 }],
    "class-methods-use-this": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-plusplus": "off",
    "react/destructuring-assignment": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
