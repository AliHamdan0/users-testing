import { createTheme } from "@mui/material/styles";

export const CustomTheme = () => {
  const theme = createTheme({
    status: {
      danger: "red",
    },
    palette: {
      secondary: { main: "#c59648d9" }, //for pagination
      info: { main: "#fff" }, // for select in mobile drop
      brand: {
        primaryDark: "#BF3B34",
        primaryMain: "#F04B4B",
        primaryLight: "#E58977",
        secondaryDark: "#c59648",
        secondaryMain: "#c59648d9",
        secondaryLight: "#c596487a",
      },
      grey: {
        white: "#fff",
        light: "#F4EFF4",
        regular: "#C9C5CA",
        neutral: "#939094",
        dark: "#484649",
        black: "#000000",
      },
      others: {
        orange: "#FF7629",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: "Cairo",
    },

    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "6.25rem",
            borderColor: "#c59648",
            "&:hover": {
              borderColor: "#c59648",
            },
            padding: "0.625rem 1.875rem",
            fontSize: "1rem",
            fontWeight: "900",
            lineHeight: "1.75rem",
            textTransform: "none",
          },
        },
        variants: [
          {
            props: { variant: "main" },
            style: {
              color: "#fff",
              backgroundColor: "#c59648d9",
              "&:hover": {
                backgroundColor: "#c59648d9",
              },
            },
          },
          {
            props: { variant: "cancel" },
            style: {
              color: "#000",
              backgroundColor: "#E58977",
              "&:hover": {
                backgroundColor: "#E58977",
              },
            },
          },
          {
            props: { variant: "upload" },
            style: {
              backgroundColor: "#F4EFF4",
              "&:hover": {
                backgroundColor: "#F4EFF4",
              },
            },
          },
        ],
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "&.Mui-error": {
                "&:hover fieldset": {
                  borderColor: "#d32f2f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#d32f2f",
                },
              },
              "& fieldset": {
                borderColor: "#C9C5CA",
                borderWidth: "1px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#C9C5CA",
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: "#C9C5CA",
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          //@ts-ignore
          root: {
            "&:hover": {
              "&& fieldset": {
                borderColor: "#C9C5CA",
              },
            },
            "&.Mui-focused": {
              "&& fieldset": {
                borderColor: "#C9C5CA",
                borderWidth: "1px",
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "black",
              opacity: "1",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#939094",
            opacity: "1",
            "&.Mui-error": {
              "&.Mui-focused": {
                color: "#d32f2f",
              },
            },
            "&.Mui-focused": {
              color: "#939094",
            },
          },
          asterisk: {
            display: "none",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            color: "inherit",
            fontFamily: "inherit",
          },
        },
      },
    },
  });
  return theme;
};
