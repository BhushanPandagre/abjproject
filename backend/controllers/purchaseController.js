// const Purchase = require("../models/purchase");

// // // Function to create a new purchase
// // const createPurchase = async (req, res) => {
// //   try {
// //     const {
// //       supplierName,
// //       companyName,
// //       invoiceDate,
// //       purchaseDate,
// //       supplierVoucherNo,
// //       itemsList,
// //       packingCharges,
// //       gstExpenses,
// //       otherExpenses,
// //       totalItemAmount,
// //       billSundryAmount,
// //       totalAmount,
// //       accountId,
// //       transportDetails // Add this line
// //     } = req.body;

// //     // Validate required fields
// //     if (!supplierName || !companyName || !invoiceDate || !purchaseDate) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }

// //     // Generate a unique purchase voucher number
// //     const latestPurchase = await Purchase.findOne().sort({ createdAt: -1 });
// //     const latestSerial =
// //       latestPurchase && latestPurchase.purchaseVoucherNo
// //         ? parseInt(latestPurchase.purchaseVoucherNo.slice(0, 3), 10)
// //         : 0;
// //     const currentYear = new Date().getFullYear().toString().slice(-2);
// //     const currentMonth = (new Date().getMonth() + 1)
// //       .toString()
// //       .padStart(2, "0");
// //     const newPurchaseVoucherNo = generatePurchaseVoucherNo(
// //       latestSerial,
// //       currentMonth,
// //       currentYear
// //     );

// //     const newPurchase = new Purchase({
// //       supplierName,
// //       companyName,
// //       invoiceDate,
// //       purchaseDate,
// //       supplierVoucherNo,
// //       purchaseVoucherNo: newPurchaseVoucherNo,
// //       itemsList,
// //       packingCharges,
// //       gstExpenses,
// //       otherExpenses,
// //       totalItemAmount,
// //       billSundryAmount,
// //       totalAmount,
// //       accountId,
// //       transportDetails // Include this field
// //     });

// //     await newPurchase.save();
// //     res.status(201).json({ success: true, purchase: newPurchase });
// //   } catch (error) {
// //     console.error("Error in createPurchase:", error);
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// const generatePurchaseVoucherNo = (serial, currentYear) => {
//   // Format serial number to be zero-padded to a length of 4 digits
//   const formattedSerial = serial.toString().padStart(1, '0');
//   return `PUR-${currentYear}/${formattedSerial}`;
// };

// const createPurchase = async (req, res) => {
//   try {
//     const {
//       supplierName,
//       companyName,
//       invoiceDate,
//       purchaseDate,
//       supplierVoucherNo,
//       itemsList,
//       packingCharges,
//       gstExpenses,
//       otherExpenses,
//       totalItemAmount,
//       billSundryAmount,
//       totalAmount,
//       accountId,
//       transportDetails // Add this line
//     } = req.body;

//     // Validate required fields
//     if (!supplierName || !companyName || !invoiceDate || !purchaseDate) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Get the current year
//     const currentYear = new Date().getFullYear().toString();

//     // Find the latest purchase voucher for the current year
//     const latestPurchase = await Purchase.findOne({ purchaseVoucherNo: { $regex: `^PUR-${currentYear}/` } })
//                                          .sort({ createdAt: -1 });

//     // Determine the latest serial number for the current year
//     const latestSerial = latestPurchase
//       ? parseInt(latestPurchase.purchaseVoucherNo.split('/')[1], 10)
//       : 0;

//     // Increment serial number for the new voucher
//     const newSerial = latestSerial + 1;
//     const newPurchaseVoucherNo = generatePurchaseVoucherNo(newSerial, currentYear);

//     const newPurchase = new Purchase({
//       supplierName,
//       companyName,
//       invoiceDate,
//       purchaseDate,
//       supplierVoucherNo,
//       purchaseVoucherNo: newPurchaseVoucherNo,
//       itemsList,
//       packingCharges,
//       gstExpenses,
//       otherExpenses,
//       totalItemAmount,
//       billSundryAmount,
//       totalAmount,
//       accountId,
//       transportDetails // Include this field
//     });

//     await newPurchase.save();
//     res.status(201).json({ success: true, purchase: newPurchase });
//   } catch (error) {
//     console.error("Error in createPurchase:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const getPurchases = async (req, res) => {
//   try {
//     const purchases = await Purchase.find().populate("itemsList.item");
//     res.json(purchases);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getPurchaseById = async (req, res) => {
//   try {
//     const purchase = await Purchase.findById(req.params.id)
//       .populate("itemsList.item") // Populate item field
//       .exec();

