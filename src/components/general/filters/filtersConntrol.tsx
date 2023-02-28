import { DateTimeField, SearchField, SelectField } from "./filtersComponents";

export const FiltersControl = ({ control, ...rest }) => {
  switch (control) {
    case "search":
      return <SearchField {...rest} />;
    case "select":
      return <SelectField {...rest} />;
    case "dateTime":
      return <DateTimeField {...rest} />;
    default:
      return <></>;
  }
};
