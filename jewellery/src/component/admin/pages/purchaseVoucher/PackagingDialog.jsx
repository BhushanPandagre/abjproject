// import  { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// const PackagingDialog = ({ open, onClose, itemIndex, items, onSave }) => {
//   const [localPackaging, setLocalPackaging] = useState([ { box: "", piecesPerBox: "" },]);

//   useEffect(() => {
//     if (open) {
//       // Load packaging details for the specific item
//       setLocalPackaging(items[itemIndex]?.packaging || []);
//     }
//   }, [open, itemIndex, items]);

//   const handleAddRow = () => {
//     setLocalPackaging([...localPackaging, { box: "", piecesPerBox: 0 }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedPackaging = localPackaging.map((pkg, i) =>
//       i === index ? { ...pkg, [field]: value } : pkg
//     );
//     setLocalPackaging(updatedPackaging);
//   };

//   const handleSave = () => {
//     console.log("Saving packaging data:", localPackaging);
//     onSave(itemIndex, localPackaging);
//     onClose();
//   };
  

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Define Packaging</DialogTitle>
//       <DialogContent>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Box Type</TableCell>
//               <TableCell>Pieces</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {localPackaging.map((pkg, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <TextField
//                     value={pkg.box}
//                     onChange={(e) => handleChange(index, 'box', e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={pkg.piecesPerBox}
//                     onChange={(e) => handleChange(index, 'piecesPerBox', e.target.value)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Button onClick={handleAddRow}>Add Row</Button>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSave}>Save</Button>
//         <Button onClick={onClose}>Cancel</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PackagingDialog;




// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

// const PackagingDialog = ({ open, onClose, itemIndex, items, onSave }) => {
//   const [localPackaging, setLocalPackaging] = useState([{ box: "", piecesPerBox: "" }]);

//   useEffect(() => {
//     if (open && itemIndex !== undefined && items) {
//       setLocalPackaging(items[itemIndex]?.packaging || []);
//     }
//   }, [open, itemIndex, items]);

//   const handleAddRow = () => {
//     setLocalPackaging([...localPackaging, { box: "", piecesPerBox: 0 }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedPackaging = localPackaging.map((pkg, i) =>
//       i === index ? { ...pkg, [field]: value } : pkg
//     );
//     setLocalPackaging(updatedPackaging);
//   };

//   const handleSave = () => {
//     console.log("Saving packaging data:", localPackaging);
//     onSave(itemIndex, localPackaging);
//     onClose();
//   };

//   // Calculate total pieces and boxes
//   const totalPieces = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.piecesPerBox) || 0) * (parseFloat(pkg.box) || 0), 0);
//   const totalBoxes = localPackaging.reduce((sum, pkg) => sum + parseFloat(pkg.box) || 0, 0);

//   // Placeholder function for generating barcode
//   const handleGenerateBarcode = (index) => {
//     alert(`Generate barcode for row ${index + 1}`);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Define Packaging</DialogTitle>
//       <DialogContent>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Box Type</TableCell>
//               <TableCell>Pieces per Box</TableCell>
//               <TableCell>Generate Barcode</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {localPackaging.map((pkg, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={pkg.box}
//                     onChange={(e) => handleChange(index, 'box', e.target.value)}
//                     placeholder="Number of Boxes"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={pkg.piecesPerBox}
//                     onChange={(e) => handleChange(index, 'piecesPerBox', e.target.value)}
//                     placeholder="Pieces per Box"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleGenerateBarcode(index)}>Generate Barcode</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Typography variant="h6">Total Boxes: {totalBoxes.toFixed(2)}</Typography>
//         <Typography variant="h6">Total Pieces: {totalPieces.toFixed(2)}</Typography>
//         <Button onClick={handleAddRow}>Add Row</Button>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSave}>Save</Button>
//         <Button onClick={onClose}>Cancel</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PackagingDialog;





// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

// const PackagingDialog = ({ open, onClose, itemIndex, items, onSave }) => {
//   const [localPackaging, setLocalPackaging] = useState();

//   useEffect(() => {
//     if (open && itemIndex !== undefined && items) {
//       setLocalPackaging(items[itemIndex]?.packaging || []);
//     }
//   }, [open, itemIndex, items]);

//   const handleAddRow = () => {
//     setLocalPackaging([...localPackaging, { box: "", piecesPerBox: "" }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedPackaging = localPackaging.map((pkg, i) =>
//       i === index ? { ...pkg, [field]: value } : pkg
//     );
//     setLocalPackaging(updatedPackaging);
//   };

//   const handleSave = () => {
//     // Ensure all values are properly formatted before saving
//     const sanitizedPackaging = localPackaging.map(pkg => ({
//       box: parseFloat(pkg.box) || 0,
//       piecesPerBox: parseFloat(pkg.piecesPerBox) || 0,
//     }));
//     console.log("Saving packaging data:", sanitizedPackaging);
//     onSave(itemIndex, sanitizedPackaging);
//     onClose();
//   };

//   // Calculate total pieces and boxes
//   const totalPieces = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.piecesPerBox) || 0) * (parseFloat(pkg.box) || 0), 0);
//   const totalBoxes = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.box) || 0), 0);

