module.exports = {
    env: {
        browser: true,
        es6: true,
        deno: true,
    },
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'no-console': 'off',
        'prettier/prettier': 'error',
    },
};