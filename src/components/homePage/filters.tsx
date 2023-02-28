import { Grid, Box, Button } from "@mui/material";
import { useState, memo } from "react";
import { FiltersControl } from "../general/filters/filtersConntrol";
import style from "../../styles/incidents.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux-toolkit/store";
function Filters({ setFilters, setFilterUser }) {
  const initialFilterValue = {
    search: "",
    hobbies: [],
    email: "",
    endDate: new Date("2020-03-25"),
    incomplete: false,
  };
  const [filterValue, setFilterValue] = useState(initialFilterValue);
  const users = useSelector((state: RootState) => state?.usersSlice?.info);

  const hobbies = [
    { id: "Swimming", name: "Swimming" },
    { id: "Reading", name: "Reading" },
    { id: "Playing Football", name: "Playing Football" },
  ];
  const handleChangSearch = (newValue) => {
    setFilterValue({ ...filterValue, search: newValue });
  };
  const handleChangeHobbies = (event) => {
    const value = event.target.value;
    setFilterValue({
      ...filterValue,
      hobbies: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleChangeEmail = (newValue) => {
    setFilterValue({
      ...filterValue,
      email: newValue,
    });
  };
  const handleChangeDateEnd = (newValue) => {
    setFilterValue({
      ...filterValue,
      endDate: newValue.toISOString(),
    });
  };
  const FilterSubmit = () => {
    setFilters({
      ...filterValue,
    });
  };
  const handleClear = () => {
    setFilterValue({ ...initialFilterValue });
    setFilterUser(users);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FiltersControl
            control="search"
            value={filterValue.search}
            label="Search"
            handleChange={(e) => handleChangSearch(e.target.value)}
            submit={(e) => FilterSubmit()}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <FiltersControl
            control="select"
            label="Hobbies"
            value={filterValue.hobbies}
            handleChange={(e) => handleChangeHobbies(e)}
            options={hobbies}
            filterValue={filterValue}
            propertyName="hobbies"
            multiple
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FiltersControl
            control="search"
            label="Email"
            type="email"
            value={filterValue.email}
            handleChange={(e) => handleChangeEmail(e.target.value)}
            iconColor="transparent"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FiltersControl
            control="dateTime"
            label="After date"
            value={filterValue.endDate}
            handleChange={(e) => handleChangeDateEnd(e)}
          />
        </Grid>
      </Grid>
      <Box className={style.filtersButtonsContainer} sx={{ my: "15px" }}>
        <Button variant="main" onClick={() => FilterSubmit()}>
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          className={style.filterButton}
          sx={{
            color: "brand.secondaryDark",
            borderColor: "brand.secondaryDark",
            "&:hover": {
              color: "brand.secondaryDark",
              borderColor: "brand.secondaryDark",
            },
          }}
          onClick={() => handleClear()}
        >
          Clear
        </Button>
      </Box>
    </>
  );
}
export const MemoFilters = memo(Filters);
