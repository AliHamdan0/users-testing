import { Box, CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <Box sx={{ position: "fixed", bottom: "0", right: "0", zIndex: "5" }}>
      <CircularProgress sx={{ margin: "1rem", color: "brand.secondaryDark" }} />
    </Box>
  );
}
