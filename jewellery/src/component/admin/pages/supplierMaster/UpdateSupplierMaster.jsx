// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function UpdateSupplierMaster() {

//     const { id } = useParams();
//     const [supplier, setSupplier] = useState(null);
//     const [formData, setFormData] = useState({
//       firstName: "",
//       lastName: "",
//       area: "",
//       partyCode: "",
//       openingBalance: { amount: "", type: "credit" }, // Default type value
//       address: {
//         houseNumber: "",
//         streetName: "",
//         locality: "",
//         landmark: "",
//         crossRoad: "",
//         relatedLocation: "",
//       },
//       contactNumbers: [""],
//       bankDetails: {
//         accountNumber: "",
//         firmName: "",
//         bankName: "",
//         ifscCode: "",
//       },
//       associatedCounter: "",
//       associatedSalesman: "",
//       // image: '',
//     });
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       axios
//         .get(`http://localhost:5000/api/suppliers/${id}`)
//         .then((response) => {
//           const supplierData = response.data;
//           setSupplier(supplierData);
//           setFormData({
//             firstName: supplierData.firstName,
//             lastName: supplierData.lastName,
//             area: supplierData.area,
//             partyCode: supplierData.partyCode,
//             openingBalance: {
//               amount: supplierData.openingBalance.amount || "",
//               type: supplierData.openingBalance.type || "credit", // Default value
//             },
//             address: {
//               houseNumber: supplierData.address.houseNumber || "",
//               streetName: supplierData.address.streetName || "",
//               locality: supplierData.address.locality || "",
//               landmark: supplierData.address.landmark || "",
//               crossRoad: supplierData.address.crossRoad || "",
//               relatedLocation: supplierData.address.relatedLocation || "",
//             },
//             contactNumbers: supplierData.contactNumbers || [""],
//             bankDetails: {
//               accountNumber: supplierData.bankDetails.accountNumber || "",
//               firmName: supplierData.bankDetails.firmName || "",
//               bankName: supplierData.bankDetails.bankName || "",
//               ifscCode: supplierData.bankDetails.ifscCode || "",
//             },
//             associatedCounter: supplierData.associatedCounter || "",
//             associatedSalesman: supplierData.associatedSalesman || "",
//           });
//         })
//         .catch((error) => console.error("Error fetching supplier:", error));
//     }, [id]);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     };
  
//     const handleAddressChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         address: {
//           ...prevData.address,
//           [name]: value,
//         },
//       }));
//     };
  
//     const handleBankDetailsChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         bankDetails: {
//           ...prevData.bankDetails,
//           [name]: value,
//         },
//       }));
//     };
  
//     const handleOpeningBalanceChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         openingBalance: {
//           ...prevData.openingBalance,
//           [name]: value,
//         },
//       }));
//     };
  
//     const handleContactNumberChange = (index, value) => {
//       const newContactNumbers = [...formData.contactNumbers];
//       newContactNumbers[index] = value;
//       setFormData((prevData) => ({
//         ...prevData,
//         contactNumbers: newContactNumbers,
//       }));
//     };
  
//     const handleAddContactNumber = () => {
//       setFormData((prevData) => ({
//         ...prevData,
//         contactNumbers: [...prevData.contactNumbers, ""],
//       }));
//     };
  
//     const handleRemoveContactNumber = (index) => {
//       const newContactNumbers = formData.contactNumbers.filter(
//         (_, i) => i !== index
//       );
//       setFormData((prevData) => ({
//         ...prevData,
//         contactNumbers: newContactNumbers,
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       axios
//         .put(`http://localhost:5000/api/suppliers/${id}`, formData)
//         .then(() => {
//           navigate("/supplier_list");
//         })
//         .catch((error) => console.error("Error updating supplier:", error));
//     };
  
//     if (!supplier) return <p>Loading...</p>;