//     if (!purchase) return res.status(404).json({ error: "Purchase not found" });

//     res.status(200).json(purchase);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updatePurchaseById = async (req, res) => {
//   try {
//     const {
//       supplierName,
//       companyName,
//       invoiceDate,
//       purchaseDate,
//       supplierVoucherNo,
//       purchaseVoucherNo,
//       itemsList,
//       packingCharges,
//       gstExpenses,
//       otherExpenses,
//       totalItemAmount,
//       billSundryAmount,
//       totalAmount,
//       transportDetails // Add this line
//     } = req.body;

//     const purchase = await Purchase.findByIdAndUpdate(
//       req.params.id,
//       {
//         supplierName,
//         companyName,
//         invoiceDate,
//         purchaseDate,
//         supplierVoucherNo,
//         purchaseVoucherNo,
//         itemsList,
//         packingCharges,
//         gstExpenses,
//         otherExpenses,
//         totalItemAmount,
//         billSundryAmount,
//         totalAmount,
//         transportDetails // Include this field
//       },
//       { new: true }
//     ).populate("itemsList.item");

//     if (!purchase)
//       return res.status(404).json({ message: "Purchase not found" });
//     res.json({ success: true, purchase });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deletePurchaseById = async (req, res) => {
//   try {
//     const purchase = await Purchase.findByIdAndDelete(req.params.id);
//     if (!purchase)
//       return res.status(404).json({ message: "Purchase not found" });
//     res.json({ message: "Purchase deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Function to generate the voucher number
// // const generatePurchaseVoucherNo = (latestSerial, month, year) => {
// //   // Generate a random number between 000 and 999 for the first part
// //   const randomSerial = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
// //   return `${randomSerial}${month}${year}`;
// // };

// // Function to get the next purchase voucher number
// const getNextPurchaseVoucherNo = async (req, res) => {
//   try {
//     const currentYear = new Date().getFullYear().toString().slice(-2); // Last two digits of the year
//     const currentMonth = (new Date().getMonth() + 1).toString().padStart(1, "0"); // Current month, padded with zero

//     // Fetch the latest purchase entry sorted by purchaseVoucherNo in descending order
//     const lastPurchase = await Purchase.findOne().sort({ purchaseVoucherNo: -1 });

//     let nextVoucherNo = generatePurchaseVoucherNo(
//       0, // Placeholder for serial, will be replaced by random value
//       currentMonth,
//       currentYear
//     ); // Default voucher number if no previous voucher found

//     if (lastPurchase && lastPurchase.purchaseVoucherNo) {
//       // Extract the month and year from the last voucher number
//       const lastMonth = lastPurchase.purchaseVoucherNo.slice(3, 5);
//       const lastYear = lastPurchase.purchaseVoucherNo.slice(5, 7);

//       // If the year or month has changed, reset the serial number
//       if (lastMonth !== currentMonth || lastYear !== currentYear) {
//         nextVoucherNo = generatePurchaseVoucherNo(
//           0,
//           currentMonth,
//           currentYear
//         );
//       } else {
//         // If the same month and year, just increment the random number
//         const lastSerial = parseInt(lastPurchase.purchaseVoucherNo.slice(0, 3), 10);
//         nextVoucherNo = generatePurchaseVoucherNo(
//           lastSerial,
//           currentMonth,
//           currentYear
//         );
//       }
//     }

//     res.json({ nextVoucherNo });
//   } catch (error) {
//     console.error("Error generating voucher number:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const getNextVoucherNo = async (req, res) => {
//   try {
//     const lastPurchase = await Purchase.findOne().sort({
//       supplierVoucherNo: -1,
//     });

//     let nextVoucherNo = "0010824";
//     if (lastPurchase && lastPurchase.supplierVoucherNo) {
//       const lastNo = parseInt(lastPurchase.supplierVoucherNo, 10);
//       nextVoucherNo = String(lastNo + 1).padStart(3, "0");
//     }

//     res.json({ nextVoucherNo });
//   } catch (error) {
//     console.error("Error generating voucher number:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const addPurchase = async (req, res) => {
//   try {
//     const newPurchase = new Purchase(req.body);
//     await newPurchase.save();
//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.error("Error saving purchase:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add purchase",
//       error: error.message,
//     });
//   }
// };
// const addTransportDetails = async (req, res) => {
//   try {
//     const { purchaseId, transportDetails } = req.body;
//     const updatedPurchase = await Purchase.findByIdAndUpdate(
//       purchaseId,
//       { $set: { transportDetails } },
//       { new: true }
//     );
//     if (!updatedPurchase) return res.status(404).json({ message: "Purchase not found" });
//     res.status(200).json({ success: true, purchase: updatedPurchase });
//   } catch (error) {
//     console.error("Error adding transport details:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createPurchase,
//   getPurchases,
//   getPurchaseById,
//   updatePurchaseById,
//   deletePurchaseById,
//   getNextVoucherNo,
//   getNextPurchaseVoucherNo,
//   generatePurchaseVoucherNo,
//   addPurchase,
//   addTransportDetails
// };

