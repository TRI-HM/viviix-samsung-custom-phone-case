import axios from 'axios';

export const sendJsonRequest = async (requestJson) => {
  console.log(requestJson);
  try {
    const response = await axios.post('https://3ddisplaybox.com:4500/user', requestJson);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
