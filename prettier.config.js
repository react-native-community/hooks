module.exports = {
	semi: false,
	useTabs: true,
	printWidth: 100,
	overrides: [
		{
			files: "*.json",
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
}
