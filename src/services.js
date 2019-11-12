import axios from 'axios';

// const url = 'http://192.168.15.87:3001';
const url = 'http://localhost:3001';

const API = axios.create({ baseURL: url });

export default API;