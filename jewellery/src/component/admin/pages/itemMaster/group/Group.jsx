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

// import Header from "../../../schema/Header";

import {
   
  Select, FormControl, InputLabel
} from '@mui/material';

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

import {

  InputAdornment,
  IconButton,
} from "@mui/material";

import Header from "../../../../schema/Header";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
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

export default function Group() {


  const [groupName, setGroupName] = useState('');
  const [isUnderGroup, setIsUnderGroup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [transferGroupId, setTransferGroupId] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);


  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setDropdownVisible(true);

    // Filter items based on search term
    const filtered = jewelryItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/group', { name: groupName, underGroup: isUnderGroup });
      setGroupName('');
      setIsUnderGroup(false);
      fetchGroups();
      handleClose();
    } catch (error) {
      console.error('Error saving group name:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/groups/${selectedGroup._id}`, { name: groupName, underGroup: isUnderGroup });
      setGroupName('');
      setIsUnderGroup(false);
      fetchGroups();
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating group name:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/groups/${selectedGroup._id}`, { data: { transferGroupId } });
      fetchGroups();
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting group:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewOpen = (group) => {
    setSelectedGroup(group);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const handleUpdateOpen = (group) => {
    setSelectedGroup(group);
    setGroupName(group.name);
    setIsUnderGroup(group.underGroup);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleDeleteOpen = (group) => {
    setSelectedGroup(group);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/item_master"
      className="text-decoration-none"
      style={{ fontSize: "15px" }}
    >
      Item List
    </Link>,
    <Typography
      key="4"
      color="text.primary"
      style={{ fontSize: "15px", color: "gray" }}
    >
     Group
    </Typography>,
  ];

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
                            color="primary"
                            onClick={handleOpen}
                            className="fw-bold"
                            size="small"
                          >
                            Add Group
                          </Button>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                          <TextField
                            size="small"
                            fullWidth
                            id="search"
                            label="Search by Name"
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
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 d-xl-none mt-0 pt-0">
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
          <TableCell align="right" className="fw-bold">Group</TableCell>
          <TableCell align="center"className="fw-bold">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredGroups.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} align="center" className="text-secondary">
              No groups available.
            </TableCell>
          </TableRow>
        ) : (
          filteredGroups.map((group, index) => (
            <TableRow key={group._id}>
              <TableCell align="right">
                <span>{index + 1}</span>
              </TableCell>
              <TableCell align="right">
                <span key={group._id}>{group.name}</span>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ marginRight: "10px" }}
                  size="small"
                  onClick={() => handleViewOpen(group)}
                >
                  <RemoveRedEyeIcon />
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  style={{ marginRight: "10px" }}
                  size="small"
                  onClick={() => handleUpdateOpen(group)}
                >
                  <EditRoundedIcon />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteOpen(group)}
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

  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add Group</DialogTitle>
    <DialogContent>


      <TextField
        label="Group Name"
        variant="outlined"
        // value={groupName}
        value={groupName.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        )}
        onChange={(e) => setGroupName(e.target.value)}
        fullWidth
        margin="normal"

      />


    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="error" variant="contained">
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={handleSave}>
       Add
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog open={viewOpen} onClose={handleViewClose}>
    <DialogTitle>View Group</DialogTitle>
    <DialogContent>
      <TextField
        label="Group Name"
        variant="outlined"
        value={selectedGroup ? selectedGroup.name : ''}
        fullWidth
        disabled
        margin="normal"
        style={{ marginBottom: '20px' }}
      />
      {/* <TextField
        label="Under Group"
        variant="outlined"
        value={selectedGroup ? (selectedGroup.underGroup ? 'Yes' : 'No') : ''}
        fullWidth
        disabled
        style={{ marginBottom: '20px' }}
      /> */}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleViewClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog open={updateOpen} onClose={handleUpdateClose}>
    <DialogTitle>Update Group</DialogTitle>
    <DialogContent>
      <TextField
        label="Group Name"
        variant="outlined"
      
        value={groupName.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        )}
        onChange={(e) => setGroupName(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px' }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleUpdateClose} color="error" variant="contained" size="small">
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={handleUpdate} size="small">
        Update
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog open={deleteOpen} onClose={handleDeleteClose}>
    <DialogTitle>Delete Group</DialogTitle>
    <DialogContent>
      <p>Are you sure you want to delete this group? This action will also delete all items under this group. If you prefer, you can transfer the items to another existing group.</p>
      <FormControl fullWidth>
        <InputLabel>Transfer Items To</InputLabel>
        <Select
          value={transferGroupId}
          onChange={(e) => setTransferGroupId(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {groups.map(group => (
            <MenuItem key={group._id} value={group._id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteClose} color="secondary">
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={handleDelete}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
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
