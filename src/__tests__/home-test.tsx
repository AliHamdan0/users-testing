import { render, screen } from "@testing-library/react";
import { Home } from "../pages/home";
import { renderWithProviders } from "../test-utils";
import user from "@testing-library/user-event";
import { MemoFilters } from "../components/homePage/filters";

describe.skip("Home page", () => {
  test("render correctly", () => {
    renderWithProviders(<Home />);
    const testElement = screen.getByText(/users list/i);
    expect(testElement).toBeInTheDocument();
  });

  test("render with Providers", () => {
    renderWithProviders(<Home />);
    const testElement = screen.getByRole("cell", { name: /swimming/i });
    expect(testElement).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /add new user/i });
    expect(button).toHaveStyle("background-color: #c59648d9");
  });
});

describe("render Filters in Home Page", () => {
  test("Search and Select Fields", async () => {
    user.setup();
    const setFilters = jest.fn();
    const setFilterUser = jest.fn();
    renderWithProviders(
      <MemoFilters setFilters={setFilters} setFilterUser={setFilterUser} />
    );
    ///Search Field
    const searchElement = screen.getByRole("textbox", { name: /search/i });
    await user.type(searchElement, "ali");
    expect(searchElement).toHaveValue("ali");

    ////Select Field
    const selectElement = screen.getByRole("button", { name: /​/i });
    await user.click(selectElement);
    const optionElement = screen.getByRole("option", { name: /reading/i });
    await user.click(optionElement);
    expect(selectElement).toHaveTextContent("Reading");
  });
  test("date Field", async () => {
    user.setup();
    const setFilters = jest.fn();
    const setFilterUser = jest.fn();
    renderWithProviders(
      <MemoFilters setFilters={setFilters} setFilterUser={setFilterUser} />
    );
    ///Date Field
    const dateElement = screen.getByLabelText(/after date/i);
    const calenderIcon = screen.getByTestId("CalendarIcon");
    await user.click(calenderIcon);
    const monthDay = screen.getByRole("gridcell", { name: /15/i });
    await user.click(monthDay);
    expect(dateElement).toBeValid();
  });
  test("apply Filters", async () => {
    user.setup();
    const setFilters = jest.fn();
    const setFilterUser = jest.fn();
    renderWithProviders(
      <MemoFilters setFilters={setFilters} setFilterUser={setFilterUser} />
    );
    const filterButton = screen.getByRole("button", { name: /apply filters/i });
    await user.click(filterButton);
    expect(setFilters).toHaveBeenCalledTimes(1);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);
    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilterUser).toHaveBeenCalledTimes(1);
  });
});
