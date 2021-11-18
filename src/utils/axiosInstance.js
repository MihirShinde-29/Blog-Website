import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://dhirajssh.pythonanywhere.com/api/'

let access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${access}`}
});

// axiosInstance.interceptors.request.use(async req => {
//     if(!authTokens){
//         authTokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
//         req.headers.Authorization = `Bearer ${authTokens?.access}`
//     }

//     if(authTokens) {
//         const user = jwt_decode(authTokens.access)
//         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//         if(!isExpired) return req
    
//         const response = await axios.post(`${baseURL}/token/refresh/`, {
//             refresh: authTokens.refresh
//           });
    
//         localStorage.setItem('tokens', JSON.stringify(response.data))
//         req.headers.Authorization = `Bearer ${response.data.access}`
//         return req
//     }
// }, (error) => {
//     console.log('Interceptor error', error)
//     return Promise.reject(error)
// })

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/log-in/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const access = JSON.parse(localStorage.getItem('access'))
			const refresh = JSON.parse(localStorage.getItem('refresh'))

			if (access) {
				const user = jwt_decode(access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

				if (isExpired) {
					return axiosInstance
						.post(`${baseURL}/token/refresh/`, { refresh: refresh })
						.then((response) => {
							console.log(response.data)
							localStorage.setItem('access', JSON.stringify(response.data.access))

							axiosInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					window.location.href = '/';
				}
			} else {
				console.log('Refresh token not available.');
			}
		}
		return Promise.reject(error);
	}
);


export default axiosInstance;