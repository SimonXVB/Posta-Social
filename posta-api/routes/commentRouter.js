const commentController = require("../controllers/commentController");
const auth = require("../auth");
const { Router } = require("express");

const commentRouter = Router();

commentRouter.get("/comments/:userId", commentController.getComments);

commentRouter.post("/comment", auth.bodyAuth, commentController.createComment);
commentRouter.post("/likeComment", auth.bodyAuth, commentController.likeComment);
commentRouter.post("/unlikeComment", auth.bodyAuth, commentController.unlikeComment);


commentRouter.delete("/comment", auth.bodyAuth, commentController.deleteComment);

module.exports = commentRouter;