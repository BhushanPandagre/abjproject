// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Logo from "../../assets/img/akash_bangels_logo.png";

// import { Box, Dialog, Autocomplete } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import api from "../../services/api";
// const defaultTheme = createTheme();

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(true);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage("");
//     setIsSuccess(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/forgot-password",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         }
//       );
//       const result = await response.json();
//       if (response.ok) {
//         setMessage("OTP sent to your email!");
//         setIsSuccess(true);
//       } else {
//         setMessage(result.message);
//         setIsSuccess(false);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Error sending OTP.");
//       setIsSuccess(false);
//     }
//   };

//   return (
//     <div className="div">
//       <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs">
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//             style={{
//               border: "1px solid black",
//               borderRadius: "5px",
//             }}
//             className="p-4"
//           >
//             <div className="mb-3">
//               <img
//                 src={Logo}
//                 alt=""
//                 className="img-fluid "
//                 style={{ width: "150px", alignItems: "center" }}
//               />
//             </div>
//             <Typography component="h1" variant="h5">
//               <span className="fw-bold">Forgot Password</span>
//             </Typography>
//             <div className="row">
//               <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ mt: 1 }}
//                 style={{}}
//               >
//                 <ToastContainer />
//                 <div className="col-xl-12">
//                   <TextField
//                     margin="normal"
//                     fullWidth
//                     label="Email"
//                     size="small"
//                     autoFocus
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Send OTP
//                 </Button>

//                 {message && (
//                   <p className={`message ${isSuccess ? "success" : "error"}`}>
//                     {message}
//                   </p>
//                 )}
//                 <Grid container>
//                   <Grid item className="ms-5">
//                     <Link
//                       to="/"
//                       variant="body2"
//                       className="text-decoration-none"
//                     >
//                       {"Already signed up?"}
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </div>
//           </Box>
//         </Container>
//       </ThemeProvider>
//       <div></div>
//     </div>
//   );
// }


















import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Logo from "../../assets/img/akash_bangels_logo.png";
import UserLogo from "../../assets/img/download.jfif";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddSharpIcon from "@mui/icons-material/GroupAddSharp";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import VillaIcon from "@mui/icons-material/Villa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LineStyleOutlinedIcon from "@mui/icons-material/LineStyleOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import TextsmsIcon from "@mui/icons-material/Textsms";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import api from "../../services/api";

const options = [
  {
    label: "Hindi",
    flag: "data:image/jpeg;base64,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",
  },
  {
    label: "English",
    flag: "data:image/jpeg;base64,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",
  },
 
];

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      overflowY: "auto", // Enable vertical scrolling
      scrollbarWidth: "thin", // For Firefox
      "&::-webkit-scrollbar": {
        width: "2px", // For Chrome, Safari, and Opera
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.action.disabledBackground,
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: theme.palette.background.paper,
      },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      overflowY: "auto", // Enable vertical scrolling
      scrollbarWidth: "thin", // For Firefox
      "&::-webkit-scrollbar": {
        width: "8px", // For Chrome, Safari, and Opera
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.action.disabledBackground,
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: theme.palette.background.paper,
      },
    },
  }),
}));



