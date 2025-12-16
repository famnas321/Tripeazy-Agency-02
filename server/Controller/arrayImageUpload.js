const cloudinary = require("../config/cloudinary");
const packageModel = require("../model/PackageModel");
const organizedPackage= require("../model/organizedPackage")

exports.imageUpload = async (files, userId, type,replace) => {
    console.log(files,userId,type,"this is from image upload")
    try {
        if (!files || files.length === 0) {
            return { status: 400, message: "No files uploaded" };
        }
       
        const folderMap = {
            profile: "profile-images",
            blog: "blogs",
            package: "packages",
            Organized:"Organized Package"
        };

        const folder = folderMap[type] || "default-images";

        
        const uploadedImages = await Promise.all(
            files.map((file) =>
                new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve({
                                url: result.secure_url,
                                public_id: result.public_id
                            });;
                        }
                    ).end(file.buffer);
                })
            )
        );

        console.log("Images uploaded successfully:", uploadedImages);
        const query= replace? { $set: { images: uploadedImages } } 
      : { $push: { images: { $each: uploadedImages } } };

        if (type === "package") {
            await packageModel.findByIdAndUpdate(
                userId,
                query, 
                { new: true }
            );
        }
       
        if (type === "Organized Package") {
            await organizedPackage.findByIdAndUpdate(
                userId,
               query, 
                { new: true }
            );
        }

        return { status: 200, images: uploadedImages, type };
    } catch (error) {
        console.error("Error uploading images:", error);
        return { status: 500, message: "Server error" };
    }
};



exports.deleteImage = async (packageId, indices) => {
  try {
    const pkg = await packageModel.findById(packageId);
    if (!pkg) {
      throw new Error("Package not found");
    }

   
    if (!Array.isArray(indices)) {
      indices = [indices];
    }

   
    indices.sort((a, b) => b - a);

    for (const index of indices) {
      const imageToDelete = pkg.images[index];
      if (!imageToDelete) continue;

     
      await cloudinary.uploader.destroy(imageToDelete.public_id);

      
      pkg.images.splice(index, 1);
    }

    
    await pkg.save();

    console.log("images deleted successfully");
    return { status: 200, message: "Images deleted successfully" };
  } catch (error) {
    console.error("Error deleting images:", error);
    return { status: 500, message: "Failed to delete images" };
  }
};
