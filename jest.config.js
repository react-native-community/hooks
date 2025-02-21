module.exports = {
	preset: "react-native",
	testEnvironment: "node",
	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.json",
			},
		],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testPathIgnorePatterns: ["node_modules", "lib"],
	setupFiles: ["./jest.setup.js"],
}
