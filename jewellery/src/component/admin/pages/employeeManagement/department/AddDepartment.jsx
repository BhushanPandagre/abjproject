// import api from "../../../../../services/api";

// // import "./AddDepartment.css"; // Import external CSS file

// const API_URL = "http://localhost:5000/departments"; // Adjust URL as needed

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import { Link } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import SearchIcon from "@mui/icons-material/Search";
// import { Select, FormControl, InputLabel } from "@mui/material";
// import Button from "@mui/material/Button";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { InputAdornment, IconButton } from "@mui/material";
// import Header from "../../../../schema/Header";
// // import api from "../../../../services/api";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function AddDepartment({ onSave }) {
//   // ... (rest of your component code)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [departments, setDepartments] = useState([]);
//   const [departmentToEdit, setDepartmentToEdit] = useState(null);
//   const [refresh, setRefresh] = useState(true);
//   const [editForm, setEditForm] = useState({ name: "", description: "" });

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await api.get(API_URL);
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments", error);
//       }
//     };

//     fetchDepartments();
//   }, [refresh]);

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`${API_URL}/${id}`);
//       setDepartments(departments.filter((department) => department._id !== id));
//     } catch (error) {
//       console.error("Error deleting department", error);
//     }
//   };

//   const handleEdit = (department) => {
//     setDepartmentToEdit(department);
//     setEditForm({ name: department.name, description: department.description });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       await api.put(`${API_URL}/${departmentToEdit._id}`, editForm);
//       setDepartments(
//         departments.map((department) =>
//           department._id === departmentToEdit._id
//             ? { ...department, ...editForm }
//             : department
//         )
//       );
//       setEditForm({ name: "", description: "" });
//       setDepartmentToEdit(null);
//       setRefresh((prev) => !prev); // Refresh list after saving
//     } catch (error) {
//       console.error("Error saving department", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const data = { name, description };

//     try {
//       await axios.post(API_URL, data);

//       // Call the onSave callback to refresh the list

//       if (onSave) {
//         await onSave();
//       }

//       // Reset form
//       setName("");
//       setDescription("");
//     } catch (error) {
//       setError("Error saving department");
//       console.error("Error saving department", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-4">
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             // onClick={handleDialogOpen}
//                             className="fw-bold"
//                             size="small"
//                           >
//                             Add Department
//                           </Button>
//                         </div>
//                         <div className="col-xl-8 d-flex justify-content-end">
//                           <Grid
//                             container
//                             spacing={2}
//                             alignItems="center"
//                             className="d-flex justify-content-end mb-2"
//                           >
//                             <Grid item xs={12} md={6} lg={4} xl={3}>
//                               <TextField
//                                 size="small"
//                                 fullWidth
//                                 id="search"
//                                 label="Search by Name"
//                                 variant="outlined"
//                               />
//                             </Grid>
//                           </Grid>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row mt-1">
//                     <div className="col-xl-12">
//                       <form onSubmit={handleSubmit}>
//                         <h2>Add Department</h2>
//                         {error && <p style={{ color: "red" }}>{error}</p>}
//                         <div>
//                           <label>Name:</label>
//                           <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label>Description:</label>
//                           <input
//                             type="text"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                           />
//                         </div>
//                         <button type="submit" disabled={loading}>
//                           {loading ? "Saving..." : "Save"}
//                         </button>
//                       </form>

//                       <h1>Department Manager</h1>

//                       {departmentToEdit && (
//                         <div className="modal">
//                           <div className="modal-content">
//                             <h2>Edit Department</h2>
//                             <form
//                               onSubmit={(e) => {
//                                 e.preventDefault();
//                                 handleSave();
//                               }}
//                             >
//                               <div>
//                                 <label>
//                                   Name:
//                                   <input
//                                     type="text"
//                                     name="name"
//                                     value={editForm.name}
//                                     onChange={handleChange}
//                                     required
//                                   />
//                                 </label>
//                               </div>
//                               <div>
//                                 <label>
//                                   Description:
//                                   <textarea
//                                     name="description"
//                                     value={editForm.description}
//                                     onChange={handleChange}
//                                     required
//                                   />
//                                 </label>
//                               </div>
//                               <button type="submit">Save</button>
//                               <button
//                                 type="button"
//                                 onClick={() => setDepartmentToEdit(null)}
//                               >
//                                 Cancel
//                               </button>
//                             </form>
//                           </div>
//                         </div>
//                       )}

//                       <h2> Departments</h2>

