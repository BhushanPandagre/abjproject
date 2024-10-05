
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Stack,
  
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Header from "../../schema/Header";


import {
  // Button,
  // TextField,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper,
  // Modal,
  // Typography,
  // Box
} from '@mui/material';
// import axios from 'axios';


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


const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/add_category">
      Category
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/group_name">
      Group
    </Link>,
    <Link underline="hover" key="3" color="inherit" href="/add_unit">
      Unit
    </Link>,
    <Typography key="4" color="text.primary">
      Item Master
    </Typography>,
  ];

export default function Gst() {

  const [gsts, setGsts] = useState([]);
  const [gstRate, setGstRate] = useState('');
  const [gstName, setGstName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGst, setSelectedGst] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedRate, setUpdatedRate] = useState('');

  useEffect(() => {
    const fetchGsts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gsts');
        setGsts(response.data);
      } catch (error) {
        console.error('Error fetching gsts:', error);
      }
    };

    fetchGsts();
  }, []);

  const handleAddGst = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/gsts', { name: gstName, rate: gstRate });
      setGsts([...gsts, response.data]);
      setGstName('');
      setGstRate('');
    } catch (error) {
      console.error('Error adding gst:', error);
    }
  };

  const handleDeleteGst = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/gsts/${id}`);
      setGsts(gsts.filter(gst => gst._id !== id));
    } catch (error) {
      console.error('Error deleting gst:', error);
    }
  };

  const handleViewGst = (gst) => {
    setSelectedGst(gst);
    setIsViewModalOpen(true);
  };

  const handleUpdateGst = (gst) => {
    setSelectedGst(gst);
    setIsUpdateModalOpen(true);
    setUpdatedName(gst.name);
    setUpdatedRate(gst.rate.toString()); // Assuming rate is stored as a number in backend
  };

  const handleUpdateGstData = (updatedGst) => {
    const updatedGsts = gsts.map(gst =>
      gst._id === updatedGst._id ? updatedGst : gst
    );
    setGsts(updatedGsts);
  };

  const handleUpdateGstModalClose = () => {
    setIsUpdateModalOpen(false);
    setUpdatedName('');
    setUpdatedRate('');
  };

  const handleUpdateGstSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/gsts/${selectedGst._id}`, { name: updatedName, rate: updatedRate });
      handleUpdateGstData(response.data);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating gst:', error);
    }
  };

  const filteredGsts = gsts.filter(gst =>
    gst.name && gst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



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
                          <div className="row">
                            <div className="col-xl-6">
                              <h4>GST</h4>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-xl-6 d-flex justify-content-end">
                          <Button
                            variant="contained"
                            color="primary"
                           
                          >
                            Add GST
                          </Button>
                        </div> */}
                      </div>
                    </div>

                    <div className="col-xl-12 mt-0 pt-0">
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
                    <div className="col-xl-12 mt-3">
                    {/* <h2>GST Management</h2> */}
                    <div className="row">
                      <div className="col-xl-5">
                      <TextField
        label="Add GST Name"
        value={gstName}
        onChange={(e) => setGstName(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '10px' }}
      />
                      </div>

                      <div className="col-xl-5">
                      <TextField
                              label="Add GST Rate"
                              value={gstRate}
                              onChange={(e) => setGstRate(e.target.value)}
                              variant="outlined"
                              fullWidth
                              style={{ marginBottom: '10px' }}
                            />
                      </div>

                      <div className="col-xl-2">
                        <Button variant="contained" color="primary" onClick={handleAddGst}>
                          Add GST
                        </Button>
                      </div>

                    </div>
     
      
     

      <TextField
        label="Search GST"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '20px' }}
      />

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
                              <TableCell align="left">Serial No</TableCell>
                              <TableCell align="left">Name</TableCell>
                              <TableCell align="left">Rate</TableCell>
                              <TableCell align="left">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {filteredGsts.map((gst, index) => (


                              <TableRow  key={gst._id}>
                                <TableCell align="left">
                                {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                {gst.name}
                                </TableCell>
                                <TableCell align="left">
                                {gst.rate}
                                </TableCell>
                                <TableCell align="left">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleViewGst(gst)}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleUpdateGst(gst)}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    Update
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteGst(gst._id)}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                             ))} 
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* View GST Modal */}
      {/* View GST Modal */}
      <Modal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            {selectedGst ? `GST: ${selectedGst.name}` : 'GST'}
          </Typography>
          <Typography id="modal-modal-description" gutterBottom>
            {selectedGst ? `GST ID: ${selectedGst._id}` : ''}
          </Typography>
          <Typography id="modal-modal-description" gutterBottom>
            {selectedGst ? `GST Rate: ${selectedGst.rate}` : ''}
          </Typography>
          <Button variant="contained" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>
        </Box>
      </Modal>


                     
    {/* Update GST Modal */}
    <Modal
        open={isUpdateModalOpen}
        onClose={handleUpdateGstModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            {selectedGst ? `Update GST: ${selectedGst.name}` : 'Update GST'}
          </Typography>
          <TextField
            label="GST Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="GST Rate"
            value={updatedRate}
            onChange={(e) => setUpdatedRate(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateGstSubmit}>
            Update
          </Button>
          <Button variant="contained" onClick={handleUpdateGstModalClose} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Box>
      </Modal>

                      {/* Add Category Modal */}
                      <Modal
                       
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                          >
                            Add Category
                          </Typography>
                          <TextField
                            label="Category Name"
                          
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "10px" }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                           
                          >
                            Add
                          </Button>
                          <Button
                            variant="contained"
                          
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </Button>
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
