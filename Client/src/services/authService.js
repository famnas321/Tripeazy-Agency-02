import axiosInstance from "../utils/axiosInstance";

export const register = async (formData) => {
    try {
        const response = await axiosInstance.post("/register",formData)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
        
    }
}