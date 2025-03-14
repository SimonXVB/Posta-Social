const followingController = require("../controllers/followingController");
const auth = require("../auth");
const { Router } = require("express");

const followingRouter = Router();

followingRouter.get("/followers/:userId", followingController.getFollowers);
followingRouter.get("/following/:userId", followingController.getFollowing);

followingRouter.post("/follow", auth.bodyAuth, followingController.follow);
followingRouter.post("/unfollow", auth.bodyAuth, followingController.unfollow);

module.exports = followingRouter;