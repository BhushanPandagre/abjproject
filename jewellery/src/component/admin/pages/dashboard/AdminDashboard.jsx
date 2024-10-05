// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import { Box, Typography, Paper } from '@mui/material';

// const data = [
//   { name: 'Category A', value: 400 },
//   { name: 'Category B', value: 300 },
//   { name: 'Category C', value: 300 },
//   { name: 'Category D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// export default function AdminDashboard() {
//   return (
//     <div>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Sales Distribution
//       </Typography>
//       <Box display="flex" justifyContent="center" alignItems="center">
//         <PieChart width={300} height={300}>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </Box>
//     </Paper>

//     </div>
//   )
// }

// import React from 'react';
// import { Grid, Paper, Typography, Box } from '@mui/material';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#6A5ACD'];

// const data = [
//   { name: 'Sales', value: 400 },
//   { name: 'Purchase', value: 300 },
//   { name: 'Receipt', value: 200 },
//   { name: 'Payment', value: 100 },
//   { name: 'Items', value: 150 },
//   { name: 'Account Master', value: 250 },
// ];

// export default function AdminDashboard() {
//   return (
//     <div>
//       <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Financial Overview
//           </Typography>
//           <Box display="flex" justifyContent="center" alignItems="center">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                   animationDuration={800}
//                   animationBegin={100}
//                   isAnimationActive={true}
//                 >
//                   {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>
//       {/* Additional sections for other data, graphs, or components */}
//       <Grid item xs={12} md={6}>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Account Master Overview
//           </Typography>
//           {/* Add other components, charts, or summary data here */}
//         </Paper>
//       </Grid>
//       {/* Add more Grid items for other sections as needed */}
//     </Grid>
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
// import Tooltip from "@mui/material/Tooltip";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  FormControl,
  InputLabel,
  Select,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import AddIcon from "@mui/icons-material/Add";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../../../schema/Header";
import { keyframes } from "@mui/system";
import { FaRegSmileWink } from "react-icons/fa";

import { Card, CardContent, Grow } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// const bounceAnimation = keyframes`
//   0%, 20%, 50%, 80%, 100% {
//     transform: translateY(0);
//   }
//   40% {
//     transform: translateY(-10px);
//   }
//   60% {
//     transform: translateY(-5px);
//   }
// `;

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

import {
  PieChart,
  Tooltip,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { styled } from '@mui/system';

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#6A5ACD",
];

// Blinking text animation
const BlinkingText = styled(Typography)`
  // animation: blinker 1.5s linear infinite;
  // @keyframes blinker {
  //   50% {
  //     opacity: 0;
  //   }
  // }
`;

const data = [
  { name: "Sales", value: 400 },
  { name: "Purchase", value: 300 },
  { name: "Receipt", value: 200 },
  { name: "Payment", value: 100 },
  { name: "Items", value: 150 },
  { name: "Account Master", value: 250 },
];

const stockData = [
  { name: "Finished Goods", value: 500 },
  { name: "Raw Materials", value: 300 },
  { name: "Work in Progress", value: 200 },
  { name: "Packing Materials", value: 150 },
  { name: "Consumables", value: 100 },
  { name: "Others", value: 50 },
];

const cardsData = [
  {
    title: "User",
    description: "Manage user information",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    title: "Item",
    description: "Manage item details",
    icon: <StoreIcon fontSize="large" />,
  },
  {
    title: "Purchase",
    description: "View purchase records",
    icon: <ShoppingCartIcon fontSize="large" />,
  },
  // { title: 'Employee', description: 'Employee management', icon: <WorkIcon fontSize="large" /> },
  {
    title: "Sale",
    description: "Track sales data",
    icon: <AttachMoneyIcon fontSize="large" />,
  },
];

export default function AdminDashboard({}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-3">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12 mt-0 mb-1">
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          justifyContent="left"
                          alignItems="left"
                          sx={{ padding: 2 }}
                        >
                          <FaRegSmileWink
                            style={{
                              marginRight: "8px",
                              color: "orange",
                              fontSize: "24px",
                              animation: `${bounceAnimation} 2s infinite`,
                            }}
                          />
                          <BlinkingText
                            variant="h6"
                            className="fw-bold text-secondary"
                          >
                            Welcome to Admin Dashboard
                          </BlinkingText>
                        </Box>
                      </Grid>
                    </div>

                   
                  </div>

                  <div className="row mt-2">
                    <div className="col-xl-12">
                      <Grid container spacing={3}>
                       
                       


                      

                       {/* card  Section */}
                        <Grid container  sx={{ padding: 1 }}>
                          
                          {cardsData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={3} xl={4} key={index}>

                             <Grow in={true} timeout={1000}>
                              <Card
                                sx={{
                                  minWidth: 150,
                                  textAlign: 'center',
                                  margin: 1,
                                  padding: 1,
                                  backgroundColor: '#f5f5f5',
                                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                  borderRadius: 3,
                                  '&:hover': {
                                    backgroundColor: '#eceff1',
                                    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.3)',
                                  },
                                }}
                              >
                                <CardContent>
                                  <div
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: 50,
                                      height: 50,
                                      borderRadius: '50%',
                                      backgroundColor: '#3f51b5',
                                      margin: '0 auto',
                                      transition: 'background-color 0.3s ease',
                                    }}
                                  >
                                    {React.cloneElement(card.icon, { style: { color: '#fff' } })}
                                  </div>
                                  <Typography variant="h5" component="div" sx={{ marginTop: 2, color: '#424242' }}>
                                    {card.title}
                                  </Typography>
                                  <Typography variant="body2" sx={{ marginTop: 1, color: '#616161' }}>
                                    {card.description}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grow>
                            </Grid>
                          ))}
                        </Grid>

                        {/* Pie Chart Section */}
                        <Grid item xs={12} md={6}>
                          <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Financial Overview
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                  <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationDuration={800}
                                    animationBegin={100}
                                    isAnimationActive={true}
                                  >
                                    {data.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                                </PieChart>
                              </ResponsiveContainer>
                            </Box>
                          </Paper>
                        </Grid>

                      

                        <Grid item xs={12} md={6}>
                          <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Stock Report Overview
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                  <Pie
                                    data={stockData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationDuration={800}
                                    animationBegin={100}
                                    isAnimationActive={true}
                                  >
                                    {stockData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                                </PieChart>
                              </ResponsiveContainer>
                            </Box>
                          </Paper>
                        </Grid>

                       

                        {/* Table Section */}
                        <Grid item xs={12} md={6}>
                          <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Detailed Financial Information
                            </Typography>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <TableSortLabel
                                        active={orderBy === "name"}
                                        direction={
                                          orderBy === "name" ? order : "asc"
                                        }
                                        onClick={() =>
                                          handleRequestSort("name")
                                        }
                                        className="fw-bold"
                                      >
                                        Category
                                      </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                      <TableSortLabel
                                        active={orderBy === "value"}
                                        direction={
                                          orderBy === "value" ? order : "asc"
                                        }
                                        onClick={() =>
                                          handleRequestSort("value")
                                        }
                                        className="fw-bold"
                                      >
                                        Value
                                      </TableSortLabel>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {sortedData.map((row) => (
                                    <TableRow key={row.name}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.value}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Paper>
                        </Grid>
                      </Grid>
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
