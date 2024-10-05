import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserLogo from "../../../../../assets/img/download.jfif";
import { Divider, Box, Grid, Avatar } from "@mui/material";
// import api from "../../../../../services/api";

const InvoicePage = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const [supplierInfo, setSupplierInfo] = useState({});

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        // Fetch purchase details
        const response = await axios.get(
          `http://localhost:5000/api/purchases/${id}`
        );
        setPurchase(response.data);

        // Fetch supplier information based on company name
        const companyName = response.data.companyName;
        if (companyName) {
          // Fetch all suppliers and filter by company name
          const supplierResponse = await axios.get(
            `http://localhost:5000/api/suppliers`
          );
          const suppliers = supplierResponse.data;
          const matchedSupplier = suppliers.find(
            (supplier) => supplier.partyName === companyName
          );

          if (matchedSupplier) {
            setSupplierInfo(matchedSupplier);
          } else {
            console.error(
              "No supplier found with the company name:",
              companyName
            );
          }
        }

        // Fetch item details
        const items = response.data.itemsList;
        if (items && items.length > 0) {
          const itemIds = items
            .filter((item) => item.item !== null) // Ensure item is not null
            .map((item) => item.item._id);
          const itemResponses = await Promise.all(
            itemIds.map((itemId) =>
              axios.get(`http://localhost:5000/api/jewelry-items/${itemId}`)
            )
          );
          const itemsData = itemResponses.reduce((acc, response) => {
            acc[response.data._id] = response.data;
            return acc;
          }, {});
          setItemDetails(itemsData);
        }
      } catch (error) {
        console.error("Error fetching purchase details:", error);
      }
    };

    fetchPurchaseDetails();
  }, [id]);

  // Updated function to calculate total amount
  const calculateTotalAmount = () => {
    if (!purchase) return 0;
    const { totalItemAmount = 0, billSundryAmount = 0 } = purchase;
    return totalItemAmount + billSundryAmount;
  };

  const downloadInvoice = () => {
    const input = document.getElementById("invoice-content");

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.setFontSize(12);
      pdf.text(`Supplier: ${purchase.supplierName}`, 14, 20);
      pdf.text(
        `Date: ${new Date(purchase.purchaseDate).toLocaleDateString()}`,
        14,
        30
      );
      pdf.text(
        `Invoice Date: ${new Date(purchase.invoiceDate).toLocaleDateString()}`,
        14,
        30
      );

      pdf.text(`Supplier Voucher No: ${purchase.supplierVoucherNo}`, 14, 40);
      pdf.text(`Purchase Voucher No: ${purchase.purchaseVoucherNo}`, 14, 40);

      // Supplier details
      pdf.text(`Company: ${supplierInfo.partyName || "N/A"}`, 14, 50);
      pdf.text(
        `Address: ${formatAddress(supplierInfo.address) || "N/A"}`,
        14,
        60
      );
      pdf.text(`Pin Code: ${supplierInfo.address?.pinCode || "N/A"}`, 14, 70);
      pdf.text(`State: ${supplierInfo.state || "N/A"}`, 14, 80);
      pdf.text(
        `Mobile: ${supplierInfo.contactNumbers?.[0]?.number || "N/A"}`,
        14,
        100
      );

      // Add invoice content
      pdf.addImage(imgData, "PNG", 10, 110, imgWidth - 20, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          10,
          heightLeft - imgHeight,
          imgWidth - 20,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Add total amount to the PDF
      pdf.text(
        `Total Amount: ${calculateTotalAmount().toFixed(2)}`,
        14,
        heightLeft - 20
      );

      pdf.save("invoice.pdf");
    });
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const {
      streetName,
      houseNumber,
      landmark,
      crossRoad,
      locality,
      relatedLocation,
      otherInstructions,
    } = address;
    return [
      streetName,
      houseNumber,
      landmark,
      crossRoad,
      locality,
      relatedLocation,
      otherInstructions,
    ]
      .filter(Boolean)
      .join(", ");
  };

  if (!purchase) return <Typography>Loading...</Typography>;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <>
      <Box sx={{ padding: 4, maxWidth: "800px", margin: "auto" }}>
        <Paper
          sx={{
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
            border: "2px dotted #1976d2",
            minHeight: "600px", // Increased height
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                variant="square"
                src={UserLogo}
                alt="Company Logo"
                sx={{ width: 80, height: 80, marginRight: 2 }}
              />
              <Typography
                variant="h5"
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                Aakash Bangels
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                {/* Date: {new Date(purchase.date).toLocaleDateString()} */}
                Purchase Date:{" "}
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                {/* Date: {new Date(purchase.date).toLocaleDateString()} */}
                Invoice Date:{" "}
                {new Date(purchase.invoiceDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Supplier Voucher No: {purchase.supplierVoucherNo}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Purchase Voucher No: {purchase.purchaseVoucherNo}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2, backgroundColor: "#1976d2" }} />

          <Grid container spacing={2} sx={{ marginBottom: 6 }}>
            {" "}
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Company: {supplierInfo.partyName || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Address: {formatAddress(supplierInfo.address) || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Pin Code: {supplierInfo.address?.pinCode || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                State: {supplierInfo.state || "N/A"}
              </Typography>

              <Typography variant="body1" sx={{ color: "#555" }}>
                Mobile: {supplierInfo.contactNumbers?.[0]?.number || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Item
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    Unit
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {purchase.itemsList.map((item, index) => ( */}
                {purchase.itemsList.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{item.item.name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      {itemDetails[item.item?._id]?.unit
                        ? itemDetails[item.item._id].unit.name
                        : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.price)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.quantity * item.price)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ border: "none" }}>
                    <Typography sx={{ color: "gray" }}>
                      Packing Charges:
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ color: "gray" }}>
                      {(purchase.packingCharges || 0).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ marginBottom: "0px" }}>
                  <TableCell colSpan={4} align="right" sx={{ border: "none" }}>
                    <Typography sx={{ color: "gray" }}>GST %:</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: "none", marginBottom: "0px" }}
                  >
                    <Typography sx={{ color: "gray" }}>
                      {(purchase.gstExpenses || 0).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ marginBottom: "0px" }}>
                  <TableCell colSpan={4} align="right" sx={{ border: "none" }}>
                    <Typography sx={{ color: "gray" }}>
                      Other Expenses:
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ color: "gray" }}>
                      {(purchase.otherExpenses || 0).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Typography sx={{ color: "gray" }}>
                      Bill Sundry Amount:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: "gray" }}>
                      {(purchase.billSundryAmount || 0).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Typography
                      variant="h6"
                      sx={{ color: "#1976d2", fontWeight: "bold" }}
                    >
                      Grand Total:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="h6"
                      sx={{ color: "#333", fontWeight: "bold" }}
                    >
                      {calculateTotalAmount().toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default InvoicePage;
