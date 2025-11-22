import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { 
      globals: globals.browser, 
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      'no-unused-vars': 'off', 
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' },
        'error',
        {
          'argsIgnorePattern': '^_', 
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_',
        },
      ],
      'semi': ['error', 'always'], 
      'comma-dangle': ['error', 'always-multiline'], 
      'no-multi-spaces': 'error', 
      
      // Para exigir indentación de 2 espacios (un estándar común en React)
      // Nota: Esta regla puede ser conflictiva con Prettier.
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', { 
        'max': 1, // Número máximo de líneas en blanco consecutivas permitidas
        'maxEOF': 0, // Máximo de líneas en blanco permitidas al final del archivo
        'maxBOF': 0, // Máximo de líneas en blanco permitidas al inicio del archivo
      }],
      'quotes': ['error', 'single', { 
        'avoidEscape': true,
        'allowTemplateLiterals': true,
      }],
    },
  },
]);