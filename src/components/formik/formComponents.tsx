import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useField } from "formik";

export const CustomTextField = ({
  ...props
}: {
  [x: string]: any;
  name: string;
}) => {
  const [field, meta] = useField(props);
  const { requiredstar, inputlabel } = props;
  return (
    <>
      <TextField
        {...props}
        {...field}
        label={
          <Box>
            {requiredstar == "true" ? (
              <Typography component="span" sx={{ color: "brand.primaryDark" }}>
                *{" "}
              </Typography>
            ) : null}
            {inputlabel}
          </Box>
        }
      />
    </>
  );
};
