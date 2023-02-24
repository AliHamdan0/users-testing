import { render, screen } from "@testing-library/react";
import App from "../App";

describe("APP Test", () => {
  test("App Test", () => {
    render(<App />);
    const testElement = screen.getByRole("heading");
    expect(testElement).toBeInTheDocument();
  });
});
