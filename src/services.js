import axios from 'axios';

const url = 'http://10.50.29.112:3001';
// const url = 'http://localhost:3001';

const API = axios.create({ baseURL: url });

export default API;