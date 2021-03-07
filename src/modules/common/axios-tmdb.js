import axios from 'axios';

const axiosTMDB = axios.create({
  baseURL: '/.netlify/functions/tmdb',
});

export default axiosTMDB;
