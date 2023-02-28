import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
export const Menu = () => {
  const activeLink = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#978835" : "#fff",
      textDecoration: "none",
    };
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: "1",
        gap: "20%",
      }}
    >
      <NavLink to="/" style={activeLink}>
        Home
      </NavLink>
      <NavLink to="/addUser" style={activeLink}>
        Add User
      </NavLink>
    </Box>
  );
};
