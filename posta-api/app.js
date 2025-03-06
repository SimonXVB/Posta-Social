const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const followingRouter = require("./routes/followingRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.PORT, 
    credentials: true
}));
app.use(userRouter);
app.use(followingRouter);
app.use(postRouter);
app.use(commentRouter);

app.listen(8080, () => console.log("Server up and running..."));