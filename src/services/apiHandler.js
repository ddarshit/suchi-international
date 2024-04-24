
import axios from 'axios';

const url = "https://suchi.backendapihub.com";
// API handler function
async function apiHandler(method, endpoint, data, headers = {}) {
  try {
    const response = await axios({
      method,
      url: url + endpoint,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default apiHandler;
