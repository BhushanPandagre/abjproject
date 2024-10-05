// const SaleVoucher = require("../models/saleVoucher");

// exports.createSaleVoucher = async (req, res) => {
//   console.log("Received data:", req.body);
//   try {
//     const saleVoucher = new SaleVoucher(req.body);
//     await saleVoucher.save();
//     res.status(201).json(saleVoucher);
//   } catch (error) {
//     console.error("Error saving sale voucher:", error);
//     res.status(400).json({ message: error.message, details: error });
//   }
// };

// exports.getAllSaleVouchers = async (req, res) => {
//   try {
//     const saleVouchers = await SaleVoucher.find()
//       .populate("itemsList.item") // Populate the items in the list
//       .populate("accountId");
//     res.status(200).json(saleVouchers);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getSaleVoucherById = async (req, res) => {
//   try {
//     const saleVoucher = await SaleVoucher.findById(req.params.id)
//       .populate("itemsList.item") // Ensure this populates item details
//       .populate("accountId"); // This should correctly populate account details if needed

//     if (!saleVoucher) {
//       return res.status(404).json({ message: "Sale Voucher not found" });
//     }

//     res.status(200).json(saleVoucher);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.updateSaleVoucher = async (req, res) => {
//   try {
//     const saleVoucher = await SaleVoucher.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!saleVoucher) {
//       return res.status(404).json({ message: "Sale Voucher not found" });
//     }
//     res.status(200).json(saleVoucher);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteSaleVoucher = async (req, res) => {
//   try {
//     const saleVoucher = await SaleVoucher.findByIdAndDelete(req.params.id);
//     if (!saleVoucher) {
//       return res.status(404).json({ message: "Sale Voucher not found" });
//     }
//     res.status(200).json({ message: "Sale Voucher deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



// const SaleVoucher = require("../models/saleVoucher");





const SaleVoucher = require("../models/saleVoucher");
const SalesSequence = require("../models/SalesSequence"); // Adjust path as necessary

const generateSaleVoucherNo = (serial, currentYear) => {
  const formattedSerial = serial.toString().padStart(4, "0");
  return `SAL-${currentYear}/${formattedSerial}`;
};

exports.createSaleVoucher = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear().toString();

    // Atomic increment of serial number
    const sequence = await SalesSequence.findOneAndUpdate(
      { year: currentYear },
      { $inc: { serial: 1 } },
      { new: true, upsert: true }
    );

    const newSerial = sequence.serial;
    const newSaleVoucherNo = generateSaleVoucherNo(newSerial, currentYear);

    const saleVoucherData = {
      ...req.body,
      saleVoucherNo: newSaleVoucherNo,
    };

    const saleVoucher = new SaleVoucher(saleVoucherData);
    await saleVoucher.save();
    res.status(201).json(saleVoucher);
  } catch (error) {
    console.error("Error saving sale voucher:", error);
    res.status(400).json({ message: error.message, details: error });
  }
};

exports.getAllSaleVouchers = async (req, res) => {
  try {
    const saleVouchers = await SaleVoucher.find()
      .populate("itemsList.item") // Populate the items in the list
      .populate("accountId");
    res.status(200).json(saleVouchers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSaleVoucherById = async (req, res) => {
  try {
    const saleVoucher = await SaleVoucher.findById(req.params.id)
      .populate("itemsList.item")
      .populate("accountId");

    if (!saleVoucher) {
      return res.status(404).json({ message: "Sale Voucher not found" });
    }

    res.status(200).json(saleVoucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSaleVoucher = async (req, res) => {
  try {
    const saleVoucher = await SaleVoucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!saleVoucher) {
      return res.status(404).json({ message: "Sale Voucher not found" });
    }
    res.status(200).json(saleVoucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSaleVoucher = async (req, res) => {
  try {
    const saleVoucher = await SaleVoucher.findByIdAndDelete(req.params.id);
    if (!saleVoucher) {
      return res.status(404).json({ message: "Sale Voucher not found" });
    }
    res.status(200).json({ message: "Sale Voucher deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getNextSalesVoucherNo = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear().toString();

    const sequence = await SalesSequence.findOne({ year: currentYear });

    let nextVoucherNo = generateSaleVoucherNo(1, currentYear);

    if (sequence) {
      nextVoucherNo = generateSaleVoucherNo(sequence.serial + 1, currentYear);
    }

    res.json({ nextVoucherNo });
  } catch (error) {
    console.error("Error generating next sales voucher number:", error);
    res.status(500).json({ error: "Server error" });
  }
};
