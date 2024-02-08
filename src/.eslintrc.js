// eslint-disable-next-line @typescript-eslint/no-var-requires
const { main } = require('../config/aliases');

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: '../tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        react: {
            version: 'detect',
        },
        // указываем пути для внутренних пакетов
        'import/internal-regex': main ? `(${Object.keys(main).join('|')})/` : undefined,
        'import/external-module-folders': ['node_modules'],
    },
    env: {
        browser: true,
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // добавляем ключевое слово type для импортированных типов/интерфейсов
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                fixStyle: 'separate-type-imports',
            },
        ],
        'react/no-unknown-property': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: ['arrow-function', 'function-declaration'],
            },
        ],
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/button-has-type': 'off',
        'import/prefer-default-export': 'off',
        'import/no-duplicates': 'error',
        // порядок импортов
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external'], ['internal'], ['sibling', 'parent'], 'type'],
                pathGroups: [
                    {
                        pattern: '{react,react-dom/client}',
                        group: 'builtin',
                        position: 'before',
                        patternOptions: {
                            matchBase: true,
                        },
                    },
                    {
                        pattern: '@types',
                        group: 'internal',
                        position: 'after',
                        patternOptions: {
                            matchBase: true,
                        },
                    },
                    {
                        pattern: '*.+(scss|svg)',
                        group: 'type',
                        position: 'after',
                        patternOptions: {
                            matchBase: true,
                        },
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                alphabetize: {
                    order: 'asc',
                },
                'newlines-between': 'always',
            },
        ],
        'no-console': 'warn',
        'no-plusplus': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    },
};
