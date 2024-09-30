import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { APIServer } from "./src/tests/server";

beforeAll(() => {
  APIServer.listen();
});

afterAll(() => {
  APIServer.close();
});

afterEach(() => {
  APIServer.resetHandlers();
  cleanup();
});