const menuItems = {
  purchase: [
    {
      text: "Transaction",
      icon: <ShoppingBasketIcon />,
      link: "/add_purchase_voucher",
    },
    {
      text: "Report",
      icon: <AutoStoriesIcon />,
      link: "/purchase_voucher_list",
    },
  ],
  sale: [
    { text: "Transaction", icon: <LocalMallIcon />, link: "#" },
    { text: "Report", icon: <AutoStoriesIcon />, link: "#" },
  ],
  warehouseInventory: [
    {
      text: "Transaction",
      icon: <InventoryIcon />,
      link: "/sale_voucher",
      submenu: [{ text: "Stock Genral", icon: <ReceiptIcon />, link: "#" }],
    },
    { text: "Consumption", icon: <AutoGraphIcon />, link: "#" },
    { text: "Stock Transfer", icon: <MoveUpIcon />, link: "#" },
  ],
  MasterData: [
    {
      text: "Inventory Master",
      icon: <VillaIcon />,
      link: "/sale_voucher",
      submenu: [
        { text: "Item", icon: <ViewInArIcon />, link: "/item_master" },
        { text: "Group", icon: <LineStyleOutlinedIcon />, link: "/add_group" },
        { text: "Unit", icon: <CategoryOutlinedIcon />, link: "/add_unit" },
       
      ],
    },
    {
      text: "Account Master",
      icon: <AccountCircleIcon />,
      link: "/sale_voucher",
      submenu: [
        {
          text: "Add Account",
          icon: <PersonAddAltOutlinedIcon />,
          link: "/account_master",
        },
        {
          text: "Account List",
          icon: <RecentActorsOutlinedIcon />,
          link: "/account_master_detail",
        },
      ],
    },
    {
      text: "Other",
      icon: <DragIndicatorIcon />,
      link: "/sale_voucher",
      submenu: [
        {
          text: "User Category",
          icon: <GroupAddSharpIcon />,
          link: "/user_category",
        },
        {
          text: "Designation",
          icon: <GroupAddSharpIcon />,
          link: "/add_designation",
        },
      ],
    },
  ],
  account: [
    { text: "Transaction", icon: <GroupAddSharpIcon />, link: "#" },
    { text: "Report", icon: <GroupAddSharpIcon />, link: "#" },
  ],
  setting: [
    { text: "General", icon: <GroupAddSharpIcon />, link: "#" },
    { text: "Advanced", icon: <GroupAddSharpIcon />, link: "#" },
  ],
  other: [
    { text: "Owner Dashboard", icon: <SettingsIcon />, link: "#" },
    { text: "Cashier Portal", icon: <GroupAddSharpIcon />, link: "#" },
    { text: "Transport Portal", icon: <AirportShuttleIcon />, link: "#" },
    { text: "Live Chat", icon: <TextsmsIcon />, link: "#" },
  ],
};