//                       <ul>
//                         {departments.map((department) => (
//                           <li key={department._id}>
//                             {department.name} - {department.description}
//                             <button onClick={() => handleEdit(department)}>
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDelete(department._id)}
//                             >
//                               Delete
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div className="col-xl-12">
//                       <TableContainer component={Paper}>
//                         <Table
//                           sx={{ minWidth: 650 }}
//                           size="small"
//                           aria-label="a dense table"
//                           className="bordered"
//                         >
//                           <TableHead>
//                             <TableRow style={{ background: "#bbdefb" }}>
//                               <TableCell align="right" className="fw-bold">
//                                 #
//                               </TableCell>
//                               <TableCell align="right" className="fw-bold">
//                                 Department Name
//                               </TableCell>
//                               <TableCell align="right" className="fw-bold">
//                                 Description
//                               </TableCell>
//                               <TableCell align="center" className="fw-bold">
//                                 Action
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {departments.length === 0 ? (
//                               <TableRow>
//                                 <TableCell
//                                   colSpan={3}
//                                   align="center"
//                                   className="text-secondary"
//                                 >
//                                   No areas available.
//                                 </TableCell>
//                               </TableRow>
//                             ) : (
//                               departments.map((department, index) => (
//                                 <TableRow key={department._id}>
//                                   <TableCell align="right">
//                                     <span>{index + 1}</span>
//                                   </TableCell>
//                                   <TableCell align="right">
//                                     {department.name}
//                                   </TableCell>
//                                   <TableCell align="right">
//                                     {department.description}
//                                   </TableCell>
//                                   <TableCell align="center">
//                                     <Button
//                                       variant="contained"
//                                       color="success"
//                                       style={{
//                                         marginRight: "10px",
//                                         background: "#a5d6a7",
//                                       }}
//                                       size="small"
//                                       onClick={() => handleEdit(department)}
//                                     >
//                                       <EditRoundedIcon className="text-success" />
//                                     </Button>
//                                     <Button
//                                       variant="contained"
//                                       color="error"
//                                       size="small"
//                                       onClick={() =>
//                                         handleDelete(department._id)
//                                       }
//                                       style={{ background: "#ffab91" }}
//                                     >
//                                       <DeleteIcon className="text-danger" />
//                                     </Button>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     </div>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

import {
  Box,
  CssBaseline,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../../schema/Header";
import api from "../../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function AddDepartment({ onSave }) {
  const [departments, setDepartments] = useState([]);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });
  const [open, setOpen] = useState(false);

  const API_URL = "http://localhost:5000/departments";

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(API_URL);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDialogOpen = () => {
    setDepartmentToEdit(null);
    setEditForm({ name: "", description: "" });
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleEdit = (department) => {
    setDepartmentToEdit(department);
    setEditForm({ name: department.name, description: department.description });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (departmentToEdit) {
        await api.put(`${API_URL}/${departmentToEdit._id}`, editForm);
        setDepartments(
          departments.map((department) =>
            department._id === departmentToEdit._id
              ? { ...department, ...editForm }
              : department
          )
        );
      } else {
        const response = await api.post(API_URL, editForm);
        setDepartments([...departments, response.data]);
      }
      setEditForm({ name: "", description: "" });
      setDepartmentToEdit(null);
      setOpen(false);
    } catch (error) {
      console.error("Error saving department", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      setDepartments(departments.filter((department) => department._id !== id));
    } catch (error) {
      console.error("Error deleting department", error);
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
              <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-4">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDialogOpen}
                            className="fw-bold"
                            size="small"
                          >
                            Add Department
                          </Button>
                        </div>
                        <div className="col-xl-8 d-flex justify-content-end">
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            className="d-flex justify-content-end mb-2"
                          >
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                              <TextField
                                size="small"
                                fullWidth
                                id="search"
                                label="Search by Name"
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableHead>
                        <TableRow style={{ background: "#bbdefb" }}>
                          <TableCell align="right">#</TableCell>
                          <TableCell align="right">Department Name</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {departments.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              align="center"
                              className="text-secondary"
                            >
                              No departments available.
                            </TableCell>
                          </TableRow>
                        ) : (
                          departments.map((department, index) => (
                            <TableRow key={department._id}>
                              <TableCell align="right">{index + 1}</TableCell>
                              <TableCell align="right">
                                {department.name}
                              </TableCell>
                              <TableCell align="right">
                                {department.description}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() => handleEdit(department)}
                                  style={{ marginRight: "10px" }}
                                >
                                  <EditRoundedIcon />
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() => handleDelete(department._id)}
                                >
                                  <DeleteIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Dialog for Add/Edit */}
                  <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>
                      {departmentToEdit ? "Edit Department" : "Add Department"}
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        size="small"
                        value={editForm.name}
                        onChange={handleChange}
                        fullWidth
                        required
                      />

                      <Textarea
                        maxRows={4}
                        placeholder="Description.........."
                        style={{ width: "100%" }}
                        className="p-4 mt-3"
                        name="description"
                        value={editForm.description}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        size="small"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose} size="small" color="error" variant="contained">Cancel</Button>
                      <Button onClick={handleSave} size="small" color="success" variant="contained">
                        {departmentToEdit ? "Update" : "Save"}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
