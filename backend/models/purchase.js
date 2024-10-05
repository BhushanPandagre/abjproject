//------------------------------Old one ---------------------//

// const mongoose = require('mongoose');

// const purchaseSchema = new mongoose.Schema({
//   supplierName: { type: String },
//   companyName: { type: String },
//   invoiceDate: { type: Date, default: Date.now },
//   purchaseDate: { type: Date, default: Date.now },
//   supplierVoucherNo: { type: String },
//   purchaseVoucherNo: { type: String },
//   itemsList: [
//     {
//       item: { type: mongoose.Schema.Types.ObjectId, ref: 'JewelryItem' , default: null},
//       // quantity: {
//       //   type: Number,
//       //   required: function() {
//       //     return this.item && this.item.length > 0; // Only required if item is provided
//       //   }
//       // },
//       quantity: {
//         type: Number,
//         default: 0
//       },
//       unit: { type: String },
//       price: { type: Number },
//       amount: { type: Number }
//     }
//   ],
//   packingCharges: { type: Number, default: 0 },
//   gstExpenses: { type: Number, default: 0 },
//   otherExpenses: { type: Number, default: 0 },
//   totalItemAmount: { type: Number, default: 0 },
//   billSundryAmount: { type: Number, default: 0 },
//   totalAmount: { type: Number, default: 0 },
//   accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
//   transportDetails: {
//     transportName: { type: String },
//     vehicleNo: { type: String },
//     date: { type: Date, default: Date.now },
//     stationFrom: { type: String },
//     stationTo: { type: String }
//   }
// });

// const Purchase = mongoose.model('Purchase', purchaseSchema);

// module.exports = Purchase;

//----------------------------New one --------------------------------//

//======================== Original one ============================//

// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   supplierName: { type: String },
//   companyName: { type: String },
//   invoiceDate: { type: Date, default: Date.now },
//   purchaseDate: { type: Date, default: Date.now },
//   supplierVoucherNo: { type: String },
//   purchaseVoucherNo: { type: String },

//   itemsList: [
//     {
//       item: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "JewelryItem",
//         default: null,
//       },

//       quantity: {
//         type: Number,
//         default: 0,
//       },
//       unit: { type: String },
//       alternativeunit: { type: String },
//       price: { type: Number },
//       amount: { type: Number },
//       // serialNumber:{type:Number}
//     },
//   ],
//   packingCharges: { type: Number, default: 0 },
//   gstExpenses: { type: Number, default: 0 },
//   otherExpenses: { type: Number, default: 0 },
//   totalItemAmount: { type: Number, default: 0 },
//   billSundryAmount: { type: Number, default: 0 },
//   totalAmount: { type: Number, default: 0 },
//   accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
//   transportDetails: {
//     builtNumber: { type: Number, min: [0, "Built number cannot be negative"] },
//     transporter: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     lotSize: { type: Number, min: [0, "Lot size cannot be negative"] },
//     lotOpen: { type: Number, min: [0, "Lot open cannot be negative"] },
//     lotPending: { type: Number, min: [0, "Lot pending cannot be negative"] },
//   },
// });

// const Purchase = mongoose.model("Purchase", purchaseSchema);

// module.exports = Purchase;

//======================== new one[11/09/2024]  ============================//

const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  supplierName: { type: String },
  companyName: { type: String },
  invoiceDate: { type: Date, default: Date.now },
  purchaseDate: { type: Date, default: Date.now },
  supplierVoucherNo: { type: String },
  purchaseVoucherNo: { type: String },

  itemsList: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JewelryItem",
        default: null,
      },
      quantity: {
        type: Number,
        default: 0,
      },
      unit: { type: String },
      alternativeunit: { type: String },
      price: { type: Number },
      amount: { type: Number },
      serialNumber: { type: Number }, // Uncomment if you need serial numbers
      alternativeUnitQuantity: { type: Number, default: 0 }, // New field
      alternativeUnitPrice: { type: Number }, // New field
      barcode: {
        // Added field for barcode
        type: String,
        default: "",
      },
    },
  ],

  packingCharges: { type: Number, default: 0 },
  gstExpenses: { type: Number, default: 0 },
  otherExpenses: { type: Number, default: 0 },
  totalItemAmount: { type: Number, default: 0 },
  billSundryAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  transportDetails: {
    builtNumber: { type: Number, min: [0, "Built number cannot be negative"] },
    transporter: { type: String,  },
    date: { type: Date, default: Date.now },
    lotSize: { type: Number, min: [0, "Lot size cannot be negative"] },
    lotOpen: { type: Number, min: [0, "Lot open cannot be negative"] },
    lotPending: { type: Number, min: [0, "Lot pending cannot be negative"] },
  },

  sequenceId: { type: mongoose.Schema.Types.ObjectId, ref: "Sequence" },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;




