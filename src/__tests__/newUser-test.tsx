import { logRoles, render, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import user from "@testing-library/user-event";
import { NewUser } from "../pages/newUser";
import IncidentForm from "../components/newUser/incidentForm";

describe("New User Page", () => {
  test("render correctly", () => {
    renderWithProviders(<NewUser />);
    /// screen.logTestingPlaygroundURL();
    const pageTitle = screen.getByText(/create new user/i);
    expect(pageTitle).toBeInTheDocument();
  });
  test("Enter username correctly", async () => {
    user.setup();
    const handleSubmit = jest.fn();
    const formValues = {
      id: 1,
      hobby: "",
      date: new Date().toLocaleDateString(),
      type: "New",
      username: "",
      email: "",
    };
    renderWithProviders(
      <IncidentForm
        type="new"
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    );
    const userField = screen.getByRole("textbox", {
      name: /\* user name/i,
    });
    await user.type(userField, "ali");
    expect(userField).toHaveValue("ali");
  });
  ////
  test("Select Hobby correctly", async () => {
    user.setup();
    const handleSubmit = jest.fn();
    const formValues = {
      id: 1,
      hobby: "",
      date: new Date().toLocaleDateString(),
      type: "New",
      username: "",
      email: "",
    };
    renderWithProviders(
      <IncidentForm
        type="new"
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    );
    const selectField = screen.getByRole("button", { name: /​/i });
    await user.click(selectField);
    const optionElement = screen.getByRole("option", { name: /reading/i });
    await user.click(optionElement);
    expect(selectField).toHaveTextContent("Reading");
  });
  /////
  test("Enter Email correctly", async () => {
    user.setup();
    const handleSubmit = jest.fn();
    const formValues = {
      id: 1,
      hobby: "",
      date: new Date().toLocaleDateString(),
      type: "New",
      username: "",
      email: "",
    };
    renderWithProviders(
      <IncidentForm
        type="new"
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    );
    const emailField = screen.getByRole("textbox", { name: /\* email/i });
    await user.type(emailField, "ali@gmail.com");
    expect(emailField).toHaveValue("ali@gmail.com");
  });
  ////
  test("rendering and submitting a new user", async () => {
    user.setup();
    const handleSubmit = jest.fn();
    const formValues = {
      id: 1,
      hobby: "",
      date: "22-02-2023",
      type: "New",
      username: "",
      email: "",
    };
    render(
      <IncidentForm
        type="new"
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    );
    const userField = screen.getByRole("textbox", {
      name: /\* user name/i,
    });
    await user.type(userField, "ali");

    const selectField = screen.getByRole("button", { name: /​/i });
    await user.click(selectField);
    const optionElement = screen.getByRole("option", { name: /reading/i });
    await user.click(optionElement);

    const emailField = screen.getByRole("textbox", { name: /\* email/i });
    await user.type(emailField, "ali@gmail.com");

    await user.click(
      screen.getByRole("button", {
        name: /new user/i,
      })
    );

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        date: "22-02-2023",
        email: "ali@gmail.com",
        hobby: "Reading",
        id: 1,
        type: "New",
        username: "ali",
      })
    );
  }, 20000);
});
