module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.testMatch = ["<rootDir>/src/ui/__tests__/cases/**/*"];
      jestConfig.setupFilesAfterEnv = [
        "<rootDir>/src/ui/__tests__/config/setup-files-after-env.ts",
      ];
      return jestConfig;
    },
  },
};
