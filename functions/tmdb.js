const axios = require('axios');

const API_BASE_URL = 'https://api.themoviedb.org/3';

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: `You cannot make ${event.httpMethod} request!`,
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

    if (response.statusText !== 'OK') {
      return { statusCode: response.status, body: response.statusText };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error.message);

    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
