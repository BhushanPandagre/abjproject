  import * as React from "react";
  import Avatar from "@mui/material/Avatar";
  import Button from "@mui/material/Button";
  import CssBaseline from "@mui/material/CssBaseline";
  import TextField from "@mui/material/TextField";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import Checkbox from "@mui/material/Checkbox";


  import Grid from "@mui/material/Grid";
  import Box from "@mui/material/Box";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import Typography from "@mui/material/Typography";
  import Container from "@mui/material/Container";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { Link, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import axios from "axios";

  import InputLabel from "@mui/material/InputLabel";
  import MenuItem from "@mui/material/MenuItem";
  import FormControl from "@mui/material/FormControl";
  import Select from "@mui/material/Select";
  import Logo from "../../assets/img/akash_bangels_logo.png";

  const defaultTheme = createTheme();

  export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("admin"); // Default to admin
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Simple email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors({ ...errors, email: "Please enter a valid email address" });
        return;
      } else {
        setErrors({ ...errors, email: "" });
      }

      // Password length validation
      if (password.length < 5) {
        setErrors({
          ...errors,
          password: "Password must be at least 6 characters long",
        });
        return;
      } else {
        setErrors({ ...errors, password: "" });
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password, userType }
        );
        const { token, role } = response.data;
        localStorage.setItem("token", token);

        if (role === "admin") {
          navigate("/admin_dashboard");
        } else if (role === "sub-admin") {
          navigate("/add_purchase_radhe");
        } else if (role === "cashier") {
          // Handle other roles if needed
          navigate("/cash_detail_list");
        } else {
          navigate("user_dashboard");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors({
            ...errors,
            email: "Invalid credentials. Please check your email and password.",
          });
        }
        if (error.response && error.response.status === 401) {
          setErrors({
            ...errors,
            password:
              "Invalid credentials. Please check your password and email .",
          });
        } else if (error.response && error.response.status === 401) {
          setErrors({
            ...errors,
            email: "Unauthorized access. Please select the correct role.",
          });
        } else {
          console.error(
            "Login error:",
            error.response ? error.response.data.message : error.message
          );
          // Handle other errors if needed
        }
      }
    };

    return (
      <div>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="lg" >
            <CssBaseline />
          <div className="row">
          
            <div className="col-xl-6  mx-auto">
            <Box
              sx={{
                marginTop: 8,
                // display: "flex",
                // flexDirection: "column",
                alignItems: "center",
              }}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                // background: "#e0f7fa",
              
              }}
              className="p-4 "
            >
              
              <div className="mb-3">
                <img
                  src={Logo}
                  alt=""
                  className="img-fluid d-flex  mx-auto"
                  style={{ width: "150px" }}
                />
              </div>
              <Typography component="h1" variant="h5">
                <span className="fw-bold d-flex justify-content-center">Login</span>
              </Typography>
              <div className="row">
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                
                >
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="User Id"
                      autoComplete="email"
                      id="email"
                      size="small"
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`form-control ${errors.email && "is-invalid"}`}
                    />

                    {errors.email && (
                      <p className="invalid-feedback text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      id="password"
                      autoComplete="password"
                      type="password"
                      size="small"
                      value={password}
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="col-xl-12 mt-3">
                    <FormControl fullWidth    >
                      <InputLabel id="demo-simple-select-label">
                        User Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="UserType"
                        margin="normal"
                        id="userType"
                      
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        size="small"
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="sub-admin">Sub Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="cashier">Cashier</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log In
                  </Button>
                  {/* <Grid container>
                    <Grid item xs>
                      <Link
                        to="/forgot_password"
                        variant="body2"
                        className="text-decoration-none"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item className="ms-3">
                      <span>Not signed up? <Link to="/sign_up">Signup</Link></span>
                      <Link
                        to="/sign_up"
                        variant="body2"
                        className="text-decoration-none"
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid> */}
                </Box>
              </div>
            </Box>
            </div>
          </div>
          
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </Container>
        </ThemeProvider>
      </div>
    );
  }



// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import Logo from "../../assets/img/akash_bangels_logo.png";

