

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import api from "../../../../../../services/api";

// Styled components for better design
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.grey[200],
}));

const SummaryBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const DetailModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Function to convert date to Indian Standard Time (IST) with only date
const convertToIST = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("en-GB", options); // Use "en-GB" for better date formatting
    const parts = formatter.formatToParts(date);
    // Construct the date string manually from the parts
    const formattedDate = `${parts.find(p => p.type === 'day').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'year').value}`;
    return formattedDate;
  } catch (error) {
    console.error("Invalid date format", error);
    return "N/A";
  }
};

const formatCurrency = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

const PaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [report, setReport] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsResponse, purchasesResponse] = await Promise.all([
          api.get("/api/payments"),
          api.get("/api/purchases"),
        ]);

        setPayments(paymentsResponse.data);
        setPurchases(purchasesResponse.data);

        generateReport(paymentsResponse.data, purchasesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const generateReport = (payments, purchases) => {
    const purchasesMap = purchases.reduce((acc, purchase) => {
      const company = purchase.companyName;
      const amount = parseFloat(purchase.totalAmount) || 0;
      if (!acc[company]) {
        acc[company] = { totalPurchaseAmount: 0, date: null, payments: [] };
      }
      acc[company].totalPurchaseAmount += amount;
      if (purchase.date) acc[company].date = purchase.date;
      return acc;
    }, {});

    const paymentsMap = payments.reduce((acc, payment) => {
      const company = payment.companyName;
      const amount = parseFloat(payment.amount) || 0;
      const paymentDate = payment.paymentDate;
      if (!acc[company]) {
        acc[company] = { totalPayments: 0, paymentDetails: [] };
      }
      acc[company].totalPayments += amount;
      if (paymentDate) acc[company].paymentDetails.push({ date: paymentDate, amount });
      return acc;
    }, {});

    const report = Object.keys(purchasesMap).map((company) => {
      const totalPurchaseAmount = purchasesMap[company].totalPurchaseAmount;
      const { totalPayments, paymentDetails } = paymentsMap[company] || {
        totalPayments: 0,
        paymentDetails: [],
      };
      const pendingAmount = totalPurchaseAmount - totalPayments;

      return {
        companyName: company,
        totalPurchaseAmount,
        totalPayments,
        pendingAmount,
        lastPaymentDate: paymentDetails.length > 0 ? convertToIST(paymentDetails[paymentDetails.length - 1].date) : "N/A",
        paymentDetails,
      };
    });

    const paymentOnlyCompanies = Object.keys(paymentsMap)
      .filter((company) => !purchasesMap[company])
      .map((company) => ({
        companyName: company,
        totalPurchaseAmount: 0,
        totalPayments: paymentsMap[company].totalPayments,
        pendingAmount: -paymentsMap[company].totalPayments,
        lastPaymentDate: paymentsMap[company].paymentDetails.length > 0
          ? convertToIST(paymentsMap[company].paymentDetails[paymentsMap[company].paymentDetails.length - 1].date)
          : "N/A",
        paymentDetails: paymentsMap[company].paymentDetails,
      }));

    setReport([...report, ...paymentOnlyCompanies]);
  };

  // Calculate totals
  const totalPurchaseAmount = report.reduce(
    (sum, row) => sum + row.totalPurchaseAmount,
    0
  );
  const totalPaymentsReceived = report.reduce(
    (sum, row) => sum + row.totalPayments,
    0
  );
  const totalPendingAmount = report.reduce(
    (sum, row) => sum + row.pendingAmount,
    0
  );

  const handleOpenModal = (details) => {
    setSelectedDetails(details);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDetails(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Report
      </Typography>

      <SummaryBox>
        <Typography variant="h6">Summary</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography>
          Total Purchase Amount: {formatCurrency(totalPurchaseAmount)}
        </Typography>
        <Typography>
          Total Payments Paid: {formatCurrency(totalPaymentsReceived)}
        </Typography>
        <Typography>
          Total Pending Amount: {formatCurrency(totalPendingAmount)}
        </Typography>
      </SummaryBox>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Total Purchase Amount</StyledTableCell>
              <StyledTableCell>Total Payments</StyledTableCell>
              <StyledTableCell>Pending Amount</StyledTableCell>
              <StyledTableCell>Last Payment Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell> {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {report.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center"> {/* Updated colSpan */}
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              report.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell>{formatCurrency(row.totalPurchaseAmount)}</TableCell>
                  <TableCell>{formatCurrency(row.totalPayments)}</TableCell>
                  <TableCell>{formatCurrency(row.pendingAmount)}</TableCell>
                  <TableCell>{row.lastPaymentDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenModal(row)}
                    >
                      View Details
                    </Button>
                  </TableCell> {/* New cell */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <DetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ padding: 3, width: 800, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Company Details
          </Typography>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedDetails && (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {selectedDetails.companyName}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Amount</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedDetails.paymentDetails.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No Payment Details Available
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedDetails.paymentDetails.map((detail, index) => (
                        <TableRow key={index}>
                          <TableCell>{convertToIST(detail.date)}</TableCell>
                          <TableCell>{formatCurrency(detail.amount)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Total Purchase Amount:</strong> {formatCurrency(selectedDetails.totalPurchaseAmount)}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Payments:</strong> {formatCurrency(selectedDetails.totalPayments)}
                </Typography>
                <Typography variant="body1">
                  <strong>Pending Amount:</strong> {formatCurrency(selectedDetails.pendingAmount)}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Payment Date:</strong> {selectedDetails.lastPaymentDate}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </DetailModal>

      <div className="mt-3">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add_payment_voucher")} // Navigate on button click
          sx={{ marginBottom: 2 }}
        >
          Add Payment Voucher
        </Button>
      </div>
    </Box>
  );
};

export default PaymentReport;
