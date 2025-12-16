const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./Routes/authRouter.js"); 
const blogRouter = require("./Routes/blog.router.js")
const cookieParser = require("cookie-parser")
const userRoutes = require("./Routes/create.router.js")
const packageRouter =require("./Routes/packageRoutes")
const subscription  = require("./Routes/subscriptionRoute.js")
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api",authRouter);
app.use("/api/agency/auth",userRoutes);
app.use("/api/blogs",blogRouter)
app.use("/api/packages",packageRouter)
app.use("/api/subscription",subscription)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`MongoDB connected successfully...😎`))
    .catch((error) => console.log(error, "Error occurred while connecting to MongoDB...😡"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...👩‍💻🤸‍♂️`))
