import axiosInstance from "../utils/axiosInstance";

export const register = async (formData) => {
    try {
        const response = await axiosInstance.post("/register",formData)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
        
    }
}
export const login= async (email,password)=>{
    try{
         const loginResponse=await axiosInstance.post("/login",{email,password})
         return loginResponse.data
    }catch(error){
        
        throw error.response?error.response.data:error;

    }
}