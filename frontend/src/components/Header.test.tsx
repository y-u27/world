import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => {
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
  });
});

describe("Header", () => {
  it("タイトル表示", () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>,
    );
    expect(screen.getByText("World Map SNS")).toBeInTheDocument();
  });
});
