import { render, screen } from "@testing-library/react";
import { Home } from "../pages/home";
import { renderWithProviders } from "../test-utils";

describe("Home page", () => {
  test("render correctly", () => {
    renderWithProviders(<Home />);
    const testElement = screen.getByText(/users list/i);
    expect(testElement).toBeInTheDocument();
  });

  test("render Providers", () => {
    renderWithProviders(<Home />);
    const testElement = screen.getByRole("cell", { name: /swimming/i });
    expect(testElement).toBeInTheDocument();
  });
});
