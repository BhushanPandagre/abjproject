// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Define the schema for the data model
// const DataSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   printName: {
//     type: String,
//     required: true,
//   },
//   group: {
//     type: String,
//     required: true,
//   },
//   openingBalance: {
//     amount: { type: Number, required: true },
//     type: { type: String, enum: ["credit", "debit"], required: true }, // Added this field
//   },

//   contactDetails: {
//     mobileNumber: {
//       type: String,
//       required: true,
//     },
//     whatsappNumber: {
//       type: String,
//       required: false,
//     },
//   },
//   address: {
//     houseNumber: {
//       type: String,
//       required: true,
//     },
//     streetName: {
//       type: String,
//       required: true,
//     },
//     landmark: {
//       type: String,
//       required: false,
//     },
//     crossRoad: {
//       type: String,
//       required: false,
//     },
//     locality: {
//       type: String,
//       required: true,
//     },
//     relatedLocation: {
//       type: String,
//       required: false,
//     },
//   },
//   description: {
//     type: String,
//     required: false,
//   },
// });

// // Create a model using the schema
// const DataModel = mongoose.model("DataModel", DataSchema);

// module.exports = DataModel;




// ======================= Live Update Code ===========================================




const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the data model
const DataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  printName: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  openingBalance: {
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true }, // Added this field
  },

  contactDetails: {
    mobileNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: false,
    },
  },
  address: {
    houseNumber: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: false,
    },
    crossRoad: {
      type: String,
      required: false,
    },
    locality: {
      type: String,
      required: true,
    },
    relatedLocation: {
      type: String,
      required: false,
    },
      pinCode: {
      type: String,
      required: false,
    },
  },
  description: {
    type: String,
    required: false,
  },
});

// Create a model using the schema
const DataModel = mongoose.model("DataModel", DataSchema);

module.exports = DataModel;
