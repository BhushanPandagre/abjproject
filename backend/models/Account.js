
// // const mongoose = require('mongoose');

// // const accountSchema = new mongoose.Schema({
// //   accountId: {
// //     type: Number,
// //   },
// //   salutation: {
// //     type: String,
// //     enum: ['Mr.', 'Mrs.'],
// //     required: true
// //   },
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   lastName: {
// //     type: String,
// //     required: true
// //   },
// //   printName: {
// //     type: String,
// //     required: true
// //   },
// //   companyName: {
// //     type: String,
// //     required: true
// //   },
// //   address: {
// //     streetName: {
// //       type: String,
// //       required: true
// //     },
// //     houseNumber: {
// //       type: String,
// //       required: true
// //     },
// //     landmark: {
// //       type: String
// //     },
// //     crossRoad: {
// //       type: String
// //     },
// //     locality: {
// //       type: String,
// //       required: true
// //     },
// //     relatedLocation: {
// //       type: String
// //     },
// //     otherInstructions: {
// //       type: String
// //     }
// //   },
// //   group: {
// //     type: String,
// //     required: true
// //   },
// //   collectionRoot: {
// //     type: String,
// //     enum: ['collectable', 'not_collectable'],
// //     default: 'collectable', // Default value assuming address is accessible
// //     required: true
// //   },
// //   state: {
// //     type: String,
// //     required: true
// //   },
// //   city: {
// //     type: String,
// //     required: true
// //   },
// //   pinCode: {
// //     type: String,
// //     required: true
// //   },
// //   country: {
// //     type: String,
// //     required: true
// //   },
// //   customerType: {
// //     type: String,
// //     required: true,
// //     enum: ['Retailer', 'Semi Wholesaler', 'Wholesaler']
// //   },
// //   creditLimit: {
// //     type: Number,
// //     required: true
// //   },
// //   creditDays: {
// //     type: Number,
// //     required: true
// //   },
// //   phoneNumber: {
// //     type: Number,
// //     required: true
// //   },
// //   whatsAppNumber: {
// //     type: Number,
// //     required: true
// //   },
// //   email: {
// //     type: String,
   
// //   },
// //   customId: { 
// //     type: String, 
// //     required: true, 
// //     unique: true 
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   creditLimitStrict: {
// //     type: String,
// //     enum: ['yes', 'no'],
// //     default: 'yes'
// //   },
// //   image: {
// //     type: String
// //   },
// //   openingBalance: {
// //     type: Number,
// //     default :0,
// //   },

// //   contactPerson: {
// //     type: String
// //   },
// //   station: {
// //     type: String
// //   },
// //   bankName: {
// //     type: String
// //   },
// //   ifscCode: {
// //     type: String
// //   }
// // });

// // module.exports = mongoose.model('Account', accountSchema);




// const mongoose = require('mongoose');

// const accountSchema = new mongoose.Schema({
//   accountId: {
//     type: Number,
  
//     sparse: true // Ensures unique but allows null values
//   },
//   salutation: {
//     type: String,
//     enum: ['Mr.', 'Mrs.'],
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   printName: {
//     type: String,
//     required: true
//   },
//   companyName: {
//     type: String,
//     required: true
//   },
//   address: {
//     streetName: {
//       type: String,
//       required: true
//     },
//     houseNumber: {
//       type: String,
//       required: true
//     },
//     landmark: {
//       type: String
//     },
//     crossRoad: {
//       type: String
//     },
//     locality: {
//       type: String,
//       required: true
//     },
//     relatedLocation: {
//       type: String
//     },
//     otherInstructions: {
//       type: String
//     }
//   },
//   group: {
//     type: String,
//     required: true
//   },
//   collectionRoot: {
//     type: String,
//     enum: ['collectable', 'not_collectable'],
//     default: 'collectable',
//     required: true
//   },
//   state: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   pinCode: {
//     type: String,
//     required: true
//   },
//   country: {
//     type: String,
//     required: true
//   },
//   customerType: {
//     type: String,
//     required: true,
//     enum: ['Retailer', 'Semi Wholesaler', 'Wholesaler']
//   },
//   creditLimit: {
//     type: Number,
//     required: true
//   },
//   creditDays: {
//     type: Number,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   whatsAppNumber: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String
//   },
//   customId: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   creditLimitStrict: {
//     type: String,
//     enum: ['yes', 'no'],
//     default: 'yes'
//   },
//   image: {
//     type: String
//   },
//   openingBalance: {
//     type: Number,
//     default: 0
//   },
//   contactPerson: {
//     type: String
//   },
//   station: {
//     type: String
//   },
//   bankName: {
//     type: String
//   },
//   ifscCode: {
//     type: String
//   }
// });

// module.exports = mongoose.model('Account', accountSchema);




//===========================live Update Code ============================================



const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountId: {
    type: Number,
  
    sparse: true // Ensures unique but allows null values
  },
  salutation: {
    type: String,
    // enum: ['Mr.', 'Mrs.'],
    required: true
  },
  
  name: {
    type: String,
    required: true
  },

  printName: {
    type: String,
    required: true
  },
  
 
  address: {
    streetName: {
      type: String,
      required: true
    },
    houseNumber: {
      type: String,
      required: true
    },
    landmark: {
      type: String
    },
    crossRoad: {
      type: String
    },
    locality: {
      type: String,
      required: true
    },
    relatedLocation: {
      type: String
    },
    otherInstructions: {
      type: String
    }
  },
  group: {
    type: String,
    required: true
  },
  collectionRoot: {
    type: String,
    enum: ['collectable', 'not_collectable'],
    default: 'collectable',
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pinCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  
  customerType: {
    type: String,
    required: true,
    enum: [ "case customer","credite customer"],
  },

  rateType: {
    type: String,
    required: true,
    enum: [ "Semi Wholesaler","Retailer", "Wholesaler"],
  },

  creditLimit: {
    type: Number,
    required: true
  },
  creditDays: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  whatsAppNumber: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  customId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creditLimitStrict: {
    type: String,
    enum: ['yes', 'no'],
    default: 'yes'
  },
  image: {
    type: String
  },
  
    openingBalance: {
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true }, // Added this field
  },

  bankName: {
    type: String
  },
  ifscCode: {
    type: String
  },
  visibility: {
    type: String,
    enum: ['general', 'private'],
    default: 'general',
    required: true
  },
  colorCode: {
    type: String,
    enum: ['green', 'red'],
    default: 'green',
    required: true
  },

});

module.exports = mongoose.model('Account', accountSchema);

















































































































