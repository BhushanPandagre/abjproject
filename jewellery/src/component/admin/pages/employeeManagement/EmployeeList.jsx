



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


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";




const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  // <Link underline="hover" key="1" color="inherit" to="/user_category" className="text-decoration-none">
  //  User Category
  // </Link>,

  <Typography key="4" color="text.primary">
    Employee List
  </Typography>,
];

export default function EmployeeList() {

    const navigate = useNavigate("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [loadingDepartments, setLoadingDepartments] = useState(false);
   
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Error fetching employees");
      }
    };
    fetchEmployees();
  }, []);

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


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting Employee");
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setImageFile(null); // Reset image file
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true); // Open view modal
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", selectedEmployee.name);
      formData.append("email", selectedEmployee.email);
      formData.append("position", selectedEmployee.position);
      formData.append("department", selectedEmployee.department);
      formData.append("dateOfHire", selectedEmployee.dateOfHire);
      formData.append("salary", selectedEmployee.salary);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = selectedEmployee._id
        ? `http://localhost:5000/api/employees/${selectedEmployee._id}`
        : "http://localhost:5000/api/employees";

      const method = selectedEmployee._id ? "PUT" : "POST";

      await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);

      // Notify success
      toast.success("Employee updated successfully!");

      setIsEditModalOpen(false); // Close edit modal
      setSelectedEmployee(null); // Clear selected employee
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Error saving employee");
    }
  };


  return (
    <div>

    {/* <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <img
              src={`http://localhost:5000/${employee.image}`}
              alt={employee.name}
              style={{ width: "50px", height: "50px" }}
            />
            {employee.name} - {employee.position} - ${employee.salary}
            <button onClick={() => handleView(employee)}>View</button>
            <button onClick={() => handleEdit(employee)}>Edit</button>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>

     
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Employee Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h3>Edit Employee</h3>
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={selectedEmployee?.name || ""}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
            }
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={selectedEmployee?.email || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                email: e.target.value,
              })
            }
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={selectedEmployee?.position || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                position: e.target.value,
              })
            }
            placeholder="Position"
            required
          />
          <input
            type="text"
            value={selectedEmployee?.department || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                department: e.target.value,
              })
            }
            placeholder="Department"
            required
          />
          <input
            type="date"
            value={selectedEmployee?.dateOfHire || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                dateOfHire: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            value={selectedEmployee?.salary || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                salary: e.target.value,
              })
            }
            placeholder="Salary"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            placeholder="Upload Image"
          />
          <button type="submit">Save</button>
        </form>
      </Modal>

    
      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
        contentLabel="View Employee Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h3>Employee Details</h3>
        {selectedEmployee && (
          <div>
            <img
              src={`http://localhost:5000/${selectedEmployee.image}`}
              alt={selectedEmployee.name}
              style={{ width: "100px", height: "100px" }}
            />
            <p>
              <strong>Name:</strong> {selectedEmployee.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <p>
              <strong>Position:</strong> {selectedEmployee.position}
            </p>
            <p>
              <strong>Department:</strong> {selectedEmployee.department}
            </p>
            <p>
              <strong>Date of Hire:</strong> {selectedEmployee.dateOfHire}
            </p>
            <p>
              <strong>Salary:</strong> ${selectedEmployee.salary}
            </p>
            <button onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        )}
      </Modal>

      
      <ToastContainer />
    </div> */}


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
                          <h4 className="fw-bold">Employee List</h4>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate("/add_employee")
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Employee
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

                  <div className="col-xl-12 d-flex justify-content-end">
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
                            label="Search by Name or Account ID"
                            variant="outlined"
                              name="searchTerm"
                           
                          />
                         
                        </Grid>
                      </Grid>
                    </div>

                    <div className="col-xl-12">
                      <TableContainer
                        component={Paper}
                        className="d-flex justify-content-center"
                      >
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
                              {/* <TableCell align="left" className="fw-bold">
                          image
                              </TableCell> */}
                              <TableCell align="left" className="fw-bold">
                             Name
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                               Designation
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                             Salery
                              </TableCell>
                             
                              <TableCell align="left" className="fw-bold">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                           
                      
                          {/* <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <img
              src={`http://localhost:5000/${employee.image}`}
              alt={employee.name}
              style={{ width: "50px", height: "50px" }}
            />
            {employee.name} - {employee.position} - ${employee.salary}
            <button onClick={() => handleView(employee)}>View</button>
            <button onClick={() => handleEdit(employee)}>Edit</button>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul> */}




      {employees.map((employee,index) => (
                              <TableRow
                              key={employee._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">
                               <span>
                               <img
              src={`http://localhost:5000/${employee.image}`}
              alt={employee.name}
              style={{ width: "50px", height: "50px" }}
            />
                               </span>

                               <span>
                               {employee.name}
                               </span>

                               
                                </TableCell>
                                <TableCell align="left">
                                {employee.position}
                                </TableCell>

                                <TableCell align="left">
                                {employee.salary}
                                </TableCell>

                             
                                <TableCell align="left">
                               
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                    style={{ marginRight: "10px",background:'#ffe0b2'}}
                                    onClick={() => handleView(employee)}
                                  >
                                    <RemoveRedEyeIcon style={{color:'#ff9100'}} />
                                  </Button>
                                
                               
                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      style={{ marginRight: "10px",background:'#a5d6a7' }}
                                      className="text-success"
                                      onClick={() =>  handleEdit(employee)}
                                      
                                    >
                                      <EditRoundedIcon />
                                    </Button>
                               

                                  <Button
                                    variant="contained"
                                    onClick={() => handleDelete(employee._id)}
                                    color="error"
                                    size="small"
                                    style={{background:'#ffab91'}}
                                  >
                                    <DeleteIcon className="text-danger"/>
                                  </Button>
                                </TableCell>
                              </TableRow>
                             ))}  







      
      <ToastContainer />
          
        



                          </TableBody>
                        </Table>

                     
                     
                      </TableContainer>
                    </div>


                    <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Employee Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h3>Edit Employee</h3>
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={selectedEmployee?.name || ""}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
            }
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={selectedEmployee?.email || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                email: e.target.value,
              })
            }
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={selectedEmployee?.position || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                position: e.target.value,
              })
            }
            placeholder="Position"
            required
          />
          {/* <input
            type="text"
            value={selectedEmployee?.department || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                department: e.target.value,
              })
            }
            placeholder="Department"
            required
          /> */}

