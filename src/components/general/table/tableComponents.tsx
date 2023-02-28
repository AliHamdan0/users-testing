import { styled, tableCellClasses, TableCell, TableRow } from "@mui/material/";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c596487a",
    color: "black",
    fontWeight: 900,
    fontSize: { xs: 12, md: 16 },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: { xs: 12, md: 16 },
    fontWeight: 400,
    minWidth: 100,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: "#a1d7ea08",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function CustomStyledTableCell({ children }) {
  return <StyledTableCell>{children}</StyledTableCell>;
}

export function CustomStyledTableRow({ children }) {
  return <StyledTableRow>{children}</StyledTableRow>;
}
