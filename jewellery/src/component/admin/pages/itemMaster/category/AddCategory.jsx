
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
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  Breadcrumbs,
  Stack,
  
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        { name: categoryName }
      );
      setCategories([...categories, response.data]);
      setCategoryName("");
      setIsAddModalOpen(false); // Close the modal after adding the category
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
    setUpdatedName(category.name);
  };

  const handleUpdateCategoryData = (updatedCategory) => {
    const updatedCategories = categories.map((category) =>
      category._id === updatedCategory._id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  const handleUpdateCategoryModalClose = () => {
    setIsUpdateModalOpen(false);
    setUpdatedName("");
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateCategorySubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/categories/${selectedCategory._id}`,
        { name: updatedName }
      );
      handleUpdateCategoryData(response.data);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/add_category">
      Category
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/add_group">
      Group
    </Link>,
    <Link underline="hover" key="3" color="inherit" href="/add_unit">
      Unit
    </Link>,
    <Typography key="4" color="text.primary">
      Item Master
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
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                          <div className="row">
                            <div className="col-xl-6">
                              <h4 className="fw-bold">Category</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsAddModalOpen(true)}
                          >
                            Add Category
                          </Button>
                        </div>
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
          <TableCell align="left" className="fw-bold">#</TableCell>
          <TableCell align="left" className="fw-bold">Category Name</TableCell>
          <TableCell align="left" className="fw-bold">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredCategories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Typography variant="body2" color="textSecondary">
                No data available
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          filteredCategories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{category.name}</TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleViewCategory(category)}
                >
                  <RemoveRedEyeIcon />
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateCategory(category)}
                  style={{ marginLeft: '10px' }}
                >
                   <EditRoundedIcon />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteCategory(category._id)}
                  style={{ marginLeft: '10px' }}
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

  {/* View Category Modal */}
  <Modal
    open={isViewModalOpen}
    onClose={() => setIsViewModalOpen(false)}
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
        {selectedCategory
          ? `Category: ${selectedCategory.name}`
          : "Category"}
      </Typography>
      <Typography id="modal-modal-description" gutterBottom>
        {selectedCategory
          ? `Category ID: ${selectedCategory._id}`
          : ""}
      </Typography>
      <Button
        variant="contained"
        onClick={() => setIsViewModalOpen(false)}
      >
        Close
      </Button>
    </Box>
  </Modal>

  {/* Update Category Modal */}
  <Modal
    open={isUpdateModalOpen}
    onClose={handleUpdateCategoryModalClose}
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
        {selectedCategory
          ? `Update Category: ${selectedCategory.name}`
          : "Update Category"}
      </Typography>
      <TextField
        label="Category Name"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateCategorySubmit}
      >
        Update
      </Button>
      <Button
        variant="contained"
        onClick={handleUpdateCategoryModalClose}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </Button>
    </Box>
  </Modal>

  {/* Add Category Modal */}
  <Modal
    open={isAddModalOpen}
    onClose={() => setIsAddModalOpen(false)}
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
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
      >
        Add
      </Button>
      <Button
        variant="contained"
        onClick={() => setIsAddModalOpen(false)}
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
  );
}
