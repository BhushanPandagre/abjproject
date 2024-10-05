import axios from "axios";
import Modal from "react-modal";
import { Button, Form, Table, Container, Row, Col } from "react-bootstrap";
// import './CashFlow.css'; // Custom CSS for additional styling
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
Modal.setAppElement("#root"); // Set the app root element for accessibility

import { format } from "date-fns";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import AddIcon from "@mui/icons-material/Add";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Header from "../../../schema/Header";
import "./CashDetail.css";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    to="/account_master_detail"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    Ac. Master Detail
  </Link>,

  <Typography key="3" color="text.secondary" style={{ fontSize: "15px" }}>
    Item Master
  </Typography>,
];

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

export default function CashDetail() {
  const [cashFlows, setCashFlows] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editType, setEditType] = useState("income");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null); // State for file
  const [accounts, setAccounts] = useState([]);
  const [currentFileName, setCurrentFileName] = useState(''); 

  useEffect(() => {
    fetchCashFlows();
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/accounts");
      setAccounts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCashFlows = () => {
    axios
      .get("http://localhost:5000/api/cashflow")
      .then((response) => {
        setCashFlows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cash flow data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editing ? editName : name);
    // formData.append("description", editing ? editDescription : description);
    formData.append("description", editing ? editDescription : description);
    formData.append(
      "amount",
      editing ? parseFloat(editAmount) : parseFloat(amount)
    );
    formData.append("date", editing ? editDate : date);
    formData.append("type", editing ? editType : type);
    if (file) {
      formData.append("file", file); // Add the file to the FormData
    }

    const url = editing
      ? `http://localhost:5000/api/cashflow/${editing}`
      : "http://localhost:5000/api/cashflow";
    const method = editing ? "put" : "post";

    axios({
      method: method,
      url: url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (editing) {


          setCashFlows(
            cashFlows.map((cashFlow) =>
              cashFlow._id === response.data._id ? response.data : cashFlow
            )
            
          ); 
           toast.success("Account Updated successfully");
          
        } else {
          setCashFlows([...cashFlows, response.data]);
          toast.success("Account Added successfully");
        }
        resetForm();
        setIsModalOpen(false);
      
      })
      .catch((error) => {
        console.error(
          `Error ${editing ? "updating" : "adding"} cash flow:`,
          error
        );
      });
  };

  const handleEdit = (cashFlow) => {
    setEditing(cashFlow._id);
    setEditName(cashFlow.name);
    setEditDescription(cashFlow.description);
    setEditAmount(cashFlow.amount);
    setEditDate(format(new Date(cashFlow.date), "yyyy-MM-dd"));
    setEditType(cashFlow.type);
    setFile(null); // Clear file on edit
    setCurrentFileName(cashFlow.fileUrl ? cashFlow.fileUrl.split('/').pop() : 'No File');
    setIsModalOpen(true);
   
    
  };

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/api/cashflow/${id}`)
  //     .then(() => {
  //       setCashFlows(cashFlows.filter((cashFlow) => cashFlow._id !== id));
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting cash flow:", error);
  //     });
  // };


  const handleDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/cashflow/${id}`);
          setCashFlows(cashFlows.filter((cashFlow) => cashFlow._id !== id));
          toast.success("Cash Detail deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error("Error deleting account");
        }
      }
    });
  
  };




  const resetForm = () => {
    setName("");
    setDescription("");
    setAmount("");
    setDate("");
    setType("income");
    setFile(null); // Reset file input
    setEditing(null);
    setEditDescription("");
    setEditAmount("");
    setEditDate("");
    setEditType("income");
    setCurrentFileName(''); // Reset current file name
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
                      <h5 className="text-center">Cash Management</h5>
                      <Form
                        onSubmit={handleSubmit}
                        className="mb-4 shadow p-4 rounded"
                        style={{ background: "#f8f9fa" }}
                      >
                        <Row>
                          <Col md={3}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              >
                                <option value="">Select Account</option>
                                {accounts.map((account) => (
                                  <option
                                    key={account._id}
                                    value={account.name}
                                  >
                                    {account.name}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group>
                              <Form.Control
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                              >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={2}>
                            <Form.Group>
                              <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Col md={2} className="mt-2">
                          <Form.Group>
                            <Form.Control
                              type="file"
                              onChange={(e) => setFile(e.target.files[0])} // Handle file input
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-center mt-2">
                          <Button variant="primary" type="submit">
                            Add Cash Flow
                          </Button>
                        </Col>
                      </Form>
                      <h2 className="my-4 text-center">Cash Flows</h2>
                      <Table striped bordered hover className="shadow-sm">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>File</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cashFlows.map((cashFlow) => (
                            <tr key={cashFlow._id}>
                              <td>
                                {format(new Date(cashFlow.date), "dd-MM-yyyy")}
                              </td>
                              <td>{cashFlow.name}</td>
                              <td>{cashFlow.description}</td>
                              <td>{cashFlow.amount}</td>
                              <td>{cashFlow.type}</td>
                              <td>
                                {cashFlow.fileUrl ? (
                                  <a
                                    href={`http://localhost:5000/${cashFlow.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View File
                                  </a>
                                ) : (
                                  "No File"
                                )}
                              </td>
                              <td>
                                <Button
                                  variant="warning"
                                  className="me-2"
                                  onClick={() => handleEdit(cashFlow)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDelete(cashFlow._id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="Edit Cash Flow"
                        className="Modal"
                        overlayClassName="Overlay"
                      >
                        <h2 className="text-center">Edit Cash Flow</h2>
                        <Form onSubmit={handleSubmit} className="p-4">
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="text"
                                  placeholder="Name"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                            

                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="date"
                                  value={editDate}
                                  onChange={(e) => setEditDate(e.target.value)}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="number"
                                  placeholder="Amount"
                                  value={editAmount}
                                  onChange={(e) =>
                                    setEditAmount(e.target.value)
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  as="select"
                                  value={editType}
                                  onChange={(e) => setEditType(e.target.value)}
                                >
                                  <option value="income">Income</option>
                                  <option value="expense">Expense</option>
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                          <Col md={6}>
                          <Form.Group className="mb-3">
          
            <Form.Control
              type="text"
              value={currentFileName}
              readOnly
            />
          </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group>
                                <Form.Control
                                  type="file"
                                  onChange={(e) => setFile(e.target.files[0])} // Handle file input
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={12}>
                             

                              <Textarea
                                maxRows={4}
                                type="text"
                                style={{ width: "100%" }}
                                className="p-4 mt-3"
                                value={editDescription}
                                onChange={(e) =>
                                  setEditDescription(e.target.value)
                                }
                                required
                              />
                            </Col>
                          </Row>

                          <Row className="mt-3">
                            <Col
                              md={12}
                              className="d-flex justify-content-center"
                            >
                              <Button variant="primary" type="submit">
                                Update Cash Flow
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Modal>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
