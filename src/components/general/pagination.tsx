import { PaginationItem, Pagination, Box } from "@mui/material";
import { useState } from "react";
import style from "../../styles/incidents.module.css";
export const PaginationInc = ({ count, page, setPage }) => {
  return (
    <Pagination
      page={page}
      count={Math.ceil(count / 10)}
      color="secondary"
      showFirstButton
      showLastButton
      onChange={(e, v) => {
        e.preventDefault();
        setPage(v);
      }}
      renderItem={(item) => {
        return (
          <Box>
            <PaginationItem
              // className={item.page === page ? style.fw : ''}
              sx={{
                border: "1px solid",
                borderColor: "secondary.main",
                color: "secondary.main",
                minWidth: { xs: "24px", md: "32px" },
                maxHeight: { xs: "24px", md: "32px" },
              }}
              {...item}
            />
          </Box>
        );
      }}
    />
  );
};