// const defaultTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2", // Customize primary color
//     },
//     secondary: {
//       main: "#d32f2f", // Customize secondary color
//     },
//   },
//   typography: {
//     fontFamily: "Trirong", // Use Trirong font family
//   },
// });

// const CustomContainer = styled(Container)(({ theme }) => ({
//   backgroundColor: "#ffffff",
//   border: "1px solid #1976d2",
//   borderRadius: "10px",
//   padding: theme.spacing(4),
//   marginTop:"100px",
//   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//   // transition: "transform 0.3s ease-in-out",
//   // "&:hover": {
//   //   transform: "scale(1.02)",
//   // },
// }));

// const CustomButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     transition: "background-color 0.3s ease-in-out",
//   },
// }));

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrors({ ...errors, email: "Please enter a valid email address" });
//       return;
//     } else {
//       setErrors({ ...errors, email: "" });
//     }

//     if (password.length < 6) {
//       setErrors({
//         ...errors,
//         password: "Password must be at least 6 characters long",
//       });
//       return;
//     } else {
//       setErrors({ ...errors, password: "" });
//     }

//     try {
//       const response = await api.post("/api/auth/login", { email, password });
//       const { token, role } = response.data;
//       localStorage.setItem("token", token);

//       switch (role) {
//         case "admin":
//           navigate("/user_category");
//           break;
//         case "sub-admin":
//           navigate("/add_purchase_radhe");
//           break;
//         case "cashier":
//           navigate("/cash_detail_list");
//           break;
//         case "user":
//           navigate("/user_dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (error) {
//       if (error.response) {
//         const status = error.response.status;
//         if (status === 401) {
//           setErrors({
//             ...errors,
//             email: "Invalid credentials. Please check your email and password.",
//           });
//         } else {
//           console.error("Login error:", error.response.data.message);
//         }
//       } else {
//         console.error("Login error:", error.message);
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <CustomContainer>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={Logo}
//               alt="Logo"
//               className="img-fluid"
//               style={{ width: "150px", marginBottom: "16px" }}
//             />
//             <Typography component="h1" variant="h5">
//               <span>Login</span>
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="User Id"
//                 autoComplete="email"
//                 id="email"
//                 size="small"
//                 autoFocus
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={Boolean(errors.email)}
//                 helperText={errors.email}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Password"
//                 id="password"
//                 autoComplete="password"
//                 type="password"
//                 size="small"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={Boolean(errors.password)}
//                 helperText={errors.password}
//               />
//               <CustomButton
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Log In
//               </CustomButton>
//             </Box>
//           </Box>
//         </CustomContainer>
//       </Container>
//     </ThemeProvider>
//   );
// }




// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// // import api from "../../services/api";
// import Logo from "../../assets/img/akash_bangels_logo.png";

// const defaultTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2", // Customize primary color
//     },
//     secondary: {
//       main: "#d32f2f", // Customize secondary color
//     },
//   },
//   typography: {
//     fontFamily: "Trirong", // Use Trirong font family
//   },
// });

// const CustomContainer = styled(Container)(({ theme }) => ({
//   backgroundColor: "#ffffff",
//   border: "1px solid #1976d2",
//   borderRadius: "10px",
//   padding: theme.spacing(4),
//   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//   transition: "transform 0.3s ease-in-out",
//   // "&:hover": {
//   //   transform: "scale(1.02)",
//   // },
// }));

// const CustomButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: "#fff  ",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     transition: "background-color 0.3s ease-in-out",
//   },
// }));

// const Background = styled("div")({
//   backgroundColor: "#f0f4f8", // Light grayish-blue background
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrors({ ...errors, email: "Please enter a valid email address" });
//       return;
//     } else {
//       setErrors({ ...errors, email: "" });
//     }

//     if (password.length < 6) {
//       setErrors({
//         ...errors,
//         password: "Password must be at least 6 characters long",
//       });
//       return;
//     } else {
//       setErrors({ ...errors, password: "" });
//     }

//     try {
//       const response = await api.post("/api/auth/login", { email, password });
//       const { token, role } = response.data;
//       localStorage.setItem("token", token);

