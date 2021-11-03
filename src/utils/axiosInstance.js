import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://dhirajssh.pythonanywhere.com/api/'

let authTokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('tokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})

export default axiosInstance;