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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import Logo from "../../assets/img/akash_bangels_logo.png";
import Logo from "../../../assets/img/akash_bangels_logo.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddSharpIcon from "@mui/icons-material/GroupAddSharp";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import axios from "axios";

// import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = ["English", "Hindi", "Chinise"];

const drawerWidth = 240;

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
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


export default function CashierHeader() {

    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [dropDown, setDropDown] = useState(true);
    const [dropDown_inventory, setDropDown_inventory] = useState(true);
    const [dropDown_purchase, setDropDown_purchase] = useState(true);
  
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
  
    const navigate = useNavigate();
  
    const handleLinkClick = (link) => {
      navigate(link);
    };
  
    const handleClick = () => {
      setDropDown((prev) => !prev);
    };
  
    const handleClick_inventory = () => {
      setDropDown_inventory((prev) => !prev);
    };
  
    const handleClick_purchase = () => {
      setDropDown_purchase((prev) => !prev);
    };
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:5000/api/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
  
    const renderListItem = (icon, text, link) => (
      <Button
        onClick={() => handleLinkClick(link)}
        sx={{
          textTransform: "none",
          justifyContent: "flex-start",
          width: "75%",
          borderRadius: 1,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          marginTop: 1,
          marginLeft: 2,
          fontSize: 13,
          paddingLeft: 3,
          // bgcolor: "#01799b",
          // bgcolor:'#b3e5fc',
          bgcolor: "light",
          border: "1px solid lightGray",
          color: "black",
          "&:hover": {
            bgcolor: "#01799b",
            color: "white",
          },
        }}
        startIcon={icon}
        className="fw-bold"
      >
        <span className="mx-left">{text}</span>
      </Button>
    );
  
    ///// button group start
  
    const [openButton, setOpenButtton] = useState(true);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
  
    const handleClick_button_group = () => {
      console.info(`You clicked ${options[selectedIndex]}`);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };
  
    const handleToggle = () => {
      setOpenButtton((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpenButtton(false);
    };

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
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" className="fw-bold">
              AKASH roop
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
 

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle  />
               
              </IconButton>
              <div style={{ marginLeft: "5px" }} className="d-block p-0 ms-2" >
                <span style={{ display: "block",padding:'0px' }} className="pb-0 p-0" >
                {userData.username} 
                </span>
                <span style={{ display: "block" ,padding:'0px' }} className="mt-0 pt-0 text-center text-warning">
                {userData.role}
                </span>
                </div>
               
           
             
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
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
              >
            
              </ListSubheader>
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
                  "/purchase_voucher_list"
                )}
              </List>
             
            </Collapse>
          </List>


         


        </Drawer>

        {/* {Component && <Component />} */}
      </Box>
    </div>
  )
}
