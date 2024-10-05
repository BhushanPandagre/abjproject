import { Link } from "react-router-dom";
import api from "../../../../../services/api";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import PrintIcon from "@mui/icons-material/Print"; // Import the print icon
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { InputAdornment, IconButton } from "@mui/material";
import Header from "../../../../schema/Header";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  <Typography key="4" color="text.primary">
    Purchase Voucher Detail
  </Typography>,
];

export default function StockList() {
  const navigate = useNavigate("");
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await api.get("/api/entries");
        setEntries(response.data);
        setFilteredEntries(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    // Filter entries based on search term and date range
    const results = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const isWithinDateRange =
        (!startDate || entryDate >= new Date(startDate)) &&
        (!endDate || entryDate <= new Date(endDate));
      const matchesSearchTerm =
        entry.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.voucherNumber.toLowerCase().includes(searchTerm.toLowerCase());

      return isWithinDateRange && matchesSearchTerm;
    });
    setFilteredEntries(results);
  }, [searchTerm, startDate, endDate, entries]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/entries/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
      setFilteredEntries(filteredEntries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
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
                            onClick={() => {
                              navigate("/add_stock");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Stock Entry
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-xl-12 mb-2 mt-3">
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        className="d-flex justify-content-start mb-2"
                      >
                        <div className="col-xl-6">
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                            xl={3}
                            className="d-flex justify-content-start"
                          >
                            <TextField
                              size="small"
                              fullWidth
                              id="search"
                              label="Search by item or voucher number"
                              variant="outlined"
                              name="searchTerm"
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
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

                        <div className="col-xl-6 d-flex justify-content-end">
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            xl={3}
                            className="me-2"
                          >
                            <TextField
                              size="small"
                              fullWidth
                              label="Start Date"
                              InputLabelProps={{ shrink: true }}
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={4} xl={3}>
                            <TextField
                              size="small"
                              fullWidth
                              label="End Date"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </Grid>
                        </div>
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
                              <TableCell align="left" className="fw-bold">
                                Date
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Item
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Quantity
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Total Amount
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredEntries.length > 0 ? (
                              filteredEntries.map((entry, index) => (
                                <TableRow
                                  key={entry._id}
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
                                    {new Date(entry.date).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell align="left">
                                    {entry.item}
                                  </TableCell>

                                  <TableCell align="left">
                                    {entry.quantity}
                                  </TableCell>
                                  <TableCell align="left">
                                    {entry.amount}
                                  </TableCell>

                                  <TableCell align="left">
                                    <Link to={`/view_stock_entry/${entry._id}`}>
                                      <Button
                                        variant="contained"
                                        color="warning"
                                        size="small"
                                        style={{
                                          marginRight: "10px",
                                          background: "#ffe0b2",
                                        }}
                                      >
                                        <RemoveRedEyeIcon
                                          style={{ color: "#ff9100" }}
                                        />
                                      </Button>
                                    </Link>

                                    <Link to={`/update_stock/${entry._id}`}>
                                      <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        style={{
                                          marginRight: "10px",
                                          background: "#a5d6a7",
                                        }}
                                        className="text-success"
                                      >
                                        <EditRoundedIcon />
                                      </Button>
                                    </Link>

                                    <Button
                                      variant="contained"
                                      onClick={() => handleDelete(entry._id)}
                                      color="error"
                                      size="small"
                                      style={{ background: "#ffab91" }}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left"></TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
