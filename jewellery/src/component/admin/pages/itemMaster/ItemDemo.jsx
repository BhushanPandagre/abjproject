
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Autocomplete,
  IconButton,
  Tooltip,
  CssBaseline,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { VisuallyHiddenInput } from "./VisuallyHiddenInput"; // Import or define this component
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "../../../schema/Header";
// import Header from "./Header"; // Import or define this component
// import DrawerHeader from "./DrawerHeader"; // Import or define this component
import { styled, useTheme } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
export default function ItemDemo() {

    const [formData, setFormData] = useState({
        name: "",
        printname: "",
        barcode: "",
        group: "",
        unit: "",
        alternativeunit: "",
        conversionFactor: "",
        retailerPrice: "",
        semiWholesellerPrice: "",
        wholesellerPrice: "",
        quantity: "",
        gst: "",
        HSNCode: "",
        description: "",
      });
    
      const [groups, setGroups] = useState([]); // Define your groups state
      const [units, setUnits] = useState([]); // Define your units state
      const [alternativeUnits, setAlternativeUnits] = useState([]); // Define your alternative units state
      const [gsts, setGsts] = useState([]); // Define your GSTs state
    
      const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
      const [isAlternativeUnitDialogOpen, setIsAlternativeUnitDialogOpen] = useState(false);
      const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
      const [isGstDialogOpen, setIsGstDialogOpen] = useState(false);
    
      const [newUnit, setNewUnit] = useState("");
      const [newAlternativeUnit, setNewAlternativeUnit] = useState("");
      const [newGroup, setNewGroup] = useState("");
      const [newGst, setNewGst] = useState("");
      const [newGstRate, setNewGstRate] = useState("");
    
      const firstFieldRef = useRef(null);
    
      useEffect(() => {
        if (firstFieldRef.current) {
          firstFieldRef.current.focus();
        }
      }, []);
    
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submission
          const formElements = Array.from(e.currentTarget.form.elements);
          const currentIndex = formElements.indexOf(e.currentTarget);
          const nextElement = formElements[currentIndex + 1];
    
          if (nextElement) {
            if (nextElement.tagName === "INPUT") {
              nextElement.focus();
            } else if (nextElement.tagName === "BUTTON" && nextElement.type === "submit") {
              nextElement.click();
            } else if (nextElement.tagName === "DIV" && nextElement.className.includes("MuiAutocomplete-root")) {
              nextElement.querySelector("input").focus(); // Focus on the input within the Autocomplete
            } else {
              nextElement.focus();
            }
          }
        }
      };


    // const handleKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //       e.preventDefault(); // Prevent default Enter key behavior
    //       const form = e.currentTarget.form;
    //       const formElements = Array.from(form.elements);
    //       const index = formElements.indexOf(e.currentTarget);
    //       const nextElement = formElements[index + 1];
      
    //       // If there's a next element, focus it
    //       if (nextElement) {
    //         nextElement.focus();
    //       }
    //     }
    //   };
      
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
      };
    
      const generateBarcode = () => {
        // Generate barcode logic
      };
    
      const handleGroupDialogOpen = () => setIsGroupDialogOpen(true);
      const handleGroupDialogClose = () => setIsGroupDialogOpen(false);
      const handleUnitDialogOpen = () => setIsUnitDialogOpen(true);
      const handleUnitDialogClose = () => setIsUnitDialogOpen(false);
      const handleAlternativeUnitDialogOpen = () => setIsAlternativeUnitDialogOpen(true);
      const handleAlternativeUnitDialogClose = () => setIsAlternativeUnitDialogOpen(false);
      const handleGstDialogOpen = () => setIsGstDialogOpen(true);
      const handleGstDialogClose = () => setIsGstDialogOpen(false);
    
    


  return (
    <div>

<Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <h4 className="fw-bold">Add Item</h4>
              <Box component="form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-3">
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      inputRef={firstFieldRef}
                      onKeyDown={handleKeyDown}
                      required
                    />
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Print Name"
                      name="printname"
                      value={formData.printname}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                      required
                    />
                  </div>

                  <div className="col-xl-3">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={generateBarcode}
                      fullWidth
                      margin="normal"
                      className="mt-3 fw-bold"
                      style={{ background: "#b3e5fc" }}
                      onKeyDown={handleKeyDown}
                    >
                      Generate Barcode
                    </Button>
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Barcode"
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      disabled
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <Box display="flex" alignItems="center">
                      <FormControl fullWidth>
                        <Autocomplete
                          options={groups.map((group) => group.name)}
                          value={formData.group}
                          onChange={(event, newValue) => {
                            setFormData({ ...formData, group: newValue });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Group"
                              margin="normal"
                              size="small"
                              onKeyDown={handleKeyDown}
                            />
                          )}
                        />
                      </FormControl>

                      <Tooltip title="Add Group" placement="top-start">
                        <IconButton
                          onClick={handleGroupDialogOpen}
                          sx={{ ml: 1 }}
                          style={{
                            background: "#ffe0b2",
                            width: "30px",
                            height: "30px",
                          }}
                          className="mt-2"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </div>

                  <div className="col-xl-3">
                    <Box display="flex" alignItems="center" margin="normal">
                      <FormControl fullWidth>
                        <Autocomplete
                          options={units.map((unit) => unit.name)}
                          value={formData.unit}
                          onChange={(e, newValue) => {
                            const selectedUnit = units.find(
                              (unit) => unit.name === newValue
                            );
                            setFormData((prevState) => ({
                              ...prevState,
                              unit: newValue,
                              unitId: selectedUnit?._id,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Unit"
                              fullWidth
                              size="small"
                              onKeyDown={handleKeyDown}
                            />
                          )}
                        />
                      </FormControl>

                      <Tooltip title="Add Unit" placement="top-start">
                        <IconButton
                          onClick={handleUnitDialogOpen}
                          sx={{ ml: 1 }}
                          style={{
                            background: "#ffe0b2",
                            width: "30px",
                            height: "30px",
                          }}
                          className="mt-2"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </div>

                  <div className="col-xl-3">
                    <Box display="flex" alignItems="center" margin="normal">
                      <FormControl fullWidth>
                        <Autocomplete
                          options={alternativeUnits.map((altUnit) => altUnit.name)}
                          value={formData.alternativeunit}
                          onChange={(event, newValue) => {
                            setFormData({
                              ...formData,
                              alternativeunit: newValue,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Alternative Unit"
                              size="small"
                              onKeyDown={handleKeyDown}
                            />
                          )}
                        />
                      </FormControl>

                      <Tooltip title="Add Alternative Unit" placement="top-start">
                        <IconButton
                          onClick={handleAlternativeUnitDialogOpen}
                          sx={{ ml: 1 }}
                          style={{
                            background: "#ffe0b2",
                            width: "30px",
                            height: "30px",
                          }}
                          className="mt-2"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Conversion Factor"
                      name="conversionFactor"
                      value={formData.conversionFactor}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Retailer Price"
                      name="retailerPrice"
                      value={formData.retailerPrice}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Semi Wholeseller Price"
                      name="semiWholesellerPrice"
                      value={formData.semiWholesellerPrice}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Wholeseller Price"
                      name="wholesellerPrice"
                      value={formData.wholesellerPrice}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <Box display="flex" alignItems="center" margin="normal">
                      <FormControl fullWidth>
                        <Autocomplete
                          options={gsts.map((gst) => gst.name)}
                          value={formData.gst}
                          onChange={(e, newValue) => {
                            const selectedGst = gsts.find((gst) => gst.name === newValue);
                            setFormData((prevState) => ({
                              ...prevState,
                              gst: newValue,
                              gstId: selectedGst?._id,
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="GST"
                              size="small"
                              onKeyDown={handleKeyDown}
                            />
                          )}
                        />
                      </FormControl>

                      <Tooltip title="Add GST" placement="top-start">
                        <IconButton
                          onClick={handleGstDialogOpen}
                          sx={{ ml: 1 }}
                          style={{
                            background: "#ffe0b2",
                            width: "30px",
                            height: "30px",
                          }}
                          className="mt-2"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="HSN Code"
                      name="HSNCode"
                      value={formData.HSNCode}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-3">
                    <TextField
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      size="small"
                      multiline
                      rows={4}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="col-xl-12">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      sx={{ mt: 2 }}
                      onKeyDown={handleKeyDown}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Box>

      {/* Dialogs for adding new options */}
      <Dialog open={isUnitDialogOpen} onClose={handleUnitDialogClose}>
        <DialogTitle>Add New Unit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Unit Name"
            type="text"
            fullWidth
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnitDialogClose}>Cancel</Button>
          <Button onClick={() => {
            // Handle unit addition logic here
            handleUnitDialogClose();
          }}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAlternativeUnitDialogOpen} onClose={handleAlternativeUnitDialogClose}>
        <DialogTitle>Add New Alternative Unit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Alternative Unit Name"
            type="text"
            fullWidth
            value={newAlternativeUnit}
            onChange={(e) => setNewAlternativeUnit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlternativeUnitDialogClose}>Cancel</Button>
          <Button onClick={() => {
            // Handle alternative unit addition logic here
            handleAlternativeUnitDialogClose();
          }}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isGroupDialogOpen} onClose={handleGroupDialogClose}>
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGroupDialogClose}>Cancel</Button>
          <Button onClick={() => {
            // Handle group addition logic here
            handleGroupDialogClose();
          }}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isGstDialogOpen} onClose={handleGstDialogClose}>
        <DialogTitle>Add New GST</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="GST Name"
            type="text"
            fullWidth
            value={newGst}
            onChange={(e) => setNewGst(e.target.value)}
          />
          <TextField
            margin="dense"
            label="GST Rate"
            type="text"
            fullWidth
            value={newGstRate}
            onChange={(e) => setNewGstRate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGstDialogClose}>Cancel</Button>
          <Button onClick={() => {
            // Handle GST addition logic here
            handleGstDialogClose();
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
      <ToastContainer />
      
    </div>
  )
}
