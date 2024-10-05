const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jewelryRoutes = require("./routes/jewelryRoutes");

// const purchaseRoutes = require('./routes/purchases');
const purchaseRoutes = require("./routes/purchases");

const path = require("path");
const groupRoutes = require("./routes/groupRoutes");
const bcrypt = require("bcryptjs");
// const { authenticateToken } = require("./middleware/authMiddleware");
const { authenticateToken } = require("./middleware/authMiddleware");
const accountRoutes = require("./routes/accountRoutes");

const unitRoutes = require("./routes/unitRoutes");

// const categoryRoutes = require('./routes/categoryRoutes');

const alternativeUnitRoutes = require("./routes/alternativeUnitRoutes");

const packagingUnitRoutes = require("./routes/packagingUnitRoutes");
const gstsRouter = require("./routes/gsts");
const customRoleRoutes = require("./routes/customRole.routes");

const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const cashFlowRoutes = require("./routes/cashFlowRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const dataRoutes = require("./routes/dataRoutes");

const areaRoutes = require("./routes/areaRoutes");

const salutationRoutes = require("./routes/salutationRoutes");

const paymentRoutes = require("./routes/paymentRoutes");
const receiptRoutes = require("./routes/receiptRoutes"); // Adjust the path if necessary
const stockEntryRoutes = require("./routes/stockEntryRoutes");

const packagingRoutes = require('./routes/packagingRoutes');

const saleVoucherRoutes = require("./routes/saleVoucherRoutes");


// const voucherRoutes = require('./routes/voucherRoutes'); 

const app = express();

// Middleware
app.use(bodyParser.json());
// app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(groupRoutes);

app.use("/api/accounts", accountRoutes);

app.use("/api/suppliers", require("./routes/supplierRoutes"));

// Use data routes
app.use("/api/data", dataRoutes);
// Use routes
app.use("/api/areas", areaRoutes);

// Use routes
app.use("/api", salutationRoutes); // Prefix API routes with `/api`

app.use("/api/customRoles", customRoleRoutes);
// Routes
app.use("/api/auth", authRoutes);
// app.use('/api/users', userRoutes);


// app.use('/api/vouchers', voucherRoutes);

// for jewellry
app.use("/api", jewelryRoutes);
app.use("/api", groupRoutes);
app.use("/api/units", unitRoutes);
// app.use('/api', categoryRoutes);
app.use("/api/alternative-units", alternativeUnitRoutes);
app.use("/api/packaging-units", packagingUnitRoutes);
app.use("/api/gsts", gstsRouter);

app.use("/api", purchaseRoutes);

//Routes
app.use("/api/employees", employeeRoutes);
app.use("/departments", departmentRoutes);
app.use("/api/cashflow", cashFlowRoutes);

// for payment
app.use("/api", paymentRoutes);
app.use("/api", receiptRoutes);
// Use the routes
app.use("/api", stockEntryRoutes);

// for sale
app.use("/api", saleVoucherRoutes);

app.use('/api', packagingRoutes);

app.get("/user_category", authenticateToken, (req, res) => {
  res.json(req.user); // req.user is set by authenticateToken middleware
});

// MongoDB Connection
mongoose
  // .connect("mongodb+srv://softwaresolution753:KxFVIZA8bxOtIyCc@cluster0.c5cvm.mongodb.net/", {
  .connect("mongodb://127.0.0.1:27017/akash_bangle", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

// Server

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
