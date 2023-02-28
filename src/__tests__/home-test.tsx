import { render, screen } from "@testing-library/react";
import { Home } from "../pages/home";

describe("Home page", () => {
  test("render correctly", () => {
    render(<Home />);
    const testElement = screen.getByRole("heading");
    expect(testElement).toBeInTheDocument();
  });
});