//=========================New One[07/09/2024] =============================//

// const Purchase = require("../models/purchase");

// // const generatePurchaseVoucherNo = (serial, currentYear) => {
// //   // Format serial number to be zero-padded to a length of 1 digit (you can adjust as needed)
// //   const formattedSerial = serial.toString();
// //   return `PUR-${currentYear}/${formattedSerial}`;
// // };

// const generatePurchaseVoucherNo = (serial, currentYear) => {
//   // Format serial number to be zero-padded to a length of 4 digits
//   const formattedSerial = serial.toString().padStart(4, "0");
//   return `PUR-${currentYear}/${formattedSerial}`;
// };

// const createPurchase = async (req, res) => {
//   try {
//     const {
//       supplierName,
//       companyName,
//       invoiceDate,
//       purchaseDate,
//       // supplierVoucherNo,
//       itemsList,
//       packingCharges,
//       gstExpenses,
//       otherExpenses,
//       totalItemAmount,
//       billSundryAmount,
//       totalAmount,
//       accountId,
//       transportDetails, // Include this field
//     } = req.body;

//     // Validate required fields
//     if (!supplierName || !companyName || !invoiceDate || !purchaseDate) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Get the current year
//     const currentYear = new Date().getFullYear().toString();

//     // Find the latest purchase voucher for the current year
//     const latestPurchase = await Purchase.findOne({
//       purchaseVoucherNo: { $regex: `^PUR-${currentYear}/` },
//     }).sort({ createdAt: -1 });

//     // Determine the latest serial number for the current year
//     const latestSerial = latestPurchase
//       ? parseInt(latestPurchase.purchaseVoucherNo.split("/")[1], 10)
//       : 0;

//     // Increment serial number for the new voucher
//     const newSerial = latestSerial + 1;
//     const newPurchaseVoucherNo = generatePurchaseVoucherNo(
//       newSerial,
//       currentYear
//     );

//     const newPurchase = new Purchase({
//       supplierName,
//       companyName,
//       invoiceDate,
//       purchaseDate,
//       // supplierVoucherNo,
//       purchaseVoucherNo: newPurchaseVoucherNo,
//       itemsList,
//       packingCharges,
//       gstExpenses,
//       otherExpenses,
//       totalItemAmount,
//       billSundryAmount,
//       totalAmount,
//       accountId,
//       transportDetails, // Include this field
//     });

//     await newPurchase.save();
//     res.status(201).json({ success: true, purchase: newPurchase });
//   } catch (error) {
//     console.error("Error in createPurchase:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const getPurchases = async (req, res) => {
//   try {
//     const purchases = await Purchase.find().populate("itemsList.item");
//     res.json(purchases);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getPurchaseById = async (req, res) => {
//   try {
//     const purchase = await Purchase.findById(req.params.id)
//       .populate("itemsList.item") // Populate item field
//       .exec();

//     if (!purchase) return res.status(404).json({ error: "Purchase not found" });

//     res.status(200).json(purchase);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updatePurchaseById = async (req, res) => {
//   try {
//     const {
//       supplierName,
//       companyName,
//       invoiceDate,
//       purchaseDate,
//       // supplierVoucherNo,
//       purchaseVoucherNo,
//       itemsList,
//       packingCharges,
//       gstExpenses,
//       otherExpenses,
//       totalItemAmount,
//       billSundryAmount,
//       totalAmount,
//       transportDetails, // Add this line
//     } = req.body;

//     const purchase = await Purchase.findByIdAndUpdate(
//       req.params.id,
//       {
//         supplierName,
//         companyName,
//         invoiceDate,
//         purchaseDate,
//         // supplierVoucherNo,
//         purchaseVoucherNo,
//         itemsList,
//         packingCharges,
//         gstExpenses,
//         otherExpenses,
//         totalItemAmount,
//         billSundryAmount,
//         totalAmount,
//         transportDetails, // Include this field
//       },
//       { new: true }
//     ).populate("itemsList.item");

