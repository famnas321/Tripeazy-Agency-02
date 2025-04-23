
// import mongoose from "mongoose";

// const likeSchema = new mongoose.Schema(
//   {
//     packageId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Package",
//       required: true,
//     },
//     status: {
//         type:Boolean,
//         default:false
//        },

//     likedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       refPath: "likedByModel",
//     },
//     likedByModel: {
//       type: String,
//       required: true,
//       enum: ["User", "Agency"],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Like", likeSchema);
