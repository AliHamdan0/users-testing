import { Button, Box } from "@mui/material";
import style from "../../../styles/incidents.module.css";
import { useState } from "react";
export const TableButtonsFilters = ({
  setFilterType,
  setPage,
  options = [],
}: {
  setFilterType: Function;
  setPage: Function;
  options: string[];
}) => {
  const [typeAction, setTypeAction] = useState("0");
  function TBox(ind) {
    return {
      boxShadow: 0,
      backgroundColor: typeAction == ind ? "brand.secondaryDark" : "grey.white",
      color: typeAction == ind ? "grey.white" : "grey.black",
      "&:hover": {
        boxShadow: 0,
        backgroundColor:
          typeAction == ind ? "brand.secondaryDark" : "grey.white",
        color: typeAction == ind ? "grey.white" : "grey.black",
      },
    };
  }
  ////
  const handleResolve = (type, res) => {
    setTypeAction(type);
    setFilterType(res);
    setPage(1);
  };

  return (
    <Box className={style.incidentsCategories} sx={{ color: "grey.light" }}>
      {options?.map((item, index) => (
        <Button
          key={index}
          sx={TBox(index.toString())}
          className={style.incidentCategoryButton}
          variant={typeAction == index.toString() ? "contained" : "outlined"}
          onClick={() => handleResolve(index.toString(), item)}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};
