const postController = require("../controllers/postController");
const auth = require("../auth");
const { Router } = require("express");

const postRouter = Router();

postRouter.get("/posts/:userId", postController.getPosts);
postRouter.get("/followingPosts/:userId", postController.getFollowingPosts);
postRouter.get("/logoutPosts", postController.getLogoutPosts);
postRouter.get("/likes/:userId", postController.getLikes);
postRouter.get("/post/:postId", postController.getPost);

postRouter.post("/post", auth.bodyAuth, postController.createPost);
postRouter.post("/like", auth.bodyAuth, postController.like);
postRouter.post("/unlike", auth.bodyAuth, postController.unlike);
postRouter.post("/checkLikes", postController.checkLikes);

postRouter.delete("/post", auth.bodyAuth, postController.deletePost);

module.exports = postRouter;