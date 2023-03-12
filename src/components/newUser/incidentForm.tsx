import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { CustomTextField } from "../formik/formComponents";
import { useState } from "react";

export default function IncidentForm({
  type,
  setType = (value) => {},
  initialValues,
  onSubmit,
  setEditOpen = (value) => {},
}) {
  const customInputStyles = {
    width: "100%",
    marginBottom: "1rem",
  };
  const hobbies = [
    { id: "Swimming", name: "Swimming" },
    { id: "Reading", name: "Reading" },
    { id: "Playing Football", name: "Playing Football" },
  ];

  const NewIncidentForm = () => (
    <>
      <Button variant="main" type="submit" sx={{ whiteSpace: "nowrap" }}>
        New User
      </Button>{" "}
    </>
  );

  const EditIncidentForm = () => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2.5rem",
        }}
      >
        <Button
          variant="cancel"
          onClick={() => {
            setEditOpen(false);
            setType("0");
          }}
        >
          Cancel
        </Button>
        <Button variant="main" type="submit" sx={{ whiteSpace: "nowrap" }}>
          Update User
        </Button>
      </Box>
    </>
  );
  const handleSubmit = async (values) => {
    onSubmit(values);
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <CustomTextField
            name="username"
            requiredstar="true"
            inputlabel="User name"
            type="text"
            required
            autoComplete="off"
            sx={customInputStyles}
          />

          <FormControl sx={customInputStyles}>
            <InputLabel id="hobby">
              <Box>
                <Typography
                  component="span"
                  sx={{ color: "brand.primaryDark" }}
                >
                  *{" "}
                </Typography>
                Hobby
              </Box>
            </InputLabel>
            <Field name="hobby">
              {({ field }) => (
                <Select {...field} required labelId="hobby">
                  {hobbies.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Field>
          </FormControl>

          <CustomTextField
            name="email"
            type="email"
            inputlabel="email"
            requiredstar="true"
            required
            autoComplete="off"
            sx={customInputStyles}
          />
          {type == "new" && <NewIncidentForm />}
          {type == "edit" && <EditIncidentForm />}
        </Form>
      </Formik>
    </>
  );
}
