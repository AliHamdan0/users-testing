import { Box, Button, Container, Typography } from "@mui/material";
import { PaginationInc } from "../components/general/pagination";
import { MemoFilters } from "../components/homePage/filters";
import { TableButtonsFilters } from "../components/general/table/tableButtonsFilters";
import { useRef, useState, useEffect, useMemo } from "react";
import style from "../styles/incidents.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../services/redux-toolkit/store";
import useFilterMethods from "../services/utilities/useFilterMethods";
import { TableData } from "../components/homePage/tableData";

export const Home = () => {
  const users = useSelector((state: RootState) => state?.usersSlice?.info);
  const [searchFilters, hobbiesFilters, dateFilters, emailFilters] =
    useFilterMethods();
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [filterUser, setFilterUser] = useState<any>(users);
  const [filters, setFilters] = useState({
    search: "",
    hobbies: [],
    email: "",
    endDate: new Date("2020-03-25"),
    incomplete: false,
  });
  const options = useMemo(() => ["All", "New", "Old"], []);
  const tableHeader = useMemo(
    () => ["ID", "User", "email", "Date", "Hobby", "Status", ""],
    []
  );
  const usersLength = filterUser.length;

  const getUsers = () => {
    let newUsers = users;
    if (filterType && filterType != "All")
      newUsers = users.filter((item: any) => item.type == filterType);

    for (var [key, value] of Object.entries(filters)) {
      if (value !== "" && value != null) {
        if (key === "search") newUsers = searchFilters(value, newUsers);
        if (key === "hobbies") newUsers = hobbiesFilters(value, newUsers);
        if (key === "endDate") newUsers = dateFilters(value, newUsers);
        if (key === "email") newUsers = emailFilters(value, newUsers);
      }
    }
    setFilterUser([...newUsers]);
  };

  useEffect(() => {
    setFilterUser(users);
  }, [users]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else getUsers();
  }, [filters, filterType]);
  //////

  return (
    <Container maxWidth="lg">
      <Box className={style.flexBetween}>
        <Typography className={style.title}>Users List</Typography>
        <Button variant="main">Add New User</Button>
      </Box>
      <Box sx={{ marginTop: "1.875rem" }}>
        <MemoFilters setFilters={setFilters} setFilterUser={setFilterUser} />
        <Box sx={{ pt: "30px", width: "100%" }}>
          <TableButtonsFilters
            setFilterType={setFilterType}
            setPage={setPage}
            options={options}
          />
        </Box>
        <Box sx={{ marginTop: "1.175rem" }}>
          <Typography
            className={style.tableText}
            sx={{ color: "grey.black", marginBottom: "8px" }}
          >
            {usersLength} users
          </Typography>
        </Box>
        <TableData
          tableHeader={tableHeader}
          filterUser={filterUser}
          setFilterUser={setFilterUser}
        />
        <Box>
          <Box className={style.PaginationContainer}>
            <PaginationInc count={10} page={page} setPage={setPage} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
