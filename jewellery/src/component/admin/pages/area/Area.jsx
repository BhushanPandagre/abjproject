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

// import Header from "../../../schema/Header";
// import api from "../../../../services/api";

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






// function Area() {

//     const [areas, setAreas] = useState([]);
//     const [name, setName] = useState('');
//     const [editing, setEditing] = useState(null);
  
//     // Fetch areas on component mount
//     useEffect(() => {
//       async function fetchAreas() {
//         try {
//           const response = await api.get('/api/areas');
//           setAreas(response.data);
//         } catch (error) {
//           console.error('Error fetching areas:', error);
//         }
//       }
//       fetchAreas();
//     }, []);
  
//     // Add a new area
//     const addArea = async () => {
//       try {
//         const response = await api.post('/api/areas', { name });
//         setAreas([...areas, response.data]);
//         setName('');
//       } catch (error) {
//         console.error('Error adding area:', error);
//       }
//     };
  
//     // Start editing an existing area
//     const startEditing = (area) => {
//       setEditing(area);
//       setName(area.name);
//     };
  
//     // Update an existing area
//     const updateArea = async () => {
//       try {
//         const response = await api.put(`/api/areas/${editing._id}`, { name });
//         setAreas(areas.map(area => (area._id === editing._id ? response.data : area)));
//         setEditing(null);
//         setName('');
//       } catch (error) {
//         console.error('Error updating area:', error);
//       }
//     };
  
//     // Delete an area
//     const deleteArea = async (id) => {
//       try {
//         await api.delete(`/api/areas/${id}`);
//         setAreas(areas.filter(area => area._id !== id));
//       } catch (error) {
//         console.error('Error deleting area:', error);
//       }
//     };
 
//   return (
//     <div>
     









// <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1}}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-4">
//                            <Button
//                             variant="contained"
//                             color="primary"
//                             // onClick={handleOpen}
//                             className="fw-bold"
//                             size="small"
//                           >
//                             Add Area
//                           </Button>
//                         </div>
//                         <div className="col-xl-8 d-flex justify-content-end">
//                           <Grid
//                         container
//                         spacing={2}
//                         alignItems="center"
//                         className="d-flex justify-content-end mb-2"
//                       >
//                         <Grid item xs={12} md={6} lg={4} xl={3}>
//                           <TextField
//                             size="small"
//                             fullWidth
//                             id="search"
//                             label="Search by Name"
//                             variant="outlined"
//                             // value={searchTerm}
//                             // onChange={handleSearchChange}
//                             // InputProps={{
//                             //   startAdornment: (
//                             //     <InputAdornment position="start">
//                             //       <IconButton>
//                             //         <SearchIcon />
//                             //       </IconButton>
//                             //     </InputAdornment>
//                             //   ),
//                             // }}
//                           />
//                           {/* {showNoResultsMessage && (
//                             <Typography
//                               variant="body2"
//                               color="textSecondary"
//                               style={{ marginTop: "8px" }}
//                             >
//                               No results found.
//                             </Typography>
//                           )} */}
//                         </Grid>
//                       </Grid>
//                         </div>
//                       </div>
//                     </div>

                  
//                   </div>
//                   <div className="row mt-1">
                   
//                    <div className="col-xl-12">
//                         <h1>Area Management System</h1>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter area name"
//       />
//       {editing ? (
//         <>
//           <button onClick={updateArea}>Update Area</button>
//           <button onClick={() => setEditing(null)}>Cancel</button>
//         </>
//       ) : (
//         <button onClick={addArea}>Add Area</button>
//       )}
//       <ul>
//         {areas.map((area) => (
//           <li key={area._id}>
//             {area.name}
//             <button onClick={() => startEditing(area)}>Edit</button>
//             <button onClick={() => deleteArea(area._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//                    </div>

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
//                                 Area Name
//                               </TableCell>
//                               <TableCell align="center" className="fw-bold">
//                                 Action
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>

                         



