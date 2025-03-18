import axios from "axios";

const axiosInstanceFile = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
    headers:{
        "Content-Type": "multipart/form-data", 
    },
})

export default axiosInstanceFile;