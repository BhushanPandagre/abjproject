import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

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
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";

import { Modal, Grid, IconButton } from "@mui/material";

import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../../../schema/Header";
import FormControl from "@mui/material/FormControl";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  // <Link underline="hover" key="1" color="inherit" to="/item_master">
  //   Item master
  // </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    to="/user_category"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    User Category
  </Link>,
  <Typography key="3" color="text.secondary" style={{ fontSize: "15px" }}>
    Designation
  </Typography>,
];

export default function Designation() {
  const [customRoles, setCustomRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState({});
  const [updatedRoleName, setUpdatedRoleName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [customRoleName, setCustomRoleName] = useState("");
  const [customPermissions, setCustomPermissions] = useState([]);
  const [openCustomRoleModal, setOpenCustomRoleModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchCustomRoles(); // Fetch custom roles on component mount
    fetchUsers();
  }, []);

  const fetchCustomRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customRoles");
      const uniqueRoles = getUniqueRoles([
        ...predefinedRoles,
        ...response.data,
      ]);
      setCustomRoles(uniqueRoles);
    } catch (error) {
      console.error("Error fetching custom roles:", error);
      toast.error("Failed to fetch custom roles.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  const getUniqueRoles = (roles) => {
    const seen = new Set();
    return roles.filter((role) => {
      const normalizedRoleName = role.name.toLowerCase();
      const isDuplicate = seen.has(normalizedRoleName);
      seen.add(normalizedRoleName);
      return !isDuplicate;
    });
  };

  const handleOpenModal = (role) => {
    setSelectedRole(role);
    setUpdatedRoleName(role.name); // Initialize updatedRoleName with current role name
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateRole = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/customRoles/${selectedRole._id}`,
        { name: updatedRoleName }
      );
      fetchCustomRoles();
      setOpenModal(false);
      toast.success("Designation updated successfully.");
    } catch (error) {
      console.error("Error updating custom role:", error);
      toast.error("Failed to update designation.");
    }
  };

  const handleDeleteRole = async (roleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/customRoles/${roleId}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchCustomRoles();
        } catch (error) {
          console.error(
            "Error deleting user:",
            error.response ? error.response.data.message : error.message
          );
          Swal.fire(
            "Error!",
            error.response ? error.response.data.message : error.message,
            "error"
          );
        }
      }
    });
  };

  const predefinedRoles = [
    { id: "user", name: "User" },
    { id: "admin", name: "Admin" },
    { id: "sub-admin", name: "Sub-Admin" },
    { id: "cashier", name: "Cashier" },
  ];

  const getRoleName = (roleId) => {
    switch (roleId) {
      case "user":
        return "User";
      case "admin":
        return "Admin";
      case "sub-admin":
        return "Sub-Admin";
      case "cashier":
        return "Cashier";
      default:
        const customRole = customRoles.find((role) => role._id === roleId);
        return customRole ? customRole.name : "Unknown Role";
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleAddCustomRole = async (e) => {
  //   e.preventDefault();

  //   // Prevent adding admin as a custom role
  //   if (customRoleName.toLowerCase() === 'admin') {
  //     toast.error("Cannot create a custom role with name 'admin'.");
  //     return;
  //   }

  //   try {
  //     await axios.post("http://localhost:5000/api/customRoles", {
  //       name: customRoleName,
  //       permissions: customPermissions,
  //     });
  //     toast.success("Designation added successfully");
  //     setCustomRoleName("");
  //     setCustomPermissions([]);
  //     // Optionally close modal or perform other actions after successful addition
  //   } catch (error) {
  //     console.error("Error adding custom role:", error);
  //     toast.error("Error adding custom role. Please try again.");
  //   }
  // };

  const handleAddCustomRole = async (e) => {
    e.preventDefault();
    const normalizedRoleName = customRoleName.toLowerCase();

    // Check if the role name already exists (case-insensitive)
    const roleExists = uniqueRoles.some(
      (role) => role.name.toLowerCase() === normalizedRoleName
    );

    if (normalizedRoleName === "admin") {
      toast.error("Cannot create a custom role with name 'admin'.");
      return;
    }
    if (roleExists) {
      toast.error("Role name already exists.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/customRoles", {
        name: customRoleName,
        permissions: customPermissions,
      });
      toast.success("Designation added successfully");
      setCustomRoleName("");
      setCustomPermissions([]);
      fetchCustomRoles(); // Refresh the roles after adding
    } catch (error) {
      console.error("Error adding custom role:", error);
      toast.error("Error adding custom role. Please try again.");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customRoles.slice(indexOfFirstItem, indexOfLastItem);

  // Combine predefined roles with custom roles and remove duplicates
  const allRoles = [...predefinedRoles, ...customRoles];
  const uniqueRoles = getUniqueRoles(allRoles);

  // Initialize serial number counter
  let serialNumber = 0;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => setOpenCustomRoleModal(true)}
                            className="fw-bold ms-2 "
                            size="small"
                          >
                            Add Designation
                          </Button>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                          <TextField
                            size="small"
                            fullWidth
                            id="search"
                            label="Search by username or email"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton>
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        </div>
                        <ToastContainer />

                        <Modal
                          open={openCustomRoleModal}
                          onClose={() => setOpenCustomRoleModal(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              className="fw-bold"
                              style={{ color: "rgb(1, 87, 155)" }}
                            >
                              Add Designation
                            </Typography>
                            <form
                              onSubmit={handleAddCustomRole}
                              className="form"
                            >
                              <div className="form-group">
                                <TextField
                                  label="Designation Name"
                                  value={customRoleName}
                                  onChange={(e) =>
                                    setCustomRoleName(e.target.value)
                                  }
                                  required
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                />
                              </div>
                              <div className="form-group">
                                <h5
                                  className="mt-2 fw-bold"
                                  style={{ color: "gray" }}
                                >
                                  Custom Permissions
                                </h5>
                              

                                <FormControl
                                  fullWidth
                                  margin="normal"
                                  sx={{ mt: 1 }}
                                >
                                  {["create", "read", "update", "delete"].map(
                                    (permission) => (
                                      <FormControlLabel
                                        key={permission}
                                        control={
                                          <Checkbox
                                            checked={customPermissions.includes(
                                              permission
                                            )}
                                            onChange={(e) =>
                                              setCustomPermissions((prev) =>
                                                e.target.checked
                                                  ? [...prev, permission]
                                                  : prev.filter(
                                                      (p) => p !== permission
                                                    )
                                              )
                                            }
                                            value={permission}
                                            color="success"
                                          />
                                        }
                                        label={permission.toUpperCase()}
                                      />
                                    )
                                  )}
                                </FormControl>
                              </div>

                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="contained"
                                  color="error"
                                  className="mt-2 me-2"
                                  // onClick={() => setOpenUserModal(false)}
                                  onClick={() => setOpenCustomRoleModal(false)}
                                  size="small"
                                >
                                  Cancel
                                </Button>

                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  className="mt-2 d-flex justify-content-end mx-start "
                                  size="small"
                                >
                                  Add Designation
                                </Button>
                              </div>
                            </form>
                          </Box>
                        </Modal>
                      </div>

                      <div className="row">
                        <div className="col-xl-12 d-xl-none">
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
                              <TableCell align="left" className="fw-bold">
                                #
                              </TableCell>
                              <TableCell align="center" className="fw-bold">
                                Designation Name
                              </TableCell>
                              <TableCell align="center" className="fw-bold">
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {uniqueRoles.map((role) => (
                              <TableRow key={role.id}>
                                <TableCell>{++serialNumber}</TableCell>
                                <TableCell align="center">
                                  {role.name}
                                </TableCell>
                                <TableCell align="center">
                                  {role.id === "admin" ||
                                  role.id === "user" ||
                                  role.id === "sub-admin" ||
                                  role.id === "cashier" ? (
                                    <Button
                                      size="small"
                                      variant="contained"
                                      color="secondary"
                                      disabled
                                      style={{
                                        background: "#90caf9",
                                        color: "#0d47a1",
                                        fontWeight: "bold",
                                        opacity: "0.8",
                                      }}
                                    >
                                      {"predefined"}
                                    </Button>
                                  ) : (
                                    <>
                                      <IconButton
                                        color="success"
                                        variant="contained"
                                        onClick={() => handleOpenModal(role)}
                                        style={{ background: "#a5d6a7" }}
                                        className="me-2"
                                        size="small"
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        color="error"
                                        variant="contained"
                                        onClick={() =>
                                          handleDeleteRole(role._id)
                                        }
                                        style={{ background: "#ffab91" }}
                                         size="small"
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Modal for Update Role */}

                      <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="update-role-modal"
                        aria-describedby="modal-to-update-custom-role"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            Update Designation
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                label="Designation Name"
                                fullWidth
                                value={updatedRoleName}
                                onChange={(e) =>
                                  setUpdatedRoleName(e.target.value)
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              className="d-flex justify-content-end"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdateRole}
                                className="me-2"
                              >
                                Update
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Modal>
                    </div>
                  </div>

                  <div className="col-xl-12  mt-3 d-flex justify-content-end">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(customRoles.length / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                      />
                    </Stack>
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
