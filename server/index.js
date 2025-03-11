const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./Routes/authRouter.js"); // ✅ use require()
const cookieParser = require("cookie-parser")
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api",authRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`MongoDB connected successfully...😎`))
    .catch((error) => console.log(error, "Error occurred while connecting to MongoDB...😡"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...👩‍💻🤸‍♂️`));
