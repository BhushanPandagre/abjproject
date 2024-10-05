import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../schema/Header";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import api from "../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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

export default function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    printname: "",
    itemType: "",
    group: "",
    description: "",
    unit: "",
    alternativeunit: "",
    conversionType: "",
    conversionFactor: "",
    quantity: "",
    retailerPrice: "",
    semiWholesellerPrice: "",
    wholesellerPrice: "",
    minSalePrice: "",
    gst: null,
    HSNCode: "",
    images: [],
  });

  const [nameError, setNameError] = useState("");
  const [groups, setGroups] = useState([]);
  const [units, setUnits] = useState([]);
  const [alternativeUnits, setAlternativeUnits] = useState([]);
  const [gsts, setGsts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          itemResponse,
          groupsResponse,
          unitsResponse,
          alternativeUnitsResponse,
          gstsResponse,
        ] = await Promise.all([
          api.get(`/api/jewelry-items/${id}`),
          api.get("/api/groups"),
          api.get("/api/units"),
          api.get("/api/alternative-units"),
          api.get("/api/gsts"),
        ]);

        const itemData = itemResponse.data;

        setFormData({
          name: itemData.name || "",
          printname: itemData.printname || "",
          itemType: itemData.itemType || "",
          group: itemData.group ? itemData.group._id : "",
          description: itemData.description || "",
          unit: itemData.unit ? itemData.unit._id : "",
          alternativeunit: itemData.alternativeunit || "",
          conversionType: itemData.conversionType || "",
          conversionFactor: itemData.conversionFactor || "",
          quantity: itemData.quantity || "",
          retailerPrice: itemData.retailerPrice || "",
          semiWholesellerPrice: itemData.semiWholesellerPrice || "",
          wholesellerPrice: itemData.wholesellerPrice || "",
          minSalePrice: itemData.minSalePrice || "",
          gst: itemData.gst || null,
          HSNCode: itemData.HSNCode || "",
        });

        setGroups(groupsResponse.data);
        setUnits(unitsResponse.data);
        setAlternativeUnits(alternativeUnitsResponse.data);
        setGsts(gstsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Update the conversionType whenever the unit or alternative unit changes
  useEffect(() => {
    const selectedUnit = units.find((unit) => unit._id === formData.unit);
    const selectedAltUnit = alternativeUnits.find(
      (altUnit) => altUnit.name === formData.alternativeunit
    );

    if (selectedUnit && selectedAltUnit) {
      setFormData((prevState) => ({
        ...prevState,
        conversionType: `${selectedAltUnit.name} / ${selectedUnit.name}`,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        conversionType: "",
      }));
    }
  }, [formData.unit, formData.alternativeunit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const upperCaseValue = value.toUpperCase();
    setFormData((prevState) => ({
      ...prevState,
      [name]: upperCaseValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (key === "gst" && formData[key]) {
        formDataToSubmit.append(key, formData[key]._id);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {
      await api.put(`/api/jewelry-items/${id}`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Jewelry item updated successfully!");
      navigate("/item_master");
    } catch (error) {
      console.error(
        "Error updating jewelry item:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error updating jewelry item: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
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
                      <div className="col-xl-6 d-flex justify-content-end">
                        <h6 className="fw-bold text-center"> Update Item</h6>
                      </div>
                      <div className="col-xl-6 d-flex justify-content-end mb-1">
                        <Button
                          onClick={() => {
                            navigate("/item_master");
                          }}
                          color="primary"
                          variant="contained"
                          size="small"
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-xl-12">
                    <Box component="form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div
                          className="col-xl-12 mx-auto"
                          style={{
                            border: "1px solid gray",
                            borderRadius: "8px",
                          }}
                        >
                          <div className="row">
                            <div className="row mt-2 mb-0">
                              <div className="col-xl-12">
                                <h6
                                  className="fw-bold"
                                  style={{ color: "rgb(1, 87, 155" }}
                                >
                                  Item Name
                                </h6>
                              </div>
                            </div>

                            <div className="col-xl-6">
                              <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!nameError}
                                helperText={nameError}
                                fullWidth
                                size="small"
                                InputProps={{
                                  style: {
                                    fontSize: "0.875rem",
                                  },
                                }}
                                InputLabelProps={{
                                  style: { fontSize: "0.875rem" },
                                }}
                              />
                            </div>

                            <div className="col-xl-6">
                              <TextField
                                label="Print Name"
                                name="printname"
                                value={formData.printname}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                InputProps={{
                                  style: {
                                    fontSize: "0.875rem",
                                  },
                                }}
                                InputLabelProps={{
                                  style: { fontSize: "0.875rem" },
                                }}
                              />
                            </div>

                            <div className="col-xl-3">
                              <TextField
                                label="Hindi Name"
                                name="itemType"
                                value={formData.itemType}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                margin="normal"
                                InputProps={{
                                  style: {
                                    fontSize: "0.875rem",
                                  },
                                }}
                                InputLabelProps={{
                                  style: { fontSize: "0.875rem" },
                                }}
                              />
                            </div>

                            <div className="col-xl-3">
                              <FormControl fullWidth>
                                <Autocomplete
                                  size="small"
                                  options={groups}
                                  getOptionLabel={(option) => option.name}
                                  value={
                                    groups.find(
                                      (group) => group._id === formData.group
                                    ) || null
                                  }
                                  onChange={(e, value) =>
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      group: value ? value._id : "",
                                    }))
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Item Type"
                                      margin="normal"
                                    />
                                  )}
                                />
                              </FormControl>
                            </div>

                            <div className="row mt-2 mb-0">
                              <div className="col-xl-12">
                                <h6
                                  className="fw-bold"
                                  style={{ color: "rgb(1, 87, 155" }}
                                >
                                  Unit
                                </h6>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-3 ">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={units}
                                    getOptionLabel={(option) => option.name}
                                    value={
                                      units.find(
                                        (unit) => unit._id === formData.unit
                                      ) || null
                                    }
                                    onChange={(e, value) =>
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        unit: value ? value._id : "",
                                      }))
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Unit"
                                        size="small"
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div>

                              <div className="col-xl-3 ">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={alternativeUnits}
                                    getOptionLabel={(option) => option.name}
                                    value={
                                      alternativeUnits.find(
                                        (alternativeunit) =>
                                          alternativeunit.name ===
                                          formData.alternativeunit
                                      ) || null
                                    }
                                    onChange={(e, value) =>
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        alternativeunit: value
                                          ? value.name
                                          : "",
                                      }))
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Alternative Unit"
                                        size="small"
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div>

                              <div className="col-xl-3">
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  margin="normal"
                                >
                                  <FormControl fullWidth>
                                    <Autocomplete
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="packaging Unit"
                                          size="small"
                                        />
                                      )}
                                    />
                                  </FormControl>
                                </Box>
                              </div>

                              <div className="col-xl-3 ">
                                <TextField
                                  label="Conversion Type"
                                  name="conversionType"
                                  value={formData.conversionType}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem", // Reduce the font size
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" }, // Reduce label font size
                                  }}
                                />
                              </div>

                              <div className="col-xl-3 ">
                                <TextField
                                  label="Conversion Factor"
                                  name="conversionFactor"
                                  value={formData.conversionFactor}
                                  onChange={handleChange}
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem", // Reduce the font size
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" }, // Reduce label font size
                                  }}
                                />
                              </div>

                              <div className="col-xl-12">
                                {/* New Box Displaying Conversion Information */}

                                <div className="col-xl-12 mt-3">
                                  <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    border={1}
                                    borderColor="grey.400"
                                    borderRadius={1}
                                    padding={2}
                                    bgcolor="background.paper"
                                    label="Main & Alt Unit"
                                    InputLabelProps={{ shrink: true }}
                                  >
                                    <Typography variant="body1"></Typography>
                                  </Box>
                                </div>
                              </div>
                            </div>

                            <div className="row mt-2 mb-0">
                              <div className="col-xl-12">
                                <h6
                                  className="fw-bold"
                                  style={{ color: "rgb(1, 87, 155" }}
                                >
                                  Pricing Main Unit
                                </h6>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xl-3 ">
                                <TextField
                                  label="B Price"
                                  name="semiWholesellerPrice"
                                  type="number"
                                  value={formData.semiWholesellerPrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                              <div className="col-xl-3 ">
                                <TextField
                                  label="A"
                                  name="wholesellerPrice"
                                  type="number"
                                  value={formData.wholesellerPrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                              <div className="col-xl-3 ">
                                <TextField
                                  label="R Price"
                                  name="retailerPrice"
                                  type="number"
                                  value={formData.retailerPrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                              <div className="col-xl-3 ">
                                <TextField
                                  label="Min Sale Price"
                                  name="MinSalePrice"
                                  type="number"
                                  value={formData.minSalePrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                            </div>

                            <div className="row mt-2 mb-0">
                              <div className="col-xl-12">
                                <h6
                                  className="fw-bold"
                                  style={{ color: "rgb(1, 87, 155" }}
                                >
                                  Alt Main Unit
                                </h6>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xl-3 ">
                                <TextField
                                  label="B Price"
                                  name="semiWholesellerPrice"
                                  type="number"
                                  value={formData.semiWholesellerPrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                              <div className="col-xl-3 ">
                                <TextField
                                  label="A"
                                  name="wholesellerPrice"
                                  type="number"
                                  value={formData.wholesellerPrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                              <div className="col-xl-3 ">
                                <TextField
                                  label="R Price"
                                  name="retailerPrice"
                                  type="number"
                                  value={formData.retailerPrice}
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xl-12">
                                <div>
                                  {/* Checkbox to toggle visibility */}
                                  <div className="col-xl-3">
                                    <FormControlLabel
                                      control={<Checkbox color="primary" />}
                                      label="Add Opening Stock"
                                    />
                                  </div>

                                  <>
                                    <div className="row d-flex">
                                      <div className="col-xl-3">
                                        <TextField
                                          label="Opening Stock"
                                          name="openingStock"
                                          value={formData.openingStock}
                                          onChange={handleChange}
                                          fullWidth
                                          size="small"
                                          type="number"
                                          margin="normal"
                                          InputProps={{
                                            style: {
                                              fontSize: "0.875rem",
                                            },
                                          }}
                                          InputLabelProps={{
                                            shrink: "true",
                                            style: { fontSize: "0.875rem" },
                                          }}
                                        />
                                      </div>

                                      <div className="col-xl-3">
                                        <TextField
                                          label="Alt Unit Opening Stock"
                                          name="altOpeningStock"
                                          fullWidth
                                          size="small"
                                          type="number"
                                          margin="normal"
                                          InputProps={{
                                            style: {
                                              fontSize: "0.875rem",
                                            },
                                          }}
                                          InputLabelProps={{
                                            shrink: "true",
                                            style: { fontSize: "0.875rem" },
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </>
                                  {/* )} */}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xl-3 ">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={gsts}
                                    getOptionLabel={(option) =>
                                      `${option.name} (${option.rate}%)`
                                    }
                                    value={
                                      gsts.find(
                                        (gst) => gst._id === formData.gst?._id
                                      ) || null
                                    }
                                    onChange={(e, value) =>
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        gst: value || null,
                                      }))
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="GST"
                                        margin="normal"
                                        size="small"
                                      />
                                    )}
                                  />
                                </FormControl>
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
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    shrink: "true",
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-xl-3 d-flex justify-content-center mx-auto mt-3 mb-3">
                              <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                className=" fw-bold"
                              >
                                Update Item
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
