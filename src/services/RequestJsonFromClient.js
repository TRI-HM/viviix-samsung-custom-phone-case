import axios from 'axios';

export const sendJsonRequest = async (requestJson) => {
  console.log(requestJson);
  try {
    const response = await axios.post('http://localhost:30000/insertuser', requestJson);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
