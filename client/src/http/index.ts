import axios from 'axios';

const $host = axios.create(
{
    baseURL: process.env.REACT_APP_API_URL
});

const $auth_host = axios.create(
{
    baseURL: process.env.REACT_APP_API_URL
});

const auth_interceptor = (config:any) => {

    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
};

$auth_host.interceptors.request.use(auth_interceptor);

export {
    $host,
    $auth_host
}