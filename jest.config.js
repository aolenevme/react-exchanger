module.exports = {
    roots: ["<rootDir>/src"],
    collectCoverageFrom: ["src/**/*.js"],
    setupFiles: ["react-app-polyfill/jsdom"],
    setupFilesAfterEnv: ["<rootDir>/jest/setupTests.js"],
    testMatch: [
        "<rootDir>/**/__tests__/**/*.test.js"
    ],
    testEnvironment: "jest-environment-jsdom-fourteen",
    transform: {
        "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/jest/cssTransform.js",
        "^(?!.*\\.(js|css|json)$)":
            "<rootDir>/jest/fileTransform.js"
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    modulePaths: [],
    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    moduleFileExtensions: [
        "js",
        "json",
        "node"
    ],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ]
};
