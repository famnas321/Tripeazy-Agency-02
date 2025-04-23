import axios from "axios";
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
export const authUser= async ()=>{
  try{
      const reponse = await axiosInstance.get("/authenticatedUser")
      return reponse.data
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
export const fetchAddedPackages = async (page, limit = 4,searchQuery,catagory) => {
  try {
    console.log(catagory,searchQuery,"this is catogory from just above of the api")
    const response = await axiosInstance.get("/packages/fetchPackages", {
      params: { page, limit,searchQuery,catagory},
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error; 
  }
};
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
export const addLike =  async ({status,packageId})=>{
  if(!status&& !packageId){
    console.log("there is no status in like api")
    return
  }
 try{
  console.log(status)
  
  const response = await axiosInstance.put("/packages/likes",{status,packageId})
  return response.data
 }catch(error){
  throw error.response?error.response.data:error;
 }
}