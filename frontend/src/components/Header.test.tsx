import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { SessionProvider } from "next-auth/react";

describe("Header", () => {
  it("タイトル表示", () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    expect(screen.getByText("World Map SNS")).toBeInTheDocument();
  });
});
