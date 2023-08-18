import axios from "axios";

export const userApi = axios.create({
    baseURL: process.env.REACT_APP_USER_BASE_URL,
});

userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("userToken");
    }
    return req;
});





export const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_BASE_URL,
});

adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem("adminToken")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("adminToken");
    }
    return req;
});







export const ownerApi = axios.create({
    baseURL: process.env.REACT_APP_OWNER_BASE_URL,
});

ownerApi.interceptors.request.use((req) => {
    if (localStorage.getItem("ownerToken")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("ownerToken");
    }
    return req;
},error=>{
    return Promise.reject(error)
});

// export const cloudApi = axios.create({
//     baseURL: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_API}/image`,
// });