//   return (
//     <div>
//         <div className="container mt-4">
//       <h1 className="mb-3">Update Supplier</h1>
//       <form onSubmit={handleSubmit}>
//         {/* General Information */}
//         <div className="card mb-3">
//           <div className="card-header">
//             <h5>General Information</h5>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="firstName" className="form-label">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   className="form-control"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="lastName" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   className="form-control"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="area" className="form-label">
//                   Area
//                 </label>
//                 <input
//                   type="text"
//                   id="area"
//                   name="area"
//                   className="form-control"
//                   value={formData.area}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="partyCode" className="form-label">
//                   Party Code
//                 </label>
//                 <input
//                   type="text"
//                   id="partyCode"
//                   name="partyCode"
//                   className="form-control"
//                   value={formData.partyCode}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="openingBalanceAmount" className="form-label">
//                   Opening Balance Amount
//                 </label>
//                 <input
//                   type="number"
//                   id="openingBalanceAmount"
//                   name="amount"
//                   className="form-control"
//                   value={formData.openingBalance.amount}
//                   onChange={handleOpeningBalanceChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="openingBalanceType" className="form-label">
//                   Opening Balance Type
//                 </label>
//                 <select
//                   id="openingBalanceType"
//                   name="type"
//                   className="form-control"
//                   value={formData.openingBalance.type}
//                   onChange={handleOpeningBalanceChange}
//                   required
//                 >
//                   <option value="credit">Credit</option>
//                   <option value="debit">Debit</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Address */}
//         <div className="card mb-3">
//           <div className="card-header">
//             <h5>Address</h5>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="houseNumber" className="form-label">
//                   House Number
//                 </label>
//                 <input
//                   type="text"
//                   id="houseNumber"
//                   name="houseNumber"
//                   className="form-control"
//                   value={formData.address.houseNumber}
//                   onChange={handleAddressChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="streetName" className="form-label">
//                   Street Name
//                 </label>
//                 <input
//                   type="text"
//                   id="streetName"
//                   name="streetName"
//                   className="form-control"
//                   value={formData.address.streetName}
//                   onChange={handleAddressChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="locality" className="form-label">
//                   Locality
//                 </label>
//                 <input
//                   type="text"
//                   id="locality"
//                   name="locality"
//                   className="form-control"
//                   value={formData.address.locality}
//                   onChange={handleAddressChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="landmark" className="form-label">
//                   Landmark
//                 </label>
//                 <input
//                   type="text"
//                   id="landmark"
//                   name="landmark"
//                   className="form-control"
//                   value={formData.address.landmark}
//                   onChange={handleAddressChange}
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="crossRoad" className="form-label">
//                   Cross Road
//                 </label>
//                 <input
//                   type="text"
//                   id="crossRoad"
//                   name="crossRoad"
//                   className="form-control"
//                   value={formData.address.crossRoad}
//                   onChange={handleAddressChange}
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="relatedLocation" className="form-label">
//                   Related Location
//                 </label>
//                 <input
//                   type="text"
//                   id="relatedLocation"
//                   name="relatedLocation"
//                   className="form-control"
//                   value={formData.address.relatedLocation}
//                   onChange={handleAddressChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bank Details */}
//         <div className="card mb-3">
//           <div className="card-header">
//             <h5>Bank Details</h5>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="accountNumber" className="form-label">
//                   Account Number
//                 </label>
//                 <input
//                   type="text"
//                   id="accountNumber"
//                   name="accountNumber"
//                   className="form-control"
//                   value={formData.bankDetails.accountNumber}
//                   onChange={handleBankDetailsChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="firmName" className="form-label">
//                   Firm Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firmName"
//                   name="firmName"
//                   className="form-control"
//                   value={formData.bankDetails.firmName}
//                   onChange={handleBankDetailsChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="bankName" className="form-label">
//                   Bank Name
//                 </label>
//                 <input
//                   type="text"
//                   id="bankName"
//                   name="bankName"
//                   className="form-control"
//                   value={formData.bankDetails.bankName}
//                   onChange={handleBankDetailsChange}
//                   required
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="ifscCode" className="form-label">
//                   IFSC Code
//                 </label>
//                 <input
//                   type="text"
//                   id="ifscCode"
//                   name="ifscCode"
//                   className="form-control"
//                   value={formData.bankDetails.ifscCode}
//                   onChange={handleBankDetailsChange}
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Numbers */}
//         <div className="card mb-3">
//           <div className="card-header">
//             <h5>Contact Numbers</h5>
//           </div>
//           <div className="card-body">
//             {formData.contactNumbers.map((number, index) => (
//               <div key={index} className="mb-2">
//                 <label htmlFor={`contactNumber${index}`} className="form-label">
//                   Contact Number {index + 1}
//                 </label>
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     id={`contactNumber${index}`}
//                     className="form-control"
//                     value={number}
//                     onChange={(e) =>
//                       handleContactNumberChange(index, e.target.value)
//                     }
//                     required // Ensuring that at least one contact number is required
//                   />
//                   {formData.contactNumbers.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveContactNumber(index)}
//                       className="btn btn-outline-danger ms-2"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddContactNumber}
//               className="btn btn-secondary mt-2"
//             >
//               Add Contact Number
//             </button>
//           </div>
//         </div>

