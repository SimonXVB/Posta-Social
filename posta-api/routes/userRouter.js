const userController = require("../controllers/userController");
const auth = require("../auth");
const { Router } = require("express");

const userRouter = Router();

userRouter.post("/user", userController.createUser);
userRouter.put("/user", auth.bodyAuth, userController.updateUser);
userRouter.get("/user/:userId", userController.getUser);
userRouter.get("/user", userController.getCurrentUser);
userRouter.get("/all", userController.getAllUsers);

userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

//userRouter.delete("/user/:userId", auth.paramsAuth, userController.deleteUser);

module.exports = userRouter;