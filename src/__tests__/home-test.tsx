import { logRoles, render, screen } from "@testing-library/react";
import { Home } from "../pages/home";
import { renderWithProviders } from "../test-utils";
import user from "@testing-library/user-event";
import { MemoFilters } from "../components/homePage/filters";
import { TableButtonsFilters } from "../components/general/table/tableButtonsFilters";
import TableMenuLinks from "../components/general/table/tableMenuLinks";
import { PaginationInc } from "../components/general/pagination";

describe("Home page", () => {
  test("render correctly", () => {
    renderWithProviders(<Home />);
    const testElement = screen.getByText(/users list/i);
    expect(testElement).toBeInTheDocument();
  });

  test("render with Providers", () => {
    renderWithProviders(<Home />);
    const testElement = screen.getByRole("cell", { name: /swimming/i });
    expect(testElement).toBeInTheDocument(); ///Redux store exist
    const button = screen.getByRole("button", { name: /add new user/i });
    expect(button).toHaveStyle("background-color: #c59648d9"); //Mui Theme exist
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
    const filterButton = screen.getByRole("button", {
      name: /apply filters/i,
    });
    await user.click(filterButton);
    expect(setFilters).toHaveBeenCalledTimes(1);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);
    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilterUser).toHaveBeenCalledTimes(1);
  });
});

describe("Table Buttons Filter types", () => {
  test("click on the filter buttons above table", async () => {
    user.setup();
    const setFilterType = jest.fn();
    const setPage = jest.fn();
    const options = ["All", "New", "Old"];
    render(
      <TableButtonsFilters
        setFilterType={setFilterType}
        setPage={setPage}
        options={options}
      />
    );
    const AllButton = screen.getByRole("button", { name: /all/i });
    await user.click(AllButton);
    expect(setFilterType).toHaveBeenCalledTimes(1);
  });
});

describe("Table", () => {
  test("open popup", async () => {
    user.setup();
    renderWithProviders(<Home />);
    const dotsIcon = screen.getAllByTestId("MoreHorizIcon");
    await user.click(dotsIcon[0]);
    const popup = screen.getByRole("menu");
    expect(popup).toBeInTheDocument();

    const editOption = screen.getByRole("menuitem", { name: /edit/i });
    expect(editOption).toBeInTheDocument();
    await user.click(editOption);

    const editUser = screen.getByRole("button", { name: /update user/i });
    expect(editUser).toBeInTheDocument();
  }, 20000);

  test("render delete user popup", async () => {
    user.setup();
    renderWithProviders(<Home />);
    const dotsIcon = screen.getAllByTestId("MoreHorizIcon");
    // screen.debug(dotsIcon[0]);
    await user.click(dotsIcon[0]);
    const popup = screen.getByRole("menu");
    expect(popup).toBeInTheDocument();

    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });
    expect(deleteOption).toBeInTheDocument();
    await user.click(deleteOption);
    const deleteUser = screen.getByRole("button", { name: /confirm/i });
    expect(deleteUser).toBeInTheDocument();
  }, 20000);

  test("delete user function", async () => {
    user.setup();
    const tableMenuData = [
      { name: "Edit", value: "1" },
      { name: "Delete", value: "2" },
    ];
    const handleDelete = jest.fn();
    const handleEdit = jest.fn();
    renderWithProviders(
      <TableMenuLinks
        menuData={tableMenuData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        selectedItem={1}
      />
    );
    const dotsIcon = screen.getByTestId("MoreHorizIcon");
    await user.click(dotsIcon);
    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });
    expect(deleteOption).toBeInTheDocument();
    await user.click(deleteOption);

    const deleteButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  }, 20000);
});

describe("render pagination", () => {
  test("render correctly", async () => {
    user.setup();
    const setPage = jest.fn();
    render(<PaginationInc count={40} page={1} setPage={setPage} />);
    const pageButton = screen.getByRole("button", { name: /page 1/i });
    expect(pageButton).toBeInTheDocument();
    const pageThree = screen.getByRole("button", { name: /page 3/i });
    await user.click(pageThree);
    expect(setPage).toHaveBeenCalledTimes(1);
  });
});

describe("Add User Button in Home Page", () => {
  test("navigate to the new user page on Click", async () => {
    user.setup();
    renderWithProviders(<Home />);
    const addUserButton = screen.getByRole("button", { name: /add new user/i });
    await user.click(addUserButton);
    // Check correct page url showed up
    expect(document.URL).toMatch("new-user");
  });
});
////Another way if we have select html element
///but Mui render select as div element so we can't use it.

//   const selection = screen.getByRole('listbox', { name: /​/i });
//   await user.selectOptions(selection, [
//     'Swimming',
//     'Reading',
//     'Playing Football',
//   ]);
//   const optionOne = screen.getByRole('option', {
//     name: 'Swimming',
//   }) as HTMLOptionElement;
//   expect(optionOne.selected).toBe(true);

//   const optionTwo = screen.getByRole('option', {
//     name: 'Reading',
//   }) as HTMLOptionElement;
//   expect(optionTwo.selected).toBe(false);

//   const optionThree = screen.getByRole('option', {
//     name: 'Playing Football',
//   }) as HTMLOptionElement;
//   expect(optionThree.selected).toBe(false);
// });
////////
