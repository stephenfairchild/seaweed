module.exports = {
    extensionsToTreatAsEsm: [".ts"],
    collectCoverage: true,
    coverageReporters: ["json", "lcov", "text", "clover", "text-summary"],
    testMatch: ["<rootDir>/src/**/*.test.{tsx,ts}"],
    testPathIgnorePatterns: ["<rootDir>/types/"],
    moduleNameMapper: {
        seaweed: "<rootDir>/src/index.ts",
    },
};