//     if (!purchase)
//       return res.status(404).json({ message: "Purchase not found" });
//     res.json({ success: true, purchase });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deletePurchaseById = async (req, res) => {
//   try {
//     const purchase = await Purchase.findByIdAndDelete(req.params.id);
//     if (!purchase)
//       return res.status(404).json({ message: "Purchase not found" });
//     res.json({ message: "Purchase deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // const getNextPurchaseVoucherNo = async (req, res) => {
// //   try {
// //     const currentYear = new Date().getFullYear().toString(); // Full year
// //     const currentMonth = (new Date().getMonth() + 1)
// //       .toString()
// //       .padStart(2, "0"); // Current month, padded with zero

// //     // Fetch the latest purchase entry sorted by purchaseVoucherNo in descending order
// //     const lastPurchase = await Purchase.findOne({
// //       purchaseVoucherNo: { $regex: `^PUR-${currentYear}/` },
// //     }).sort({ purchaseVoucherNo: -1 });

// //     let nextVoucherNo = generatePurchaseVoucherNo(
// //       1, // Placeholder for serial, will be replaced by the correct value
// //       currentYear
// //     ); // Default voucher number if no previous voucher found

// //     if (lastPurchase && lastPurchase.purchaseVoucherNo) {
// //       // Extract the serial from the last voucher number
// //       const lastSerial = parseInt(
// //         lastPurchase.purchaseVoucherNo.split("/")[1],
// //         10
// //       );
// //       nextVoucherNo = generatePurchaseVoucherNo(lastSerial + 1, currentYear); // Increment the serial
// //     }

// //     res.json({ nextVoucherNo });
// //   } catch (error) {
// //     console.error("Error generating voucher number:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };

// const getNextPurchaseVoucherNo = async (req, res) => {
//   try {
//     const currentYear = new Date().getFullYear().toString(); // Full year

//     // Fetch the latest purchase entry sorted by purchaseVoucherNo in descending order
//     const lastPurchase = await Purchase.findOne({
//       purchaseVoucherNo: { $regex: `^PUR-${currentYear}/` },
//     }).sort({ purchaseVoucherNo: -1 });

//     let nextVoucherNo = generatePurchaseVoucherNo(
//       1, // Placeholder for serial, will be replaced by the correct value
//       currentYear
//     ); // Default voucher number if no previous voucher found

//     if (lastPurchase && lastPurchase.purchaseVoucherNo) {
//       // Extract the serial from the last voucher number
//       const lastSerial = parseInt(
//         lastPurchase.purchaseVoucherNo.split("/")[1],
//         10
//       );
//       console.log("Last Serial:", lastSerial); // Debug output
//       nextVoucherNo = generatePurchaseVoucherNo(lastSerial + 1, currentYear); // Increment the serial
//     }

//     console.log("Next Voucher No:", nextVoucherNo); // Debug output

//     res.json({ nextVoucherNo });
//   } catch (error) {
//     console.error("Error generating voucher number:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // const getNextVoucherNo = async (req, res) => {
// //   try {
// //     const lastPurchase = await Purchase.findOne().sort({
// //       supplierVoucherNo: -1,
// //     });

// //     let nextVoucherNo = "0010824";
// //     // if (lastPurchase && lastPurchase.supplierVoucherNo) {
// //     //   const lastNo = parseInt(lastPurchase.supplierVoucherNo, 10);
// //     //   nextVoucherNo = String(lastNo + 1).padStart(3, "0");
// //     // }

// //     res.json({ nextVoucherNo });
// //   } catch (error) {
// //     console.error("Error generating voucher number:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };

// const addPurchase = async (req, res) => {
//   try {
//     const newPurchase = new Purchase(req.body);
//     await newPurchase.save();
//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.error("Error saving purchase:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add purchase",
//       error: error.message,
//     });
//   }
// };
// const addTransportDetails = async (req, res) => {
//   try {
//     const { purchaseId, transportDetails } = req.body;
//     const updatedPurchase = await Purchase.findByIdAndUpdate(
//       purchaseId,
//       { $set: { transportDetails } },
//       { new: true }
//     );
//     if (!updatedPurchase)
//       return res.status(404).json({ message: "Purchase not found" });
//     res.status(200).json({ success: true, purchase: updatedPurchase });
//   } catch (error) {
//     console.error("Error adding transport details:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createPurchase,
//   getPurchases,
//   getPurchaseById,
//   updatePurchaseById,
//   deletePurchaseById,
//   // getNextVoucherNo,
//   getNextPurchaseVoucherNo,
//   generatePurchaseVoucherNo,
//   addPurchase,
//   addTransportDetails,
// };

///============================Real one +================================//

