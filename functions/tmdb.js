const axios = require('axios');

const API_BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  'Content-Type': 'application/json',
};

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 400,
      headers,
      body: `You cannot make ${event.httpMethod} request.`,
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
      headers,
    };
  } catch (error) {
    // output to netlify function log
    console.log('--- error message:', error.message);

    return {
      statusCode: error.response.status,
      headers,
      body: error.response?.data.status_message ?? error.message,
    };
  }
};

module.exports = { handler };
