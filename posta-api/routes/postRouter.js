const postController = require("../controllers/postController");
const auth = require("../auth");
const { Router } = require("express");

const postRouter = Router();

postRouter.get("/posts/:userId", postController.getPosts);
postRouter.get("/followingPosts/:userId", postController.getFollowingPosts);
postRouter.get("/logoutPosts", postController.getLogoutPosts);
postRouter.get("/likedPosts/:userId", postController.getLikedPosts);
postRouter.get("/post/:postId", postController.getPost);

postRouter.post("/post", auth.bodyAuth, postController.createPost);
postRouter.post("/like", auth.bodyAuth, postController.likePost);
postRouter.post("/unlike", auth.bodyAuth, postController.unlikePost);

postRouter.delete("/post", auth.bodyAuth, postController.deletePost);

module.exports = postRouter;