import { render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

// Next.jsのHooksをモック
jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("PostCreate", () => {
  it("");
});
