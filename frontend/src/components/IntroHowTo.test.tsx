import { render, screen } from "@testing-library/react";
import IntroHowTo from "./IntroHowTo";
import { ChakraProvider } from "@chakra-ui/react";

global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock

describe("IntroHowTo", () => {
  it("「使い方」表示", async () => {
    render(
      <ChakraProvider>
        <IntroHowTo />
      </ChakraProvider>,
    );
    expect(await screen.findByText("使い方")).toBeInTheDocument();
  });
});