//   // Placeholder function for generating barcode
//   const handleGenerateBarcode = (index) => {
//     alert(`Generate barcode for row ${index + 1}`);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Define Packaging</DialogTitle>
//       <DialogContent>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Box Type</TableCell>
//               <TableCell>Pieces per Box</TableCell>
//               <TableCell>Total Pieces</TableCell>
//               <TableCell>Total Boxes</TableCell>
//               <TableCell>Generate Barcode</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {localPackaging.map((pkg, index) => {
//               const boxValue = parseFloat(pkg.box) || 0;
//               const piecesPerBoxValue = parseFloat(pkg.piecesPerBox) || 0;
//               const rowTotalPieces = boxValue * piecesPerBoxValue;
//               const rowTotalBoxes = boxValue;

//               return (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={pkg.box}
//                       onChange={(e) => handleChange(index, 'box', e.target.value)}
//                       placeholder="Number of Boxes"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={pkg.piecesPerBox}
//                       onChange={(e) => handleChange(index, 'piecesPerBox', e.target.value)}
//                       placeholder="Pieces per Box"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {rowTotalPieces.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     {rowTotalBoxes.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleGenerateBarcode(index)}>Generate Barcode</Button>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//         <Typography variant="h6">Total Boxes: {totalBoxes.toFixed(2)}</Typography>
//         <Typography variant="h6">Total Pieces: {totalPieces.toFixed(2)}</Typography>
//         <Button onClick={handleAddRow}>Add Row</Button>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSave}>Save</Button>
//         <Button onClick={onClose}>Cancel</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PackagingDialog;






// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

// const PackagingDialog = ({ open, onClose, itemIndex, items, onSave }) => {
//   // Initialize localPackaging with an empty array
//   const [localPackaging, setLocalPackaging] = useState([]);

//   useEffect(() => {
//     if (open && itemIndex !== undefined && items) {
//       setLocalPackaging(items[itemIndex]?.packaging || []);
//     }
//   }, [open, itemIndex, items]);

//   const handleAddRow = () => {
//     setLocalPackaging([...localPackaging, { box: "", piecesPerBox: "" }]);
//   };

// //   const handleChange = (index, field, value) => {
// //     const updatedPackaging = localPackaging.map((pkg, i) =>
// //       i === index ? { ...pkg, [field]: value } : pkg
// //     );
// //     setLocalPackaging(updatedPackaging);
// //   };

