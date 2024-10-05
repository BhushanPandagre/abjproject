// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Logo from "../../assets/img/akash_bangels_logo.png";
// // import CssBaseline from "@mui/material/CssBaseline";
// import { Box, Dialog, Autocomplete } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// const defaultTheme = createTheme();


// export default function ResetPassword() {


//     const [email, setEmail] = useState("");
//     const [token, setToken] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [message, setMessage] = useState("");
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await axios.post("http://localhost:5000/api/auth/reset-password", {
//           email,
//           token,
//           newPassword,
//         });
//         setMessage("Password reset successfully");
//       } catch (error) {
//         console.error("Reset password error:", error);
//         setMessage("Error: Could not reset password");
//       }
//     };
  

//   return (
//     <div>

// <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs" >
       
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//             style={{
//               border: "1px solid black",
//               borderRadius: "5px",
          
            
//             }}
//             className="p-4 "
//           >
            
//             <div className="mb-3">
//               <img
//                  src={Logo}
//                 alt=""
//                 className="img-fluid"
//                 style={{ width: "150px" }}
//               />
//             </div>
//             <Typography component="h1" variant="h5">
//               <span className="fw-bold">Reset Password</span>
//             </Typography>
//             <div className="row">
//               <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ mt: 1 }}
               
//               >
//                 <div className="col-xl-12">
//                   <TextField
//                     margin="normal"
//                     fullWidth
//                     label="Email"             
//                     size="small"
//                     autoFocus
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
                  
//                   />

            
//                 </div>

//                 <div className="col-xl-12">
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Reset Token"
                 
                 
//                     size="small"
//                     autoFocus
                 



//                     type="password"
//                     id="token"
//                     value={token}
//                     onChange={(e) => setToken(e.target.value)}
                 
                  
//                   />

            
//                 </div>

//                 <div className="col-xl-12">
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="New Password"
                 
                  
//                     size="small"
//                     autoFocus
                  

//                     type="password"
//                     id="newPassword"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
                  





                  
//                   />

            
//                 </div>

             
               
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                  Reset Password
//                 </Button>

//                 <p>  {message && <p className="message">{message}</p>}</p>

//                 <Grid container>
                 
//                   <Grid item className="ms-5">
//                     {/* <span>Not signed up? <Link to="/sign_up">Signup</Link></span> */}
//                     <Link
//                       to="/"
//                       variant="body2"
//                       className="text-decoration-none"
//                     >
//                       {"Already signed up?"}
//                     </Link>

//                     {/* Already signed up? <Link to="/">Login</Link> */}
//                   </Grid>
//                 </Grid>
//               </Box>
//             </div>
//           </Box>
//           {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
//         </Container>
//       </ThemeProvider>
      
//       {/* <div>
//       <div className="reset-password-container">
//         <h2 className="reset-password-title">Reset Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="token">Reset Token:</label>
//             <input
//               type="password"
//               id="token"
//               value={token}
//               onChange={(e) => setToken(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="newPassword">New Password:</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <button type="submit">Reset Password</button>
//           </div>
//         </form>
//         {message && <p className="message">{message}</p>}
//       </div>
//       </div> */}


//     </div>
//   )
// }






import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Logo from "../../assets/img/akash_bangels_logo.png";

import { Box, Dialog, Autocomplete } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import api from "../../services/api";
const defaultTheme = createTheme();

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSuccess(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset successfully!");
        setIsSuccess(true);
        navigate("/");
      } else {
        setMessage(result.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error resetting password.");
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
            }}
            className="p-4 "
          >
            <div className="mb-3">
              <img
                src={Logo}
                alt=""
                className="img-fluid"
                style={{ width: "150px" }}
              />
            </div>
            <Typography component="h1" variant="h5">
              <span className="fw-bold">Reset Password</span>
            </Typography>

            <div className="row">
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <ToastContainer />
                <div className="col-xl-12">
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    size="small"
                    autoFocus
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-xl-12">
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Enter OTP"
                    size="small"
                    autoFocus
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <div className="col-xl-12">
                  <TextField
                    margin="normal"
                    fullWidth
                    label="New Password"
                    size="small"
                    autoFocus
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>

                <p> {message && <p className="message">{message}</p>}</p>

                <Grid container>
                  <Grid item className="ms-5">
                    <Link
                      to="/"
                      variant="body2"
                      className="text-decoration-none"
                    >
                      {"Already signed up?"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}