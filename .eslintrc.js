module.exports = {
    'root': true,
    'env': {
        'node': true,
        'browser': true,
        'es6': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:no-unsanitized/DOM',
        'plugin:react/recommended',
        'plugin:security/recommended',
    ],
    'parser': '@babel/eslint-parser',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'babelOptions': {
            'presets': ['@babel/preset-typescript', '@babel/preset-react']
        },
        'requireConfigFile': false,
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'overrides': [
        {
            'files': ['*.{ts,tsx}'],
            'parser': '@typescript-eslint/parser',
            'plugins': ['@typescript-eslint'],
            'extends': ['plugin:@typescript-eslint/recommended']
        }
    ],
    'plugins': [
        'react',
        'security',
        'xss'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'xss/no-location-href-assign': 2,
        'security/detect-object-injection': 0,
        'indent': ['warn', 4, {
            'ignoredNodes': ['TemplateLiteral']
        }],
        'linebreak-style': [
            'warn',
            'unix'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'warn',
            'never'
        ],
        'no-console': [
            'warn', {
                allow: [
                    'error'
                ]
            }
        ],
        'max-len': [1, {
            'code': 120,
            'ignoreUrls': true
        }],
        'no-unused-vars': 'warn',
        'react/no-unknown-property': [1, { }],
        'react/no-danger': 'warn',
        'react/no-danger-with-children': 'warn',
        'react/jsx-equals-spacing': [1, 'always'],
        'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'multiline' }],
        'react/jsx-uses-vars': 'warn',
        'react/no-unused-prop-types': [1, { }],
        'react/jsx-no-duplicate-props': [1, { }],
        'react/jsx-props-no-multi-spaces': 'warn',
        'react/require-default-props': [
            'warn', {
                'forbidDefaultForRequired': true
            }
        ],
        'array-bracket-spacing': 'warn',
        'block-spacing': 'warn',
        'brace-style': ['warn', '1tbs', { 'allowSingleLine': true }],
        'camelcase': 'warn',
        'comma-spacing': 'warn',
        'computed-property-spacing': ['warn', 'never'],
        'func-call-spacing': ['warn', 'never'],
        'jsx-quotes': ['warn', 'prefer-single'],
        'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }],
        'keyword-spacing': ['warn', { 'before': true, 'after': true }],
        'no-tabs': 'warn',
        'no-trailing-spaces': 'warn',
        'no-whitespace-before-property': 'warn',
        'object-curly-spacing': ['warn', 'always'],
        'space-before-blocks': 'warn',
        'space-before-function-paren': ['warn', 'never'],
        'space-in-parens': ['warn', 'never'],
        'space-infix-ops': 'warn'
    }
}