const Purchase = require("../models/purchase");
const Sequence = require("../models/Sequence"); // Adjust path as necessary

const generatePurchaseVoucherNo = (serial, currentYear) => {
  const formattedSerial = serial.toString().padStart(4, "0");
  return `PUR-${currentYear}/${formattedSerial}`;
};

const createPurchase = async (req, res) => {
  try {
    const {
      supplierName,
      companyName,
      invoiceDate,
      purchaseDate,
      itemsList,
      packagingDetails, // New packaging details
      packingCharges,
      gstExpenses,
      otherExpenses,
      totalItemAmount,
      billSundryAmount,
      totalAmount,
      accountId,
      transportDetails,
    } = req.body;

    if (!supplierName || !companyName || !invoiceDate || !purchaseDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const currentYear = new Date().getFullYear().toString();

    // Atomic increment of serial number
    const sequence = await Sequence.findOneAndUpdate(
      { year: currentYear },
      { $inc: { serial: 1 } },
      { new: true, upsert: true }
    );

    const newSerial = sequence.serial;
    const newPurchaseVoucherNo = generatePurchaseVoucherNo(
      newSerial,
      currentYear
    );

    const newPurchase = new Purchase({
      supplierName,
      companyName,
      invoiceDate,
      purchaseDate,
      purchaseVoucherNo: newPurchaseVoucherNo,
      // itemsList: validatedItemsList,
      itemsList,
      packagingDetails,
      packingCharges,
      gstExpenses,
      otherExpenses,
      totalItemAmount,
      billSundryAmount,
      totalAmount,
      accountId,
      transportDetails,
    });

    await newPurchase.save();
    res.status(201).json({ success: true, purchase: newPurchase });
  } catch (error) {
    console.error("Error in createPurchase:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("itemsList.item");
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate("itemsList.item") // Populate item field
      .exec();

    if (!purchase) return res.status(404).json({ error: "Purchase not found" });

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePurchaseById = async (req, res) => {
  try {
    const {
      supplierName,
      companyName,
      invoiceDate,
      purchaseDate,
      purchaseVoucherNo,
      packagingDetails, // New packaging details
      itemsList,
      packingCharges,
      gstExpenses,
      otherExpenses,
      totalItemAmount,
      billSundryAmount,
      totalAmount,
      transportDetails, // Add this line
    } = req.body;

    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      {
        supplierName,
        companyName,
        invoiceDate,
        purchaseDate,
        purchaseVoucherNo,
        itemsList,
        packagingDetails,
        packingCharges,
        gstExpenses,
        otherExpenses,
        totalItemAmount,
        billSundryAmount,
        totalAmount,
        transportDetails, // Include this field
      },
      { new: true }
    ).populate("itemsList.item");

    if (!purchase)
      return res.status(404).json({ message: "Purchase not found" });
    res.json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deletePurchaseById = async (req, res) => {
  try {
    // Step 1: Find the Purchase Document
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Step 2: Delete the Purchase Document
    await Purchase.findByIdAndDelete(req.params.id);

    // Step 3: Update or Delete the Sequence Document
    if (purchase.sequenceId) {
      // Example: Optionally, you might want to do something with the Sequence document
      // Here, we are simply unsetting a hypothetical 'voucherNumber' field for illustration
      await Sequence.findByIdAndUpdate(
        purchase.sequenceId,
        { $unset: { voucherNumber: "" } }, // Adjust field as needed
        { new: true }
      );
    }

    res.json({ message: "Purchase and associated sequence updated/deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNextPurchaseVoucherNo = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear().toString();

    const sequence = await Sequence.findOne({ year: currentYear });

    let nextVoucherNo = generatePurchaseVoucherNo(1, currentYear);

    if (sequence) {
      nextVoucherNo = generatePurchaseVoucherNo(
        sequence.serial + 1,
        currentYear
      );
    }

    res.json({ nextVoucherNo });
  } catch (error) {
    console.error("Error generating voucher number:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add purchase",
      error: error.message,
    });
  }
};
const addTransportDetails = async (req, res) => {
  try {
    const { purchaseId, transportDetails } = req.body;
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { $set: { transportDetails } },
      { new: true }
    );
    if (!updatedPurchase)
      return res.status(404).json({ message: "Purchase not found" });
    res.status(200).json({ success: true, purchase: updatedPurchase });
  } catch (error) {
    console.error("Error adding transport details:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchaseById,
  deletePurchaseById,
  getNextPurchaseVoucherNo,
  generatePurchaseVoucherNo,
  addPurchase,
  addTransportDetails,
};