//       switch (role) {
//         case "admin":
//           navigate("/user_category");
//           break;
//         case "sub-admin":
//           navigate("/add_purchase_radhe");
//           break;
//         case "cashier":
//           navigate("/cash_detail_list");
//           break;
//         case "user":
//           navigate("/user_dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (error) {
//       if (error.response) {
//         const status = error.response.status;
//         if (status === 401) {
//           setErrors({
//             ...errors,
//             email: "Invalid credentials. Please check your email and password.",
//           });
//         } else {
//           console.error("Login error:", error.response.data.message);
//         }
//       } else {
//         console.error("Login error:", error.message);
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Background>
//         <CssBaseline />
//         <CustomContainer component="main" maxWidth="xs">
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={Logo}
//               alt="Logo"
//               className="img-fluid"
//               style={{ width: "150px", marginBottom: "16px" }}
//             />
//             <Typography component="h1" variant="h5">
//               <span>Login</span>
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="User Id"
//                 autoComplete="email"
//                 id="email"
//                 size="small"
//                 autoFocus
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={Boolean(errors.email)}
//                 helperText={errors.email}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Password"
//                 id="password"
//                 autoComplete="password"
//                 type="password"
//                 size="small"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={Boolean(errors.password)}
//                 helperText={errors.password}
//               />
//               <CustomButton
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Log In
//               </CustomButton>
//             </Box>
//           </Box>
//         </CustomContainer>
//       </Background>
//     </ThemeProvider>
//   );
// }




// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// // import api from "../../services/api";
// import Logo from "../../assets/img/akash_bangels_logo.png";
// import BackgroundImage from "../../assets/img/jewelery_background_1.jpg";

// const defaultTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#d32f2f",
//     },
//   },
//   typography: {
//     fontFamily: "Trirong",
//   },
// });

// const CustomContainer = styled(Container)(({ theme }) => ({
//   backgroundColor: "#ffffff",
//   border: "1px solid #1976d2",
//   borderRadius: "10px",
//   padding: theme.spacing(4),
//   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.02)",
//   },
// }));

// const CustomButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     transition: "background-color 0.3s ease-in-out",
//   },
// }));

// const Background = styled("div")({
//   backgroundImage: `url(${BackgroundImage})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrors({ ...errors, email: "Please enter a valid email address" });
//       return;
//     } else {
//       setErrors({ ...errors, email: "" });
//     }

//     if (password.length < 6) {
//       setErrors({
//         ...errors,
//         password: "Password must be at least 6 characters long",
//       });
//       return;
//     } else {
//       setErrors({ ...errors, password: "" });
//     }

//     try {
//       const response = await api.post("/api/auth/login", { email, password });
//       const { token, role } = response.data;
//       localStorage.setItem("token", token);

//       switch (role) {
//         case "admin":
//           navigate("/user_category");
//           break;
//         case "sub-admin":
//           navigate("/add_purchase_radhe");
//           break;
//         case "cashier":
//           navigate("/cash_detail_list");
//           break;
//         case "user":
//           navigate("/user_dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (error) {
//       if (error.response) {
//         const status = error.response.status;
//         if (status === 401) {
//           setErrors({
//             ...errors,
//             email: "Invalid credentials. Please check your email and password.",
//           });
//         } else {
//           console.error("Login error:", error.response.data.message);
//         }
//       } else {
//         console.error("Login error:", error.message);
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Background>
//         <CssBaseline />
//         <CustomContainer component="main" maxWidth="xs">
         
//             <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={Logo}
//               alt="Logo"
//               className="img-fluid"
//               style={{ width: "150px", marginBottom: "16px" }}
//             />
//             <Typography component="h1" variant="h5">
//               <span>Login</span>
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="User Id"
//                 autoComplete="email"
//                 id="email"
//                 size="small"
//                 autoFocus
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={Boolean(errors.email)}
//                 helperText={errors.email}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Password"
//                 id="password"
//                 autoComplete="password"
//                 type="password"
//                 size="small"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={Boolean(errors.password)}
//                 helperText={errors.password}
//               />
//               <CustomButton
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Log In
//               </CustomButton>
//             </Box>
//           </Box>
          
        
//         </CustomContainer>
//       </Background>
//     </ThemeProvider>
//   );
// }