<select
          name="department"
          value={selectedEmployee?.department || ""}
         
          onChange={(e) =>
            setSelectedEmployee({
              ...selectedEmployee,
              department: e.target.value,
            })
          }
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
          <input
            type="date"
            value={selectedEmployee?.dateOfHire || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                dateOfHire: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            value={selectedEmployee?.salary || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                salary: e.target.value,
              })
            }
            placeholder="Salary"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            placeholder="Upload Image"
          />
          <button type="submit">Save</button>
        </form>
      </Modal>

    
      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
        contentLabel="View Employee Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h3>Employee Details</h3>
        {selectedEmployee && (
          <div>
            <img
              src={`http://localhost:5000/${selectedEmployee.image}`}
              alt={selectedEmployee.name}
              style={{ width: "100px", height: "100px" }}
            />
            <p>
              <strong>Name:</strong> {selectedEmployee.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <p>
              <strong>Position:</strong> {selectedEmployee.position}
            </p>
            <p>
              <strong>Department:</strong> {selectedEmployee.department}
            </p>
            <p>
              <strong>Date of Hire:</strong> {selectedEmployee.dateOfHire}
            </p>
            <p>
              <strong>Salary:</strong> ${selectedEmployee.salary}
            </p>
            <button onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        )}
      </Modal>



                  </div>
                </div>
              </Box>
            </Box>
            <ToastContainer />
          </div>
        </div>
      </div>



      
    </div>
  )
}