//                              {areas.length === 0 ? (
//                               <TableRow>
//                                 <TableCell
//                                   colSpan={3}
//                                   align="center"
//                                   className="text-secondary"
//                                 >
//                                   No groups available.
//                                 </TableCell>
//                               </TableRow>
//                             ) : (
//                                 areas.map(( area,index ) => (
//                                 <TableRow key={area._id}>
//                                   <TableCell align="right">
//                                     <span>{index + 1}</span>
//                                   </TableCell>
//                                   <TableCell align="right">
//                                   {area.name}
//                                   </TableCell>
//                                   <TableCell align="center">
//                                     <Button
//                                       variant="contained"
//                                       color="warning"
                                    
//                                       style={{ marginRight: "10px",background:'#ffe0b2' }}
//                                       size="small"
//                                       onClick={() => handleViewOpen(group)}
//                                     >
//                                       <RemoveRedEyeIcon  style={{ color: "#ff9100" }} />
//                                     </Button>
//                                     <Button
//                                       variant="contained"
//                                       color="success"
//                                       style={{ marginRight: "10px", background: "#a5d6a7", }}
//                                       size="small"
//                                       onClick={() => startEditing(area)}
                                      
//                                     >
//                                       <EditRoundedIcon className="text-success" />
//                                     </Button>
//                                     <Button
//                                       variant="contained"
//                                       color="error"
//                                       size="small"
//                                       onClick={() => deleteArea(area._id)}
//                                        style={{ background: "#ffab91" }}
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

// export default Area;









import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import { Select, FormControl, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import Header from "../../../schema/Header";
import api from "../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function Area() {
  const [areas, setAreas] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await api.get('/api/areas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    }
    fetchAreas();
  }, []);

  const addArea = async () => {
    try {
      const response = await api.post('/api/areas', { name });
      setAreas([...areas, response.data]);
      setName('');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding area:', error);
    }
  };

  const startEditing = (area) => {
    setEditing(area);
    setName(area.name);
    setDialogOpen(true);
  };

  const updateArea = async () => {
    try {
      const response = await api.put(`/api/areas/${editing._id}`, { name });
      setAreas(areas.map(area => (area._id === editing._id ? response.data : area)));
      setEditing(null);
      setName('');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating area:', error);
    }
  };

  const deleteArea = async (id) => {
    try {
      await api.delete(`/api/areas/${id}`);
      setAreas(areas.filter(area => area._id !== id));
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditing(null);
    setName('');
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
                            Add Area
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
                  <div className="row mt-1">
                    {/* <div className="col-xl-12">
                      <h1>Area Management System</h1>
                      <ul>
                        {areas.map((area) => (
                          <li key={area._id}>
                            {area.name}
                            <button onClick={() => startEditing(area)}>Edit</button>
                            <button onClick={() => deleteArea(area._id)}>Delete</button>
                          </li>
                        ))}
                      </ul>
                    </div> */}
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
                              <TableCell align="right" className="fw-bold">
                                #
                              </TableCell>
                              <TableCell align="right" className="fw-bold">
                                Area Name
                              </TableCell>
                              <TableCell align="center" className="fw-bold">
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {areas.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={3} align="center" className="text-secondary">
                                  No areas available.
                                </TableCell>
                              </TableRow>
                            ) : (
                              areas.map((area, index) => (
                                <TableRow key={area._id}>
                                  <TableCell align="right">
                                    <span>{index + 1}</span>
                                  </TableCell>
                                  <TableCell align="right">{area.name}</TableCell>
                                  <TableCell align="center">
                                    <Button
                                      variant="contained"
                                      color="success"
                                      style={{ marginRight: "10px", background: "#a5d6a7" }}
                                      size="small"
                                      onClick={() => startEditing(area)}
                                    >
                                      <EditRoundedIcon className="text-success" />
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() => deleteArea(area._id)}
                                      style={{ background: "#ffab91" }}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>

      {/* Dialog for adding/updating an area */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editing ? "Edit Area" : "Add Area"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Area Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button   variant="contained"
                                      color="error"
                                      size="small" onClick={handleDialogClose}>Cancel</Button>
          <Button   variant="contained"
                                      color="success"
                                      size="small" onClick={editing ? updateArea : addArea}>
            {editing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Area;