//         {/* Optional Fields */}
//         <div className="card mb-3">
//           <div className="card-header">
//             <h5>Optional Fields</h5>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="associatedCounter" className="form-label">
//                   Associated Counter
//                 </label>
//                 <input
//                   type="text"
//                   id="associatedCounter"
//                   name="associatedCounter"
//                   className="form-control"
//                   value={formData.associatedCounter}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <label htmlFor="associatedSalesman" className="form-label">
//                   Associated Salesman
//                 </label>
//                 <input
//                   type="text"
//                   id="associatedSalesman"
//                   name="associatedSalesman"
//                   className="form-control"
//                   value={formData.associatedSalesman}
//                   onChange={handleChange}
//                 />
//               </div>
             
//             </div>
//           </div>
//         </div>

//         <div className="d-flex justify-content-end">
//           <button type="submit" className="btn btn-primary">
//             Update Supplier
//           </button>
         
//         </div>
//       </form>
//     </div>
//     </div>
//   )
// }














// ============================= Live Update Code  ======================================



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../../services/api";

export default function UpdateSupplierMaster() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    area: "",
    partyCode: "",
    openingBalance: { amount: "", type: "credit" }, // Default type value
    address: {
      houseNumber: "",
      streetName: "",
      locality: "",
      landmark: "",
      crossRoad: "",
      relatedLocation: "",
    },
    contactNumbers: [""],
    bankDetails: {
      accountNumber: "",
      firmName: "",
      bankName: "",
      ifscCode: "",
    },
    associatedCounter: "",
    associatedSalesman: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/suppliers/${id}`)
      .then((response) => {
        const supplierData = response.data;
        setSupplier(supplierData);
        setFormData({
          firstName: supplierData.firstName,
          lastName: supplierData.lastName,
          area: supplierData.area,
          partyCode: supplierData.partyCode,
          openingBalance: {
            amount: supplierData.openingBalance.amount || "",
            type: supplierData.openingBalance.type || "credit", // Default value
          },
          address: {
            houseNumber: supplierData.address.houseNumber || "",
            streetName: supplierData.address.streetName || "",
            locality: supplierData.address.locality || "",
            landmark: supplierData.address.landmark || "",
            crossRoad: supplierData.address.crossRoad || "",
            relatedLocation: supplierData.address.relatedLocation || "",
          },
          contactNumbers: supplierData.contactNumbers || [""],
          bankDetails: {
            accountNumber: supplierData.bankDetails.accountNumber || "",
            firmName: supplierData.bankDetails.firmName || "",
            bankName: supplierData.bankDetails.bankName || "",
            ifscCode: supplierData.bankDetails.ifscCode || "",
          },
          associatedCounter: supplierData.associatedCounter || "",
          associatedSalesman: supplierData.associatedSalesman || "",
        });
      })
      .catch((error) => console.error("Error fetching supplier:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      bankDetails: {
        ...prevData.bankDetails,
        [name]: value,
      },
    }));
  };

  const handleOpeningBalanceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      openingBalance: {
        ...prevData.openingBalance,
        [name]: value,
      },
    }));
  };

  const handleContactNumberChange = (index, value) => {
    const newContactNumbers = [...formData.contactNumbers];
    newContactNumbers[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      contactNumbers: newContactNumbers,
    }));
  };

  const handleAddContactNumber = () => {
    setFormData((prevData) => ({
      ...prevData,
      contactNumbers: [...prevData.contactNumbers, ""],
    }));
  };

  const handleRemoveContactNumber = (index) => {
    const newContactNumbers = formData.contactNumbers.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      contactNumbers: newContactNumbers,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/api/suppliers/${id}`, formData)
      .then(() => {
        navigate("/supplier_detail");
      })
      .catch((error) => console.error("Error updating supplier:", error));
  };

  if (!supplier) return <p>Loading...</p>;

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-3">Update Supplier</h1>
        <form onSubmit={handleSubmit}>
          {/* General Information */}
          <div className="card mb-3">
            <div className="card-header">
              <h5>General Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="area" className="form-label">
                    Area
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    className="form-control"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="partyCode" className="form-label">
                    Party Code
                  </label>
                  <input
                    type="text"
                    id="partyCode"
                    name="partyCode"
                    className="form-control"
                    value={formData.partyCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="openingBalanceAmount" className="form-label">
                    Opening Balance Amount
                  </label>
                  <input
                    type="number"
                    id="openingBalanceAmount"
                    name="amount"
                    className="form-control"
                    value={formData.openingBalance.amount}
                    onChange={handleOpeningBalanceChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="openingBalanceType" className="form-label">
                    Opening Balance Type
                  </label>
                  <select
                    id="openingBalanceType"
                    name="type"
                    className="form-control"
                    value={formData.openingBalance.type}
                    onChange={handleOpeningBalanceChange}
                    required
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="card mb-3">
            <div className="card-header">
              <h5>Address</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <label htmlFor="houseNumber" className="form-label">
                    House Number
                  </label>
                  <input
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    className="form-control"
                    value={formData.address.houseNumber}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="streetName" className="form-label">
                    Street Name
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    className="form-control"
                    value={formData.address.streetName}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="locality" className="form-label">
                    Locality
                  </label>
                  <input
                    type="text"
                    id="locality"
                    name="locality"
                    className="form-control"
                    value={formData.address.locality}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="landmark" className="form-label">
                    Landmark
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    className="form-control"
                    value={formData.address.landmark}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="crossRoad" className="form-label">
                    Cross Road
                  </label>
                  <input
                    type="text"
                    id="crossRoad"
                    name="crossRoad"
                    className="form-control"
                    value={formData.address.crossRoad}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="relatedLocation" className="form-label">
                    Related Location
                  </label>
                  <input
                    type="text"
                    id="relatedLocation"
                    name="relatedLocation"
                    className="form-control"
                    value={formData.address.relatedLocation}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="card mb-3">
            <div className="card-header">
              <h5>Bank Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <label htmlFor="accountNumber" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    className="form-control"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="firmName" className="form-label">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    id="firmName"
                    name="firmName"
                    className="form-control"
                    value={formData.bankDetails.firmName}
                    onChange={handleBankDetailsChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="bankName" className="form-label">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    className="form-control"
                    value={formData.bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="ifscCode" className="form-label">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    className="form-control"
                    value={formData.bankDetails.ifscCode}
                    onChange={handleBankDetailsChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="card mb-3">
            <div className="card-header">
              <h5>Contact Numbers</h5>
            </div>
            <div className="card-body">
              {formData.contactNumbers.map((number, index) => (
                <div key={index} className="mb-2">
                  <label
                    htmlFor={`contactNumber${index}`}
                    className="form-label"
                  >
                    Contact Number {index + 1}
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id={`contactNumber${index}`}
                      className="form-control"
                      value={number}
                      onChange={(e) =>
                        handleContactNumberChange(index, e.target.value)
                      }
                      required // Ensuring that at least one contact number is required
                    />
                    {formData.contactNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveContactNumber(index)}
                        className="btn btn-outline-danger ms-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddContactNumber}
                className="btn btn-secondary mt-2"
              >
                Add Contact Number
              </button>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="card mb-3">
            <div className="card-header">
              <h5>Optional Fields</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <label htmlFor="associatedCounter" className="form-label">
                    Associated Counter
                  </label>
                  <input
                    type="text"
                    id="associatedCounter"
                    name="associatedCounter"
                    className="form-control"
                    value={formData.associatedCounter}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="associatedSalesman" className="form-label">
                    Associated Salesman
                  </label>
                  <input
                    type="text"
                    id="associatedSalesman"
                    name="associatedSalesman"
                    className="form-control"
                    value={formData.associatedSalesman}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Update Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

