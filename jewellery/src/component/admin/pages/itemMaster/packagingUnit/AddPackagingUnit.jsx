// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";
// // import Link from "@mui/material/Link";

// import { Link } from "react-router-dom";
// import MenuItem from "@mui/material/MenuItem";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";



// import Backdrop from "@mui/material/Backdrop";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { useNavigate } from "react-router-dom";

// import { useState,useEffect } from "react";
// import axios from "axios";
// import Header from "../../../../schema/Header";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import swal from 'sweetalert';

// // import { Box, TextField, Button, Typography } from '@mui/material';

// // const navigate = useNavigate();

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };


// const breadcrumbs = [
//   <Link underline="hover" key="1" color="inherit" to="/add_unit" className="text-decoration-none">
//    Unit
//   </Link>,
  
//   <Typography key="3" color="text.primary">
//     Packeging Unit
//   </Typography>,
// ];

// export default function AddPackagingUnit() {


//     const [packagingUnits, setPackagingUnits] = useState([]);
//     const [formData, setFormData] = useState({ name: '', description: '' });
//     const [editingUnit, setEditingUnit] = useState(null);
//     const [viewingUnit, setViewingUnit] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [open, setOpen] = useState(false);
//     const [viewOpen, setViewOpen] = useState(false);
  
//     const fetchPackagingUnits = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/packaging-units');
//         setPackagingUnits(response.data);
//       } catch (error) {
//         console.error('Error fetching packaging units:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchPackagingUnits();
//     }, []);
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSearchChange = (e) => {
//       const value = e.target.value.toLowerCase();
//       setSearchTerm(value);
//       const filteredUnits = packagingUnits.filter(unit => unit.name.toLowerCase().includes(value));
//       setPackagingUnits(filteredUnits);
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         if (editingUnit) {
//           await axios.put(`http://localhost:5000/api/packaging-units/${editingUnit._id}`, formData);
//         } else {
//           await axios.post('http://localhost:5000/api/packaging-units', formData);
//         }
//         setFormData({ name: '', description: '' });
//         setEditingUnit(null);
//         fetchPackagingUnits();
//         handleClose();
//       } catch (error) {
//         console.error('Error saving packaging unit:', error);
//       }
//     };
  
//     const handleEdit = (unit) => {
//       setFormData({ name: unit.name, description: unit.description });
//       setEditingUnit(unit);
//       handleOpen();
//     };


    
  
//     const handleView = (unit) => {
//       setViewingUnit(unit);
//       setViewOpen(true);
//     };
  
//     // const handleDelete = async (id) => {
//     //   try {
//     //     console.log(`Attempting to delete packaging unit with ID: ${id}`); // Log the ID before making the request
//     //     const response = await axios.delete(`http://localhost:5000/api/packaging-units/${id}`);
//     //     console.log('Delete response:', response); // Log the response
//     //     setPackagingUnits(packagingUnits.filter(unit => unit._id !== id)); // Update state to remove deleted unit
//     //   } catch (error) {
//     //     console.error('Error deleting packaging unit:', error); // Log the error details
//     //   }
//     // };

    
//     const handleDelete = async (id) => {
//       swal({
//         title: "Are you sure?",
//         text: "Once deleted, you will not be able to recover this data!",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       })
//       .then(async (willDelete) => {
//         if (willDelete) {
//           try {
//             console.log(`Attempting to delete packaging unit with ID: ${id}`); // Log the ID before making the request
//             const response = await axios.delete(`http://localhost:5000/api/packaging-units/${id}`);
//             console.log('Delete response:', response); // Log the response
//             setPackagingUnits(packagingUnits.filter(unit => unit._id !== id)); // Update state to remove deleted unit
//             swal("Poof! Your data has been deleted!", {
//               icon: "success",
//             });
//           } catch (error) {
//             console.error('Error deleting packaging unit:', error); // Log the error details
//             swal("Error deleting data!", {
//               icon: "error",
//             });
//           }
//         } else {
//           swal("Your data is safe!");
//         }
//       });
//     };
    






//     const handleOpen = () => setOpen(true);
//     const handleClose = () => {
//       setOpen(false);
//       setEditingUnit(null);
//     };
  
//     const handleViewClose = () => setViewOpen(false);



//   return (
//     <div>

// <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-6">
//                           <h4 className="fw-bold">Packaging Unit</h4>
//                         </div>
//                         <div className="col-xl-6 d-flex justify-content-end">
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleOpen}
//                           >
//                             Add Packaging Unit
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Stack spacing={2}>
//                         <Breadcrumbs
//                           separator={<NavigateNextIcon fontSize="small" />}
//                           aria-label="breadcrumb"
//                         >
//                           {breadcrumbs}
//                         </Breadcrumbs>
//                       </Stack>
//                     </div>
//                   </div>

//                   <div className="row mt-4">
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
//                             <TableCell align="right" className="fw-bold">#</TableCell>
//                               <TableCell align="right" className="fw-bold">Packaging Unit</TableCell>
//                               <TableCell align="right" className="fw-bold">Description</TableCell>
//                               <TableCell align="right" className="fw-bold">Action</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                           {packagingUnits.map((unit, index) => (

//                               <TableRow key={unit._id}>
//                                  <TableCell align="right">
//                                 {index+1}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                 {unit.name}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                 {unit.description}
//                                 </TableCell>

//                                 <TableCell align="right">
                                
//                                 <Button
//                                     variant="contained"
//                                     color="warning"
//                                     style={{ marginRight: "10px" }}
//                                     size="small"
//                                     // onClick={() => handleUpdateOpen(group)}
//                                     onClick={() => handleView(unit)}
//                                   >
//                                    <RemoveRedEyeIcon />
//                                   </Button>
//                                   <Button
//                                     variant="contained"
//                                     color="success"
//                                     style={{ marginRight: "10px" }}
//                                     size="small"
//                                     // onClick={() => handleUpdateOpen(group)}
//                                     onClick={() => handleEdit(unit)}
//                                   >
//                                    <EditRoundedIcon />
//                                   </Button>
//                                   <Button
//                                     variant="contained"
//                                     color="error"
//                                     size="small"
//                                     onClick={() => handleDelete(unit._id)}
//                                   >
//                                      <DeleteIcon />
//                                   </Button>
//                                 </TableCell>
//                               </TableRow>
//                        ))}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>

//                       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Packaging Unit Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               {editingUnit ? 'Update' : 'Add'}
//             </Button>
//           </form>
//         </Box>
//       </Modal>

//       <Modal open={viewOpen} onClose={handleViewClose}>
//         <Box sx={style}>
//           <h2>View Packaging Unit</h2>
//           {viewingUnit && (
//             <div>
//               <p><strong>Name:</strong> {viewingUnit.name}</p>
//               <p><strong>Description:</strong> {viewingUnit.description}</p>
//             </div>
//           )}
//         </Box>
//       </Modal>
                    
//                     </div>
//                   </div>

                  
//                 </div>
//               </Box>
//             </Box>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   )
// }


import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
// import swal from 'sweetalert';
import axios from "axios";
import Header from "../../../../schema/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Packeging.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/add_unit" className="text-decoration-none">
   Unit
  </Link>,
  <Typography key="3" color="text.primary">
    Packeging Unit
  </Typography>,
];

