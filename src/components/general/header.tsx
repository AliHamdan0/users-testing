import { Box, Container, Link } from "@mui/material";
import style from "../../styles/headFooter.module.css";
import { Menu } from "./menu";

///
export const Header = () => {
  return (
    <Box sx={{ backgroundColor: "brand.secondaryDark", mb: "50px" }}>
      <Container maxWidth="lg" sx={{ height: "71px" }}>
        <Box className={style.headFlex}>
          <Box
            className={style.headList}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Link href="/" sx={{ height: "60px", flexGrow: "1" }}>
              <img
                alt=""
                src="/images/logo.png"
                width={60}
                height={60}
                style={{ borderRadius: "50%" }}
              />
            </Link>
            <Menu />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
