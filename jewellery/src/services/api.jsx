


// src/services/api.js

import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:5000/';

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Default Content-Type
  },
});

// Example of setting Content-Type dynamically for a multipart/form-data request
// api.post('/upload', formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// });

export default api;