export default function Header({ Component }) {

 

  const [openButton, setOpenButton] = useState(false);
 
  const anchorRef = useRef(null);

 
  




  



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setLoading(false);
        console.log(userData.username);
      } catch (err) {
        setError("Error fetching user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

 
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick_button_group = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout and close the menu
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    handleClose(); // Close the menu after logout
    // Add your logout logic here
  };



  const handleToggle = () => {
    setOpenButton((prevOpen) => !prevOpen);
  };

  const handleClosePopper = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenButton(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };













  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [dropDownStates, setDropDownStates] = useState({
    purchase: false,
    purchaseEntry: false,
    sale: false,
    warehouseInventory: false,
    account: false,
    other: false,
    setting: false,
  });
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (section) => {
    setDropDownStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmenuClick = (section, submenu) => {
    setDropDownStates((prev) => ({
      ...prev,
      [section]: !prev[section],
      [submenu]: !prev[submenu],
    }));
  };

  const handleLinkClick = (link) => {
    navigate(link);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    setDropDownStates((prev) => ({
      ...prev,
      purchase: path.includes("purchase") || prev.purchase,
      sale: path.includes("sale") || prev.sale,
      warehouseInventory: path.includes("warehouse") || prev.warehouseInventory,
      account:
        path.includes("profile") || path.includes("settings") || prev.account,
      setting: path.includes("settings") || prev.setting,
    }));
  }, [location.pathname]);

  const renderListItem = (icon, text, link, submenu) => (
    <>

      <ListItemButton
        onClick={() =>
          submenu
            ? handleSubmenuClick(
                text.toLowerCase(),
                `${text.toLowerCase()}Submenu`
              )
            : handleLinkClick(link)
        }
      

        sx={{
          textTransform: "none",
          justifyContent: "flex-center",
          width: "80%",
         
          borderRadius: 1,
       
          marginTop: 1,
          marginLeft: 2,
          fontSize: 2,
          paddingLeft: 1,
  
          bgcolor: "light",
          border: "1px solid lightGray",
          color: "black",
          fontWeight:'bold',
          "&:hover": {
            bgcolor: "#01799b",
            color: "white",
          },
        }}

     


      >
        <span className="ms-2 me-2" style={{ fontSize: "1px" }}>
          {icon}
        </span>

        <ListItemText primary={text} sx={{ fontFamily: "Trirong" }} />
        {submenu ? (
          dropDownStates[`${text.toLowerCase()}Submenu`] ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
        </ListItemButton>


      {submenu && (
        <Collapse in={dropDownStates[`${text.toLowerCase()}Submenu`]}>
          <List>
            {submenu.map(({ text: subText, icon: subIcon, link: subLink }) => (
              <ListItemButton
                key={subText}
                onClick={() => handleLinkClick(subLink)}

                sx={{
                  py: 1,
                  px: 4,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}

                // sx={{
                //   pl: 2,
                //   textTransform: "none",
                //   justifyContent: "flex-start",
                //   width: "100%",
                //   // bgcolor: "#0288d1",
                //   // color: "white",
                //   borderRadius: 1,
                //   // borderTopLeftRadius: 5,
                //   // borderBottomLeftRadius: 5,
                //   fontFamily: "Trirong",
                // }}



                // sx={{
                //   pl: 3,
                //   textTransform: "none",
                //   justifyContent: "flex-start",
                //   width: "100%",
                //   bgcolor: "#01579b",
                //   color: "white",
                //   borderRadius: 0,
                //   borderTopLeftRadius: 5,
                //   borderBottomLeftRadius: 5,
                //   "&:hover": {
                //     bgcolor: "#004d82",
                //   },
                // }}
              >


            <Button
                variant="contained"
               
               size="small"
              >
                 <span className="me-2">{subIcon}</span>
               <ListItemText primary={subText} />
            </Button>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );












  return (
    <div>
      <Box sx={{ display: "flex", background: "red" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar
            style={{ background: "#01579b", minHeight: "45px" }}
            className="pt-1"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" className="fw-bold">
              AKASH BANGELS
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
                size="small"
                className="mt-2"
              >
                <Button
                  onClick={handleClick_button_group}
                  style={{
                    width: "120px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={options[selectedIndex].flag}
                    alt={`${options[selectedIndex].label} flag`}
                    style={{ width: "20px", marginRight: "8px" }}
                  />
                  {options[selectedIndex].label}
                </Button>
                <Button
                  size="small"
                  aria-controls={openButton ? "split-button-menu" : undefined}
                  aria-expanded={openButton ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                  style={{ width: "25px", height: "30px" }}
                >
                  <KeyboardArrowDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{ zIndex: 1 }}
                open={openButton}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper className="w-100">
                      <ClickAwayListener onClickAway={handleClosePopper}>
                        <MenuList
                          id="split-button-menu"
                          autoFocusItem
                          className="w-100"
                        >
                          {options.map((option, index) => (
                            <MenuItem
                              key={option.label}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={option.flag}
                                alt={`${option.label} flag`}
                                style={{ width: "20px", marginRight: "8px" }}
                              />
                              {option.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

              <ClickAwayListener
                onClickAway={handleCloseMenu}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",

                    borderRadius: "8px",
                    padding: "5px 10px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={handleClick}
                >
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    style={{
                      padding: 0,
                      marginRight: "10px",
                    }}
                  >
                    <Avatar
                      alt="User Logo"
                      src={UserLogo}
                      style={{
                        background: "white",
                        width: 35,
                        height: 35,
                        border: "2px solid #007bff",
                      }}
                    />
                  </IconButton>

                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        fontSize: "12px",
                        color: "#FFFFFF",
                      }}
                    >
                      {userData.username}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#f1c40f",
                      }}
                    >
                      {userData.role}
                    </span>
                  </div>
                 <span className="ms-2">
                  <PowerSettingsNewIcon onClick={handleLogout}/>
                  </span>
                </div>
              </ClickAwayListener>
            </Box>
          </Toolbar>
        </AppBar>

        {/* <Drawer variant="permanent" open={open}>
          <DrawerHeader style={{ minHeight: "51px" }}>
            <img
              src={Logo}
              alt=""
              style={{ width: "130px", height: "25px", minHeight: "45px" }}
              className="mx-auto"
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List
            sx={{ width: "100%", maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className="fw-bold"
              >
                <span style={{ fontSize: "14px" }}>Master Data Management</span>
              </ListSubheader>
            }
          >
            <Button
              onClick={handleClick}
              sx={{
                pl: 3,
                textTransform: "none",
                justifyContent: "flex-start",
                width: "100%",
                bgcolor: "#01579b",
                color: "white",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                "&:hover": {
                  bgcolor: "#004d82",
                },
              }}
              startIcon={<InboxIcon />}
              className="fw-bold"
            >
              Menu Manage.
             
              <span style={{ marginLeft: "35px" }}>
                {dropDown ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>
            <Collapse in={dropDown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderListItem(
                  <GroupAddSharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "User Category",
                  "/user_category"
                )}
              </List>

              <List component="div" disablePadding>
                {renderListItem(
                  <GroupAddSharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Account Master",
                  "/account_master_detail"
                )}
              </List>
            </Collapse>
          </List>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className="fw-bold"
              >
                <span style={{ fontSize: "14px" }}>Inventory</span>
              </ListSubheader>
            }
          >
            <Button
              onClick={handleClick_inventory}
              sx={{
                pl: 3,
                textTransform: "none",
                justifyContent: "flex-start",
                width: "100%",
                bgcolor: "#01579b",
                color: "white",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                "&:hover": {
                  bgcolor: "#004d82",
                },
              }}
              startIcon={<InboxIcon />}
              className="fw-bold"
            >
              Item Master
              <span style={{ marginLeft: "55px" }}>
                {dropDown_inventory ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>

            <Collapse in={dropDown_inventory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderListItem(
                  <GroupAddSharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Item List",
                  "/item_master"
                )}
              </List>
              <List component="div" disablePadding>
                {renderListItem(
                  <CategorySharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Group",
                  "/add_group"
                )}
              </List>
              <List component="div" disablePadding>
                {renderListItem(
                  <CategorySharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Unit",
                  "/add_unit"
                )}
              </List>
              <List component="div" disablePadding>
                {renderListItem(
                  <CategorySharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Alternative Unit",
                  "/alt_unit"
                )}
              </List>
            </Collapse>
          </List>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className="fw-bold"
              ></ListSubheader>
            }
          >
            <Button
              onClick={handleClick_purchase}
              sx={{
                pl: 3,
                textTransform: "none",
                justifyContent: "flex-start",
                width: "100%",
                bgcolor: "#01579b",
                color: "white",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                "&:hover": {
                  bgcolor: "#004d82",
                },
              }}
              startIcon={<InboxIcon />}
              className="fw-bold"
            >
              Purchase Voucher
              <span style={{ marginLeft: "10px" }}>
                {dropDown_purchase ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>

            <Collapse in={dropDown_purchase} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderListItem(
                  <GroupAddSharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Purchase Voucher",
                  "/add_purchase_voucher"
                )}
              </List>
              <List component="div" disablePadding>
                {renderListItem(
                  <GroupAddSharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  " List",
                  "/purchase_voucher_list"
                )}
              </List>
            </Collapse>
          </List>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className="fw-bold"
              ></ListSubheader>
            }
          >
            <Button
              onClick={handleClick_purchase}
              sx={{
                pl: 3,
                textTransform: "none",
                justifyContent: "flex-start",
                width: "100%",
                bgcolor: "#01579b",
                color: "white",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                "&:hover": {
                  bgcolor: "#004d82",
                },
              }}
              startIcon={<InboxIcon />}
              className="fw-bold"
            >
              Cashier Manage.
              <span style={{ marginLeft: "19px" }}>
                {dropDown_purchase ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>

            <Collapse in={dropDown_purchase} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderListItem(
                  <GroupAddSharpIcon
                    style={{ color: "#ffb74d", opacity: "0.8" }}
                  />,
                  "Cash Detail",
                  "/cash_detail"
                )}
              </List>
            </Collapse>
          </List>
        </Drawer> */}


          <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img
              src={Logo}
              alt="Logo"
              // style={{ width: "150px", height: "30px" }}
               style={{ width: "150px", height: "25px", minHeight: "25px" }}
              className="mx-auto"
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {/* <Divider sx={{ marginTop: "60px" }} /> */}
          <Divider  />

          {/* <List style={{ background: "#e1f5fe", height: "500%" }}> */}
          <List style={{ height: "500%" }}>
            {Object.entries(menuItems).map(([section, items]) => (
              <React.Fragment key={section}>
                <Button
                  onClick={() => handleClick(section)}
                    variant="contained"
                color="primary"
                  sx={{
                    pl: 2,
                    textTransform: "none",
                    justifyContent: "flex-center",
                    width: "90%",
                    bgcolor: "#0288d1",
                    // color: "white",
                    borderRadius: 1,
                    // borderTopLeftRadius: 5,
                    // borderBottomLeftRadius: 5,
                    "&:hover": { bgcolor: "#0277bd" },
                    marginTop: 2,
                    marginLeft:1,
                    fontFamily: "Trirong ",
                  }}
                  // startIcon={<InboxIcon />}
                >
                  {section.charAt(0).toUpperCase() +
                    section.slice(1).replace(/([A-Z])/g, " $1")}
                  <span style={{ marginLeft: "auto" }}>
                    {dropDownStates[section] ? <ExpandLess /> : <ExpandMore />}
                  </span>
                </Button>
                <Collapse
                  in={dropDownStates[section]}
                 
                >
                  <List style={{ fontSize: "5px" }}>
                    {items.map(({ text, icon, link, submenu }) => (
                      <React.Fragment key={text}>
                        {renderListItem(icon, text, link, submenu)}
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}

            <span className="d-flex justify-content-center mt-3">
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate("/")}
                size="small"
              >
                Logout
              </Button>
            </span>
          </List>
          </Drawer>



        {Component && <Component />}
      </Box>
    </div>
  );
}

