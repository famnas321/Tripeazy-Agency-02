const cloudinary = require("../config/cloudinary");
const packageModel = require("../model/PackageModel");

exports.imageUpload = async (files, userId, type) => {
    try {
        if (!files || files.length === 0) {
            return { status: 400, message: "No files uploaded" };
        }

        const folderMap = {
            profile: "profile-images",
            blog: "blogs",
            package: "packages",
        };

        const folder = folderMap[type] || "default-images";

        // 🔥 Upload each image in parallel and store their URLs
        const uploadedImages = await Promise.all(
            files.map((file) =>
                new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result.secure_url);
                        }
                    ).end(file.buffer);
                })
            )
        );

        console.log("Images uploaded successfully:", uploadedImages);

        if (type === "package") {
            await packageModel.findByIdAndUpdate(
                userId,
                { $set: {images:uploadedImages}}, // Store an array of image URLs
                { new: true }
            );
        }

        return { status: 200, images: uploadedImages, type };
    } catch (error) {
        console.error("Error uploading images:", error);
        return { status: 500, message: "Server error" };
    }
};
