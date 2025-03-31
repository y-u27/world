import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["/backend/tests/server.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: { "^.+\\.ts$": "ts-jest" },
};

export default config;
