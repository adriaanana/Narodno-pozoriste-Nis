import { default as axios } from 'axios';
import { axiosConfig } from './config';
// import { authKeys } from 'utils/constants/localStorageKeys';
// import { uniqueAuthStoreName } from 'store/AuthStore';

// Init the axios instance
const api = axios.create(axiosConfig);

// Set default headers for all routes
api.defaults.headers.common['Content-Type'] = 'application/json';

// // Add an interceptor for secured routes
// api.interceptors.request.use(
//   (config) => {
//     // Modify the request config for secured routes
//     if (config.url.includes(securedRoutePrefix)) {
//       // Get the auth store from the localStorage
//       const authStore = JSON.parse(localStorage.getItem(uniqueAuthStoreName));

//       // Get the accessToken if they exist - and put on Authorization header
//       const accessToken = authStore.state?.[authKeys.accessToken];
//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
