import { Alert, AlertTitle, Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";

export default function AlertMessage({ alertType }) {
  const [transition, setTransition] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTransition(false);
    }, 2000);
  });
  const alertMessage =
    alertType === "success" ? "Completed Successfully" : "Something Went Wrong";
  return (
    <>
      <Box
        sx={{ position: "fixed", width: "20%", bottom: "100px", right: "10px" }}
      >
        <Slide
          direction="left"
          in={transition}
          easing={{
            enter: "cubic-bezier(0, 1.5, .8, 1)",
            exit: "linear",
          }}
          mountOnEnter
          unmountOnExit
        >
          <Alert severity={alertType}>
            <AlertTitle>{alertType}</AlertTitle>
            {alertMessage}
          </Alert>
        </Slide>
      </Box>
    </>
  );
}
