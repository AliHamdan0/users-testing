import { Typography, Container } from "@mui/material";
import { Box } from "@mui/system";
import Loading from "../components/general/loading";
import { useState, useId } from "react";
import IncidentForm from "../components/newUser/incidentForm";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/general/alertMessage";
import { RootState } from "../services/redux-toolkit/store";
import { usersSlice } from "../services/redux-toolkit/slices/usersSlice";
import { useNavigate } from "react-router-dom";

export const NewUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state?.usersSlice?.info);
  const { actions } = usersSlice;
  const { saveUser } = actions;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formValues = {
    id: useId(),
    hobby: "",
    date: new Date().toLocaleDateString(),
    type: "New",
    username: "",
    email: "",
  };
  const handleSubmit = async (values: never) => {
    setLoading(true);
    dispatch(saveUser([...users, values]));
    setSuccessful(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <>
      <title>New User</title>

      {loading && <Loading />}
      {successful && <AlertMessage alertType="success" />}
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: "90%" },
            padding: { xs: "1.4rem", sm: null },
            margin: { xs: "3.7rem 0rem", sm: "7.5rem 0rem" },
          }}
        >
          <Box sx={{ marginBottom: "1.875rem" }}>
            <Typography
              sx={{
                fontSize: "2.25rem",
                lineHeight: "140%",
                fontWeight: "900",
              }}
            >
              Create New User
            </Typography>
          </Box>
          <Box>
            <IncidentForm
              type="new"
              initialValues={formValues}
              onSubmit={handleSubmit}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
