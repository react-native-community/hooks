import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import eslintConfigPrettier from "eslint-config-prettier"

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{ts,tsx}"] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		...pluginReact.configs.flat.recommended,
		...pluginReact.configs.flat["jsx-runtime"],
		rules: {
			"react/react-in-jsx-scope": "off", // dont require `import React from "react"`
		},
	},
	eslintConfigPrettier, // keep last
]
