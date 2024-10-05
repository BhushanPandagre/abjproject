import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Header from "../../../schema/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Badge from "react-bootstrap/Badge";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Pagination from "@mui/material/Pagination";
// import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #ffc107",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  // <Link underline="hover" key="1" color="inherit" to="/item_master">
  //   Item master
  // </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    to="/add_designation"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    Designation
  </Link>,
  <Typography key="3" color="text.secondary" style={{ fontSize: "15px" }}>
    User Category
  </Typography>,
];

export default function UserCategory() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to user
  const [permissions, setPermissions] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const [customRoleName, setCustomRoleName] = useState("");
  const [customPermissions, setCustomPermissions] = useState([]);
  const [customRoles, setCustomRoles] = useState([]);
  const [openCustomRoleModal, setOpenCustomRoleModal] = useState(false);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
    fetchCustomRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users. Please try again later.");
      setLoading(false);
    }
  };

  const fetchCustomRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customRoles");
      setCustomRoles(response.data);
    } catch (error) {
      console.error("Error fetching custom roles:", error);
      toast.error("Error fetching custom roles. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "admin") {
        console.log("admin already exist");
        toast.error("admin already exist");
      } else {
        await axios.post(`http://localhost:5000/api/auth/create-user`, {
          username,
          email,
          password,
          role,
          permissions,
        });
        toast.success("Account created successfully");
        setMessage("User created successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("user");
        setPermissions([]);
        fetchUsers(); // Fetch users again after creating a new one
      }
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response ? error.response.data.message : error.message
      );
      setMessage(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setPermissions(user.permissions);
    setOpenUserModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/auth/update-user/${editingUser._id}`,
        {
          username,
          email,
          role,
          permissions,
        }
      );
      toast.success("User updated successfully");
      fetchUsers();
      handleCloseUserModal();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again.");
    }
  };

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

  const predefinedRoles = [
    { id: "user", name: "User" },
    { id: "admin", name: "Admin" },
    { id: "sub-admin", name: "Sub-Admin" },
    { id: "cashier", name: "Cashier" },
  ];

  const handleDeleteUser = async (userId) => {
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
          await axios.delete(
            `http://localhost:5000/api/auth/delete-user/${userId}`
          );
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers();
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

  const getRoleName = (roleId) => {
    if (roleId === "user") {
      return "User";
    } else if (roleId === "admin") {
      return "Admin";
    } else if (roleId === "sub-admin") {
      return "Sub-Admin";
    } else if (roleId === "cashier") {
      return "Cashier";
    } else {
      const customRole = customRoles.find((role) => role._id === roleId);
      return customRole ? customRole.name : "Unknown Role";
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

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter((permission) => permission !== value));
    }
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
    setEditingUser(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("user");
    setPermissions([]);
  };

  const handleChangeRole = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole); // Update the selected role in state

    // Check if the selected role is a custom role
    const selectedCustomRole = customRoles.find(
      (role) => role._id === selectedRole
    );
    if (selectedCustomRole) {
      // Update permissions with custom role permissions
      setPermissions(selectedCustomRole.permissions);
    } else {
      // Clear permissions if it's not a custom role
      setPermissions([]);
    }
  };

  // Combine predefined roles with custom roles and remove duplicates
  const allRoles = [...predefinedRoles, ...customRoles];
  const uniqueRoles = getUniqueRoles(allRoles);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

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
                        {/* <div className="col-xl-6">
                          <h4 className="fw-bold">User Category</h4>
                        </div> */}

                        <div className="col-xl-3">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenUserModal(true)}
                            className="fw-bold"
                            size="small"
                          >
                            Add User
                          </Button>

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

                        <div className="col-xl-9">
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
                              {showNoResultsMessage && (
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  style={{ marginTop: "8px" }}
                                >
                                  No results found.
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      </div>

                      {/* <div className="row">
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
                      </div> */}
                    </div>
                  </div>
                  <ToastContainer />

                  <Modal
                    open={openUserModal}
                    onClose={handleCloseUserModal}
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
                        {editingUser ? "EDIT USER" : "ADD USER"}
                      </Typography>
                      <form
                        onSubmit={editingUser ? handleUpdateUser : handleSubmit}
                        className="form"
                      >
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="form-group">
                              {/* <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            size="small"
                          /> */}

                              <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const capitalizedValue = inputValue.replace(
                                    /\b\w/g,
                                    (char) => char.toUpperCase()
                                  );
                                  setUsername(capitalizedValue);
                                }}
                                required
                                fullWidth
                                margin="normal"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="form-group">
                              <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="form-group">
                              <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={!editingUser}
                                fullWidth
                                margin="normal"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="form-group">
                              <FormControl fullWidth margin="normal">
                                <InputLabel id="role-label">
                                  Designation
                                </InputLabel>

                                <Select
                                  labelId="role-label"
                                  value={role}
                                  onChange={handleChangeRole}
                                  margin="normal"
                                  size="small"
                                  label="Designation"
                                >
                                  <MenuItem value="user">User</MenuItem>
                                  <MenuItem value="admin">Admin</MenuItem>
                                  <MenuItem value="sub-admin">
                                    Sub-Admin
                                  </MenuItem>
                                  <MenuItem value="cashier">Cashier</MenuItem>
                                  {customRoles.map((role) => (
                                    <MenuItem key={role._id} value={role._id}>
                                      {role.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <h5 className="fw-bold" style={{ color: "gray" }}>
                            Permissions
                          </h5>
                          <FormControl fullWidth className="d-flex">
                            {["create", "read", "modified", "delete"].map(
                              (permission) => (
                                <FormControlLabel
                                  key={permission}
                                  control={
                                    <Checkbox
                                      checked={permissions.includes(permission)}
                                      onChange={handlePermissionChange}
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
                            onClick={() => setOpenUserModal(false)}
                          >
                            Cancel
                          </Button>

                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="mt-2"
                          >
                            {editingUser ? "Update User" : "Create User"}
                          </Button>
                        </div>
                      </form>
                    </Box>
                  </Modal>

                  <Modal
                    open={openCustomRoleModal}
                    // onClose={() => setOpenCustomRoleModal(false)}
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
                      <form onSubmit={handleAddCustomRole} className="form">
                        <div className="form-group">
                          <TextField
                            label="Designation Name"
                            value={customRoleName}
                            // onChange={(e) => setCustomRoleName(e.target.value)}

                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const capitalizedValue = inputValue.replace(
                                /\b\w/g,
                                (char) => char.toUpperCase()
                              );
                              setCustomRoleName(capitalizedValue);
                            }}
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
                            className="mt-0"
                          >
                            {/* <InputLabel id="custom-permission-label">
                              Custom Permissions
                            </InputLabel> */}
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
                                        setCustomPermissions(
                                          customPermissions.includes(permission)
                                            ? customPermissions.filter(
                                                (p) => p !== permission
                                              )
                                            : [...customPermissions, permission]
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
                            size="small"
                            onClick={() => setOpenCustomRoleModal(false)}
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

                  <div className="row mt-1">
                    <div className="col-xl-12">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p className="message error">{error}</p>
                      ) : (
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
                                <TableCell align="left" className="fw-bold">
                                  Username
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Email
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Designation
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Permissions
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Actions
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredUsers.map((user, index) => (
                                <TableRow
                                  key={user._id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="left">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">
                                    {user.username}
                                  </TableCell>
                                  <TableCell align="left">
                                    {user.email}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Badge
                                      style={{ width: "5rem" }}
                                      className="p-2"
                                      size="small"
                                      bg={
                                        user.role === "admin"
                                          ? "primary"
                                          : user.role === "sub-admin"
                                          ? "secondary"
                                          : user.role === "cashier"
                                          ? "warning"
                                          : user.role === "user"
                                          ? "danger"
                                          : getRoleName(user.role) === "user "
                                          ? "danger"
                                          : "success"
                                      }
                                    >
                                      {getRoleName(user.role)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell align="left">
                                    {user.permissions.length > 0 ? (
                                      user.permissions.join(", ")
                                    ) : (
                                      <span
                                        className="text-primary fw-bold"
                                        style={{ opacity: "0.8" }}
                                      >
                                        {" "}
                                        No permissions assigned
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell align="left">
                                    <span className="me-2">
                                      <Button
                                        size="small"
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleEditUser(user)}
                                        style={{ background: "#a5d6a7" }}
                                        className="text-success"
                                      >
                                        <EditRoundedIcon />
                                      </Button>
                                    </span>
                                    <span>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          handleDeleteUser(user._id)
                                        }
                                        style={{ background: "#ffab91" }}
                                      >
                                        <DeleteIcon className="text-danger" />
                                      </Button>
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </div>

                    <div className="col-xl-12  mt-3 d-flex justify-content-end">
                      <Stack spacing={2}>
                        {/* <Pagination count={10} variant="outlined" /> */}
                        <Pagination
                          count={5}
                          variant="outlined"
                          color="primary"
                        />
                        {/* <Pagination count={10} variant="outlined" color="secondary" /> */}
                        {/* <Pagination count={10} variant="outlined" disabled /> */}
                      </Stack>
                    </div>
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
