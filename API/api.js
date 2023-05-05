import axios from 'axios'

const ApiManager = axios.create ({
    baseURL: 'http://31.220.6.67:3000/api/',
    responseType: 'json',
    withCredentials: true

});

export default ApiManager