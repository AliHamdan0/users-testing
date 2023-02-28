import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Button,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "../../../styles/incidents.module.css";
import { DateTimePicker } from "@mui/x-date-pickers";

export const SearchField = (props) => {
  const {
    value,
    handleChange,
    submit,
    label,
    iconColor = "brand.primaryMain",
    ...rest
  } = props;
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter") submit();
      }}
      className={style.text}
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              sx={{ color: iconColor, cursor: "pointer" }}
              onClick={() => submit()}
            />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};
/////
/// Dropdown Select /////
export const SelectField = (props) => {
  const {
    label,
    value,
    handleChange,
    options,
    filterValue,
    propertyName,
    ...rest
  } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => handleChange(e)}
        labelid={label}
        label={label}
        renderValue={(selected: []) =>
          selected
            ?.map((id) => options.find((item) => item.id == id)?.name)
            .join(",")
        }
        {...rest}
      >
        {options?.map((item) => (
          <MenuItem value={item.id + ""} key={item.id}>
            <Checkbox
              checked={filterValue[propertyName].indexOf(item.id + "") > -1}
            />
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

///Date & Time Picker///
export const DateTimeField = (props) => {
  const {
    label,
    value,
    handleChange,
    maxDate = null,
    minDate = null,
    ...rest
  } = props;

  function dateTransform(d: any) {
    if (d != null) return new Date(d).getTime();
    return -1;
  }
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <DateTimePicker
      label={label}
      value={dateTransform(value)}
      onChange={(e) => handleChange(e)}
      renderInput={(params) => (
        <TextField onKeyDown={onKeyDown} {...params} fullWidth />
      )}
      // maxDateTime={
      //   dateTransform(maxDate) < new Date().getTime()
      //     ? dateTransform(maxDate)
      //     : new Date()
      // }
      // minDateTime={dateTransform(minDate)}
      {...rest}
    />
  );
};
/////
