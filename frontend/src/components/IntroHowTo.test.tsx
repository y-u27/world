import { render, screen } from "@testing-library/react";
import IntroHowTo from "./IntroHowTo";
import { ChakraProvider } from "@chakra-ui/react";

describe("IntroHowTo", () => {
  it("「使い方」表示", () => {
    render(
      <ChakraProvider>
        <IntroHowTo />
      </ChakraProvider>,
    );
    expect(screen.getByText("使い方")).toBeInTheDocument();
  });
});
