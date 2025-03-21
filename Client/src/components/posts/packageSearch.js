export const postSearch = (input, filteredData) => {
    let error={}
    const lowerCaseInput = input.toLowerCase();
    const searchData = filteredData.filter((item) => 
        item.destination.toLowerCase().includes(lowerCaseInput) ||
        item.agencyId.companyName.toLowerCase().includes(lowerCaseInput)
    );
    if (searchData.length > 0) {
        // console.log("Matching items found:", searchData);
        
    } else {
         error={message:"no data is provide"}
        console.log("No." ,error.message);
      
    }
    return {searchData,error}
};