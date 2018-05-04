import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbackend.firebaseio.com/'
})

export default instance;