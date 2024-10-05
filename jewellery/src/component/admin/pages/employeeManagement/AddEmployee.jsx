

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Header from "../../../schema/Header";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { FormControl } from "@mui/material";
import {
 
  Autocomplete,
} from "@mui/material";




const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/employee_list" className="text-decoration-none">
   Back
  </Link>,

  <Typography key="4" color="text.primary">
    Employee List
  </Typography>,
];


export default function AddEmployee({ employee }) {


  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    dateOfHire: "",
    salary: "",
    image: null,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        position: employee.position || "",
        department: employee.department || "",
        dateOfHire: employee.dateOfHire
          ? employee.dateOfHire.substring(0, 10)
          : "",
        salary: employee.salary || "",
        image: null, // Optional: reset image upload field
      });
    }
  }, [employee]);


  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const response = await axios.get('http://localhost:5000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        form.append(key, formData[key]);
      }
    });

    try {
      if (employee) {
        await axios.put(
          `http://localhost:5000/api/employees/${employee._id}`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/employees", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Employee added successfully!");
      }

      // Reset form or do other actions if needed
      setFormData({
        name: "",
        email: "",
        position: "",
        department: "",
        dateOfHire: "",
        salary: "",
        image: null,
      });
    } catch (error) {
      console.error("Error saving employee:", error);
      if (error.response) {
        toast.error(
          "Error saving employee: " + error.response.data.message ||
            "Unknown error"
        );
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <div>
    

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                          <h4 className="fw-bold"> Add Employee</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <Stack spacing={2}>
                        <Breadcrumbs
                          separator={<NavigateNextIcon fontSize="small" />}
                          aria-label="breadcrumb"
                        >
                          {breadcrumbs}
                        </Breadcrumbs>
                      </Stack>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        sx={{ p: 4 }}
                      >
                        <div className="row">
                          <div
                            className="col-xl-12 mx-auto p-4"
                            style={{
                              border: "1px solid gray",
                              borderRadius: "8px",
                            }}
                          >
                            <div className="row">
                              <div className="row mt-2 mb-0">
                                <div className="col-xl-12">
                                  <h5
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155" }}
                                  >
                                     Name
                                  </h5>
                                </div>
                              </div>
                              <ToastContainer />
                              <div className="col-xl-3">
                                <TextField
                                  label="Name"
                               
                               
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                
                                  required


                                  type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        



                                />
                              </div>
                              <div className="col-xl-3">
                                <TextField
                                  label="Email"
                                 
                               
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                
                               


                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                 
                                  required
                                />
                              </div>

                              <div className="col-xl-3">
                                <TextField
                                  label="Position"
                                
                               
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                
                                  type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
    
          required
                                />
                              </div>

                              <div className="col-xl-3">
                                {/* <TextField
                                  label="Department"
                                
                               
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                
                                

                                  type="text"
                                  name="department"
                                  value={formData.department}
                                  onChange={handleChange}
                              
                                  required


                                /> */}


<select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {loadingDepartments ? (
            <option>Loading...</option>
          ) : (
            departments.map((dept) => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))
          )}
        </select>




                              </div>

                              <div className="col-xl-3">
                                <TextField
                                  // label="Date of Hiring"
                                
                               
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                
                                  type="date"
                                  name="dateOfHire"
                                  value={formData.dateOfHire}
                                  onChange={handleChange}
                                  required
                                />
                              </div>

                           

                              <div className="col-xl-3">
                                <TextField
                                  label="Salary"
                                
                               
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                  type="number"
                                  name="salary"
                                  value={formData.salary}
                                  onChange={handleChange}
                                  required
                                />
                              </div>

                         
                              <div className="col-xl-3">
                                <Button
                                  className="mt-3"
                                  component="label"
                                
                                  variant="contained"
                                  tabIndex={-1}
                                  startIcon={<CloudUploadIcon />}
                                >
                                  Add Image
                                  <VisuallyHiddenInput
                                
                                    fullWidth
                                    margin="normal"
                                    multiple
                                 
                                    size="small"
                                    required

                                    type="file" name="image" onChange={handleFileChange}
                                  />
                                </Button>
                              </div>
                          



                             
                           

                            
                            

                           

                              <div className="col-xl-4 d-flex justify-content-center mx-auto">
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="success"
                                  fullWidth
                                  sx={{ mt: 2 }}
                                  className="p-3 fw-bold"
                                >
                                  Add Employee
                                </Button>
                              </div>


                            </div>
                          </div>
                        </div>
                      </Box>
                    </div>

                     {/* <div className="col-xl-12">
                     <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ToastContainer />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          type="date"
          name="dateOfHire"
          value={formData.dateOfHire}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Save</button>
                    </form>
                     </div> */}


                  </div>
                </div>

   
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
