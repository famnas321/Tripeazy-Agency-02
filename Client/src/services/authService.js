import axiosInstance from "../utils/axiosInstance";
import axiosInstanceFile from "src/utils/axiosInstanceFile";
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
export const addPackages =async (formData,updatedFields)=>{
    
    try{

        for (const [key, value] of Object.entries(updatedFields)) {
            formData.append(key, value);
          }
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1],"this is form api source page");
          }

       const addPackagesResponse = await axiosInstanceFile.post("/packages/addPackages",formData)
       return addPackagesResponse.data
    }catch(error){
        throw error.response?error.response.data:error;

    }
}
export const fetchAddedPackages =async (formData,updatedFields)=>{
  try{
        const fetchPackageResponse = await axiosInstance.get("/packages/fetchPackages")
        return fetchPackageResponse.data
  }catch(error){
    throw error.response?error.response.data:error 
  }
}
export const addOrganizedPackage = async (formData,updatedFields)=>{
      try{

        if (!(formData instanceof FormData)) {
          throw new Error("formData is not an instance of FormData");
        }
    
        for (const [key, value] of Object.entries(updatedFields)) {
          formData.append(key, value);
        }  
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
          console.log("this is from api source")
        }

         
         const orgaizedPackageResponse = await axiosInstanceFile.post("/packages/organizedPackages",formData)
         return orgaizedPackageResponse.data

      }catch(error){
        throw error.response?error.response.data:error;
      }
}

export const fetchOrganisedPackage = async ()=>{
  try{
      const response= await axiosInstance.get("/packages/getOrganizedPackages")
      return response.data
  }catch(error){
    throw error.response?error.response.data:error;
  }
}