// const mongoose = require('mongoose');

// // Define the schema for Purchase
// const purchaseSchema = new mongoose.Schema({
//   supplierName: { type: String, required: true },
//   companyName: { type: String, required: true },
//   invoiceDate: { type: Date, default: Date.now },
//   purchaseDate: { type: Date, default: Date.now },
//   supplierVoucherNo: { type: String, required: true },
//   purchaseVoucherNo: { type: String, required: true },
//   itemsList: [
//     {
//       item: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'JewelryItem',
//         default: null,
//       },
//       quantity: {
//         type: Number,
//         default: 0,
//         min: [0, 'Quantity cannot be negative'],
//       },
//       unit: { type: String, required: true },
//       price: {
//         type: Number,
//         required: true,
//         min: [0, 'Price cannot be negative'],
//       },
//       amount: {
//         type: Number,
//         default: function() { return this.quantity * this.price; },
//         min: [0, 'Amount cannot be negative'],
//       },
//     },
//   ],
//   packingCharges: {
//     type: Number,
//     default: 0,
//     min: [0, 'Packing charges cannot be negative'],
//   },
//   gstExpenses: {
//     type: Number,
//     default: 0,
//     min: [0, 'GST expenses cannot be negative'],
//   },
//   otherExpenses: {
//     type: Number,
//     default: 0,
//     min: [0, 'Other expenses cannot be negative'],
//   },
//   totalItemAmount: {
//     type: Number,
//     default: function() {
//       return this.itemsList.reduce((total, item) => total + (item.quantity * item.price), 0);
//     },
//     min: [0, 'Total item amount cannot be negative'],
//   },
//   billSundryAmount: {
//     type: Number,
//     default: 0,
//     min: [0, 'Bill sundry amount cannot be negative'],
//   },
//   totalAmount: {
//     type: Number,
//     default: function() {
//       return this.totalItemAmount + this.packingCharges + this.gstExpenses + this.otherExpenses + this.billSundryAmount;
//     },
//     min: [0, 'Total amount cannot be negative'],
//   },
//   accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
//   transportDetails: {
//     builtNumber: { type: Number, min: [0, 'Built number cannot be negative'] },
//     transporter: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     lotSize: { type: Number, min: [0, 'Lot size cannot be negative'] },
//     lotOpen: { type: Number, min: [0, 'Lot open cannot be negative'] },
//     lotPending: { type: Number, min: [0, 'Lot pending cannot be negative'] },
//   },
// }, { timestamps: true }); // Add timestamps

// // Create and export the Purchase model
// const Purchase = mongoose.model('Purchase', purchaseSchema);

// module.exports = Purchase;

// const mongoose = require('mongoose');

// // Custom validation function for ObjectId
// const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// const purchaseSchema = new mongoose.Schema({
//   supplierName: { type: String },
//   companyName: { type: String },
//   invoiceDate: { type: Date, default: Date.now },
//   purchaseDate: { type: Date, default: Date.now },
//   supplierVoucherNo: { type: String },
//   purchaseVoucherNo: { type: String },
//   itemsList: [
//     {
//       item: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'JewelryItem',
//         validate: {
//           validator: validateObjectId,
//           message: 'Invalid ObjectId for item.'
//         }
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: [1, 'Quantity must be at least 1'] // Ensure quantity is positive
//       },
//       unit: { type: String },
//       price: { type: Number },
//       amount: { type: Number }
//     }
//   ],
//   packingCharges: { type: Number, default: 0 },
//   gstExpenses: { type: Number, default: 0 },
//   otherExpenses: { type: Number, default: 0 },
//   totalItemAmount: { type: Number, default: 0 },
//   billSundryAmount: { type: Number, default: 0 },
//   totalAmount: { type: Number, default: 0 },
//   accountId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Account',
//     validate: {
//       validator: validateObjectId,
//       message: 'Invalid ObjectId for account.'
//     }
//   },
//   transportDetails: {
//     transportName: { type: String },
//     vehicleNo: { type: String },
//     date: { type: Date, default: Date.now },
//     stationFrom: { type: String },
//     stationTo: { type: String }
//   }
// });

// // Create and export the model
// const Purchase = mongoose.model('Purchase', purchaseSchema);

// module.exports = Purchase;
