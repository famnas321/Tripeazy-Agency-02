export const postSearch = (input, filteredData) => {
    const lowerCaseInput = input.toLowerCase();
    const searchData = filteredData.filter((item) => 
        item.destination.toLowerCase().includes(lowerCaseInput) ||
        item.agencyId.companyName.toLowerCase().includes(lowerCaseInput)
    );
    if (searchData.length > 0) {
        // console.log("Matching items found:", searchData);
    } else {
        console.log("No matching items found.");
    }
    return searchData;
};