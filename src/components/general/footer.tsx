import { Typography, Box, Container } from "@mui/material";
import style from "../../styles/headFooter.module.css";
export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "grey.light", mt: "50px" }}>
      <Container maxWidth="lg">
        <Box className={style.footerBox}>
          <Box className={style.footerInnerBox}>
            <Typography
              className={style.footerText}
              sx={{
                color: "grey.black",
                display: { xs: "none", md: "block" },
              }}
            >
              Support
            </Typography>
          </Box>
          <Box>
            <Typography
              className={style.footSmText}
              sx={{ color: "grey.dark" }}
            >
              &copy;{`2023`}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
