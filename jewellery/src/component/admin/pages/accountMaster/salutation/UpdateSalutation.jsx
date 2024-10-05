// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// // import api from '../../../../services/api';
// import api from '../../../../../services/api';


// const UpdateSalutation = () => {
//   const [salutation, setSalutation] = useState('');
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSalutation = async () => {
//       try {
//         const response = await api.get(`/api/salutation/${id}`);
//         setSalutation(response.data.salutation);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSalutation();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`api/salutation/${id}`, { salutation });
//       navigate('/salutation_list');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Salutation</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={salutation}
//           onChange={(e) => setSalutation(e.target.value)}
//           required
//         />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateSalutation;
