import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  CustomStyledTableCell,
  CustomStyledTableRow,
} from "../general/table/tableComponents";
import TableMenuLinks from "../general/table/tableMenuLinks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useMemo, useState } from "react";
import { store } from "../../services/redux-toolkit/store";
import { usersSlice } from "../../services/redux-toolkit/slices/usersSlice";
export const TableData = ({ tableHeader, filterUser, setFilterUser }) => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const { actions } = usersSlice;
  const { saveUser } = actions;
  const tableMenuData = useMemo(
    () => [
      { name: "Edit", value: "1" },
      { name: "Delete", value: "2" },
    ],
    []
  );
  const handleDelete = () => {
    let newUsers = [...filterUser];
    newUsers?.splice(selectedItem, 1);
    setFilterUser([...newUsers]);
    store.dispatch(saveUser(newUsers));
  };
  const handleEdit = (values, setType) => {
    let newUsers = [...filterUser];
    newUsers[selectedItem] = values;
    setFilterUser([...newUsers]);
    store.dispatch(saveUser(newUsers));
    setType("0");
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map((name, index) => (
              <CustomStyledTableCell key={index}>{name}</CustomStyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filterUser?.map(
            (
              data: {
                id: number;
                username: string;
                hobby: string;
                date: string;
                email: string;
              },
              index: number
            ) => {
              return (
                <CustomStyledTableRow key={data?.id}>
                  <CustomStyledTableCell>{data?.id}</CustomStyledTableCell>
                  <CustomStyledTableCell>
                    {data?.username}
                  </CustomStyledTableCell>
                  <CustomStyledTableCell>{data?.email}</CustomStyledTableCell>
                  <CustomStyledTableCell>{data?.date}</CustomStyledTableCell>
                  <CustomStyledTableCell>{data?.hobby}</CustomStyledTableCell>
                  <CustomStyledTableCell>
                    {data?.id > 4 ? (
                      <Box
                        sx={{
                          border: "1px solid",
                          borderRadius: "50%",
                          borderColor: "others.orange",
                          backgroundColor: "others.orange",
                          color: "white",
                          width: "1.25rem",
                          height: "1.25rem",
                          textAlign: "center",
                        }}
                      >
                        !
                      </Box>
                    ) : (
                      <CheckCircleIcon sx={{ color: "grey.neutral" }} />
                    )}
                  </CustomStyledTableCell>
                  <CustomStyledTableCell>
                    <Box onClick={() => setSelectedItem(index)}>
                      <TableMenuLinks
                        menuData={tableMenuData}
                        handleDelete={() => handleDelete()}
                        handleEdit={(values, setType) =>
                          handleEdit(values, setType)
                        }
                        selectedItem={selectedItem}
                      />
                    </Box>
                  </CustomStyledTableCell>
                </CustomStyledTableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
