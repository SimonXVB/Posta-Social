const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const followingRouter = require("./routes/followingRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173", 
}));
app.use(userRouter);
app.use(followingRouter);
app.use(postRouter);
app.use(commentRouter);

app.listen(8080, () => console.log("Server up and running..."));