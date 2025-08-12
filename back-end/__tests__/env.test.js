import { jest } from "@jest/globals";
import dotenv from "dotenv";
dotenv.config();

describe("Environment Variables", () => {

  it("should have the NODE_ENV variable set", () => {
    expect(process.env.NODE_ENV).toBeTruthy();
    expect(process.env.NODE_ENV).toMatchSnapshot();
  });

});
