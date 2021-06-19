const axios = require('axios');

const API_BASE_URL = 'https://api.themoviedb.org/3';

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You cannot make ${event.httpMethod} request.`,
      }),
    };
  }

  const { path, ...query } = event.queryStringParameters;

  try {
    const response = await axios.get(`${API_BASE_URL}/${path}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        ...query,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // output to netlify function log
    console.log('--- error message:', error.message);

    return {
      statusCode: error.response.status,
      body: JSON.stringify({
        message: error.response?.data.status_message ?? error.message,
      }),
    };
  }
};

module.exports = { handler };
