import { Box, Menu, MenuItem, Typography, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import { CustomModal } from "../customModal";
import style from "../../../styles/incidents.module.css";
// For table menus that only contains links.
export default function TableMenuLinks({ menuData, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState<null | any>();
  const [openEdit, setOpenEdit] = useState<boolean | null>(false);
  const [openDelete, setOpenDelete] = useState<boolean | null>(false);
  const [type, setType] = useState("0"); //0 none, 1 edit , 2 delete
  const handleClose = (value) => {
    setType(value);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (type === "1") {
      setOpenEdit(true);
      setOpenDelete(false);
    } else if (type === "2") {
      setOpenEdit(false);
      setOpenDelete(true);
    } else {
      setOpenEdit(false);
      setOpenDelete(false);
    }
  }, [type]);

  return (
    <Box>
      <MoreHorizIcon
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      />
      <Menu
        anchorEl={anchorEl}
        elevation={0}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ padding: "0px" }}
        MenuListProps={{
          sx: {
            backgroundColor: "grey.white",
            border: 1,
            borderColor: "brand.secondaryLight",
            borderRadius: "5%",
            padding: "0px",
            boxShadow: "none",
            minWidth: "70px",
          },
        }}
      >
        {menuData.map((item, index) => (
          <Box
            key={index}
            sx={{
              borderBottom: index < menuData.length - 1 ? "1px solid" : "",
              borderColor: "brand.secondaryLight",
            }}
          >
            <MenuItem
              onClick={() => handleClose(item.value)}
              sx={{
                justifyContent: "center",
                borderBottom: 1,
                borderColor: "brand.secondaryLight",
                "&:last-child": {
                  borderBottom: 0,
                },
                color: "brand.secondaryDark",
                "&:hover": {
                  backgroundColor: "brand.secondaryLight",
                  color: "grey.white",
                },
              }}
            >
              <Typography
                sx={{
                  py: "8px",
                  color: "inherit",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                {item.name}
              </Typography>
            </MenuItem>
          </Box>
        ))}
      </Menu>
      <CustomModal open={openEdit} setOpen={setOpenEdit} setType={setType}>
        <Box sx={{ width: "200px", height: "200px" }}>Edit</Box>
      </CustomModal>
      <CustomModal open={openDelete} setOpen={setOpenDelete} setType={setType}>
        <Box className={style.deleteModalContainer}>
          <Box>
            <Typography component="p" sx={{ fontSize: "24px" }}>
              Do You Want To Delete This User
            </Typography>
            <Box className={style.DeleteButtonsContainer}>
              <Button variant="main" onClick={() => handleDelete()}>
                Confirm
              </Button>
              <Button variant="cancel" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
}