export default function AddPackagingUnit() {
  const [packagingUnits, setPackagingUnits] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingUnit, setEditingUnit] = useState(null);
  const [viewingUnit, setViewingUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const fetchPackagingUnits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packaging-units');
      setPackagingUnits(response.data);
    } catch (error) {
      console.error('Error fetching packaging units:', error);
    }
  };

  useEffect(() => {
    fetchPackagingUnits();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredUnits = packagingUnits.filter(unit => unit.name.toLowerCase().includes(value));
    setPackagingUnits(filteredUnits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUnit) {
        await axios.put(`http://localhost:5000/api/packaging-units/${editingUnit._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/packaging-units', formData);
      }
      setFormData({ name: '', description: '' });
      setEditingUnit(null);
      fetchPackagingUnits();
      handleCloseEditModal();
      handleCloseAddModal();
    } catch (error) {
      console.error('Error saving packaging unit:', error);
    }
  };

  const handleEdit = (unit) => {
    setFormData({ name: unit.name, description: unit.description });
    setEditingUnit(unit);
    handleOpenEditModal();
  };

  const handleView = (unit) => {
    setViewingUnit(unit);
    setViewOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'swal-wide'
      }
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/packaging-units/${id}`);
          setPackagingUnits(packagingUnits.filter(unit => unit._id !== id));
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting packaging unit:', error);
          Swal("Error deleting data!", { icon: "error" });
        }
      } else {
        Swal("Your data is safe!");
      }
    });
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleViewClose = () => setViewOpen(false);



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
                          <h4 className="fw-bold">Packaging Unit</h4>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenAddModal}
                            className="fw-bold"
                            size="small"
                          >
                            Add Packaging Unit
                          </Button>
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

                  <div className="row mt-4">
                    <div className="col-xl-12">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="a dense table"
                          className="bordered"
                        >
                          <TableHead>
                            <TableRow style={{ background: "#bbdefb" }}>
                              <TableCell align="right" className="fw-bold">#</TableCell>
                              <TableCell align="right" className="fw-bold">Packaging Unit</TableCell>
                              <TableCell align="right" className="fw-bold">Description</TableCell>
                              <TableCell align="right" className="fw-bold">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {packagingUnits.map((unit, index) => (
                              <TableRow key={unit._id}>
                                <TableCell align="right">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">
                                  {unit.name}
                                </TableCell>
                                <TableCell align="right" >
                                  <span>
                                  {unit.description}
                                  </span>
                               
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    style={{ marginRight: "10px" }}
                                    size="small"
                                    onClick={() => handleView(unit)}
                                  >
                                    <RemoveRedEyeIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    style={{ marginRight: "10px" }}
                                    size="small"
                                    onClick={() => handleEdit(unit)}
                                  >
                                    <EditRoundedIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(unit._id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Modal open={openAddModal} onClose={handleCloseAddModal}>
                        <Box sx={style}>
                          <form onSubmit={handleSubmit}>
                            <TextField
                              label="Packaging Unit Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              fullWidth
                              margin="normal"
                            />
                            <TextField
                              label="Description"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              fullWidth
                              margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary">
                              Add
                            </Button>
                          </form>
                        </Box>
                      </Modal>

                      <Modal open={openEditModal} onClose={handleCloseEditModal}>
                        <Box sx={style}>
                          <form onSubmit={handleSubmit}>
                            <TextField
                              label="Packaging Unit Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              fullWidth
                              margin="normal"
                            />
                            <TextField
                              label="Description"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              fullWidth
                              margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary">
                              Update
                            </Button>
                          </form>
                        </Box>
                      </Modal>

                      <Modal open={viewOpen} onClose={handleViewClose}>
                        <Box sx={style}>
                          <h2>View Packaging Unit</h2>
                          {viewingUnit && (
                            <div>
                              <p><strong>Name:</strong> {viewingUnit.name}</p>
                              <p><strong>Description:</strong> {viewingUnit.description}</p>
                            </div>
                          )}
                        </Box>
                      </Modal>

                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}
