import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";

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

const defaultTheme = createTheme();

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default to admin
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        await axios.post("http://localhost:5000/api/auth/register", {
          username,
          email,
          password,
          role,
        });
        alert("User registered successfully");
        navigate("/");
        // Redirect to login page or show success message
      } catch (error) {
        if (error.response.data.message === "User already exists") {
          alert("User already exists");
        } else {
          console.error("Registration error:", error.response.data.message);
        }
      }
    }
  };

  const handleValidation = () => {
    const errors = {};
    let isValid = true;

    if (!username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme} className="bg-danger">
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              background: "",
            }}
            className="p-4"
            
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={`./src/assets/img/akash_bangels.png`} >
              <LockOutlinedIcon />
              
            </Avatar> */}
            <div className="mb-3">
              <img
                src="./src/assets/img/akash_bangels_logo.png"
                alt=""
                className="img-fluid"
                style={{ width: "150px" }}
              />
            </div>
            <Typography component="h1" variant="h5">
              <span className="fw-bold">Sign Up</span>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              // noValidate
              sx={{ mt: 1 }}
            >
              {/* <TextField
                margin="normal"
                required
                fullWidth
                label="User Name"
                autoComplete="user_name"
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /> */}

              <TextField
                margin="normal"
                required
                fullWidth
                label="User Name"
                autoComplete="user_name"
                type="text"
                placeholder="User Name"
                className={`form-control ${errors.username && "is-invalid"}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="small"
              />

              {errors.username && (
                <p className="invalid-feedback text-danger">
                  {errors.username}
                </p>
              )}

              <TextField
                margin="normal"
                label="Email"
                required
                fullWidth
                type="email"
                placeholder="Email"
                className={`form-control ${errors.email && "is-invalid"}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
              />

              {errors.email && (
                <p className="invalid-feedback">{errors.email}</p>
              )}

              <TextField
                margin="normal"
                label="Password"
                required
                fullWidth
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
              />

              {errors.password && (
                <p className="invalid-feedback">{errors.password}</p>
              )}

              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  // labelId="demo-simple-select-label"
                  label="UserType"
                  size="small"
                  // margin="normal"
                  // id="userType"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="sub-admin">Sub Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="cashier">Cashier</MenuItem>

                  {/* <option value="admin">Admin</option>
                                <option value="subadmin">Sub Admin</option>
                                <option value="cashier">Cashier</option>
                                <option value="user">User</option> */}
                </Select>
              </FormControl>

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={() => {
                //   navigate("/user_category");
                // }}
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  {/* <span>Not signed up? <Link to="/sign_up">Signup</Link></span> */}
                  <Link to="/" variant="body2" className="text-decoration-none">
                    {"Already signed up? Log In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </div>
  );
}
