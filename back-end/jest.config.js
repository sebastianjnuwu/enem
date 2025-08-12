export default {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".jsx", ".ts", ".tsx"],
  globals: {
    "babel-jest": {
      useESM: true,
    },
  },
};