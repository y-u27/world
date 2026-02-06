import { render, screen } from "@testing-library/react"
import Header from "./Header"

describe("Header", () => {
  it("タイトル表示", () => {
    render(<Header/>);
    expect(screen.getByText("My App")).toBeInTheDocument();
  })
})