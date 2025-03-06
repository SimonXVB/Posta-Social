const followingQueries = require("../queries/followingQueries");

async function follow(req, res) {
    try {
        const { userId, followUserId } = req.body;

        await followingQueries.followDB(userId, followUserId);

        return res.status(200).json("follow");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
};

async function unfollow(req, res) {
    try {
        const { userId, followUserId } = req.body;

        await followingQueries.unfollowDB(userId, followUserId);

        return res.status(200).json("unfollow");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
};

async function checkFollow(req, res) {
    try {
        const { userId, followUserId } = req.body;

        const check = await followingQueries.getFollowingDB(userId);

        if(check.following.some(e => Number(e.id) === Number(followUserId))) {
            return res.status(200).json(true);
        } else {
            return res.status(200).json(false);
        };
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    };
};

async function getFollowers(req, res) {
    try {
        const { userId } = req.params;

        const followers = await followingQueries.getFollowersDB(userId);

        return res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

async function getFollowing(req, res) {
    try {
        const { userId } = req.params;

        const following = await followingQueries.getFollowingDB(userId);

        return res.status(200).json(following);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

module.exports = {
    follow,
    unfollow,
    checkFollow,
    getFollowers,
    getFollowing
}