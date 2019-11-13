import axios from 'axios';

const url = 'https://hubtec-rails.herokuapp.com'
// const url = 'http://localhost:3001';

const API = axios.create({ baseURL: url });

export default API;