// const handlePackingChange = (index, field, value) => {
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       packing: {
//         ...updatedItemsList[index].packing,
//         [field]: value,
//       },
//     };
//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalPacking(updatedItemsList);
//   };


//   const handleSave = () => {
//     // Ensure all values are properly formatted before saving
//     const sanitizedPackaging = localPackaging.map(pkg => ({
//       box: parseFloat(pkg.box) || 0,
//       piecesPerBox: parseFloat(pkg.piecesPerBox) || 0,
//     }));
//     console.log("Saving packaging data:", sanitizedPackaging);
//     onSave(itemIndex, sanitizedPackaging);
//     onClose();
//   };

//   // Initialize totalPieces and totalBoxes to 0 if localPackaging is empty
//   const totalPieces = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.piecesPerBox) || 0) * (parseFloat(pkg.box) || 0), 0);
//   const totalBoxes = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.box) || 0), 0);

//   // Placeholder function for generating barcode
//   const handleGenerateBarcode = (index) => {
//     alert(`Generate barcode for row ${index + 1}`);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Define Packaging</DialogTitle>
//       <DialogContent>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Box Type</TableCell>
//               <TableCell>Pieces per Box</TableCell>
//               <TableCell>Total Pieces</TableCell>
//               <TableCell>Total Boxes</TableCell>
//               <TableCell>Generate Barcode</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {localPackaging.map((pkg, index) => {
//               const boxValue = parseFloat(pkg.box) || 0;
//               const piecesPerBoxValue = parseFloat(pkg.piecesPerBox) || 0;
//               const rowTotalPieces = boxValue * piecesPerBoxValue;
//               const rowTotalBoxes = boxValue;

//               return (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={pkg.box}
//                       onChange={(e) => handlePackingChange(index, 'box', e.target.value)}
//                       placeholder="Number of Boxes"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={pkg.piecesPerBox}
//                       onChange={(e) => handlePackingChange(index, 'piecesPerBox', e.target.value)}
//                       placeholder="Pieces per Box"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {rowTotalPieces.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     {rowTotalBoxes.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleGenerateBarcode(index)}>Generate Barcode</Button>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//         <Typography variant="h6">Total Boxes: {totalBoxes.toFixed(2)}</Typography>
//         <Typography variant="h6">Total Pieces: {totalPieces.toFixed(2)}</Typography>
//         <Button onClick={handleAddRow}>Add Row</Button>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSave}>Save</Button>
//         <Button onClick={onClose}>Cancel</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PackagingDialog;



// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

// const PackagingDialog = ({ open, onClose, itemIndex, items, onSave }) => {
//     const [localPackaging, setLocalPackaging] = useState([]);
  
//     useEffect(() => {
//       if (open && itemIndex !== undefined && items) {
//         setLocalPackaging(items[itemIndex]?.packaging || []);
//       }
//     }, [open, itemIndex, items]);
  
//     const handleAddRow = () => {
//       setLocalPackaging([...localPackaging, { box: "", piecesPerBox: "" }]);
//     };
  
//     const handlePackingChange = (index, field, value) => {
//       const updatedPackaging = localPackaging.map((pkg, i) =>
//         i === index ? { ...pkg, [field]: value } : pkg
//       );
//       setLocalPackaging(updatedPackaging);
//     };
  
//     const handleSave = () => {
//       const sanitizedPackaging = localPackaging.map(pkg => ({
//         box: parseFloat(pkg.box) || 0,
//         piecesPerBox: parseFloat(pkg.piecesPerBox) || 0,
//       }));
//       console.log("Saving packaging data:", sanitizedPackaging);
//       onSave(itemIndex, sanitizedPackaging);
//       onClose();
//     };
  
//     const totalPieces = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.piecesPerBox) || 0) * (parseFloat(pkg.box) || 0), 0);
//     const totalBoxes = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.box) || 0), 0);
  
//     return (
//       <Dialog open={open} onClose={onClose}>
//         <DialogTitle>Define Packaging</DialogTitle>
//         <DialogContent>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Box Type</TableCell>
//                 <TableCell>Pieces per Box</TableCell>
//                 <TableCell>Total Pieces</TableCell>
//                 <TableCell>Total Boxes</TableCell>
//                 <TableCell>Generate Barcode</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {localPackaging.map((pkg, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={pkg.box}
//                       onChange={(e) => handlePackingChange(index, 'box', e.target.value)}
//                       placeholder="Number of Boxes"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={pkg.piecesPerBox}
//                       onChange={(e) => handlePackingChange(index, 'piecesPerBox', e.target.value)}
//                       placeholder="Pieces per Box"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {rowTotalPieces.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     {rowTotalBoxes.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleGenerateBarcode(index)}>Generate Barcode</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Typography variant="h6">Total Boxes: {totalBoxes.toFixed(2)}</Typography>
//           <Typography variant="h6">Total Pieces: {totalPieces.toFixed(2)}</Typography>
//           <Button onClick={handleAddRow}>Add Row</Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSave}>Save</Button>
//           <Button onClick={onClose}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };
  
//    export default PackagingDialog;



import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

const PackagingDialog = ({ open, onClose, itemIndex, items, onSave }) => {
  const [localPackaging, setLocalPackaging] = useState([]);

  useEffect(() => {
    if (open && itemIndex !== undefined && items) {
      setLocalPackaging(items[itemIndex]?.packaging || []);
    }
  }, [open, itemIndex, items]);

  const handleAddRow = () => {
    setLocalPackaging([...localPackaging, { box: "", piecesPerBox: "" }]);
  };

  const handlePackingChange = (index, field, value) => {
    const updatedPackaging = localPackaging.map((pkg, i) =>
      i === index ? { ...pkg, [field]: value } : pkg
    );
    setLocalPackaging(updatedPackaging);
  };

  const handleSave = () => {
    const sanitizedPackaging = localPackaging.map(pkg => ({
      box: parseFloat(pkg.box) || 0,
      piecesPerBox: parseFloat(pkg.piecesPerBox) || 0,
    }));
    console.log("Saving packaging data:", sanitizedPackaging);
    onSave(itemIndex, sanitizedPackaging);
    onClose();
  };

  // Calculate totals
  const totalPieces = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.piecesPerBox) || 0) * (parseFloat(pkg.box) || 0), 0);
  const totalBoxes = localPackaging.reduce((sum, pkg) => sum + (parseFloat(pkg.box) || 0), 0);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Define Packaging</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Box Type</TableCell>
              <TableCell>Pieces per Box</TableCell>
              <TableCell>Total Pieces</TableCell>
              <TableCell>Total Boxes</TableCell>
              <TableCell>Generate Barcode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localPackaging.map((pkg, index) => {
              const boxValue = parseFloat(pkg.box) || 0;
              const piecesPerBoxValue = parseFloat(pkg.piecesPerBox) || 0;
              const rowTotalPieces = boxValue * piecesPerBoxValue;
              const rowTotalBoxes = boxValue;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      type="number"
                      value={pkg.box}
                      onChange={(e) => handlePackingChange(index, 'box', e.target.value)}
                      placeholder="Number of Boxes"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={pkg.piecesPerBox}
                      onChange={(e) => handlePackingChange(index, 'piecesPerBox', e.target.value)}
                      placeholder="Pieces per Box"
                    />
                  </TableCell>
                  <TableCell>
                    {rowTotalPieces.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {rowTotalBoxes.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleGenerateBarcode(index)}>Generate Barcode</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Typography variant="h6">Total Boxes: {totalBoxes.toFixed(2)}</Typography>
        <Typography variant="h6">Total Pieces: {totalPieces.toFixed(2)}</Typography>
        <Button onClick={handleAddRow}>Add Row</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackagingDialog;
