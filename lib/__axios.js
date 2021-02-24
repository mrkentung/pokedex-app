import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const createApiRequest = async (url, method, data) => {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
    // const statusCode = err.response.status;
    // const messages = err.response.data.data[0].messages;
    // throw new Error(JSON.stringify({ statusCode, messages }));
  }
};
