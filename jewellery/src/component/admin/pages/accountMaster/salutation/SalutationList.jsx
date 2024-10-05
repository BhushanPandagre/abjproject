
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// // import api from '../../../../services/api';
// import api from '../../../../../services/api';

// const SalutationList = () => {
//   const [salutations, setSalutations] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSalutations = async () => {
//       try {
//         const response = await api.get('/api/salutations'); // Updated route for fetching all salutations
//         setSalutations(response.data);
//       } catch (error) {
//         console.error('Error fetching salutations:', error);
//         setError('Failed to fetch salutations');
//       }
//     };

//     fetchSalutations();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/api/salutation/${id}`);
//       setSalutations(salutations.filter(salutation => salutation._id !== id));
//     } catch (error) {
//       console.error('Error deleting salutation:', error);
//       setError('Failed to delete salutation');
//     }
//   };

//   return (
//     <div>
//       <h2>Salutations List</h2>
//       <Link to="/add_salutation">Create New Salutation</Link>
//       {error && <p>{error}</p>}
//       <ul>
//         {salutations.map(salutation => (
//           <li key={salutation._id}>
//             {salutation.salutation}
//             <Link to={`/update_salutation/${salutation._id}`}>Edit</Link>
//             <button onClick={() => handleDelete(salutation._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SalutationList;
