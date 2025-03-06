const postQueries = require("../queries/postQueries");

async function createPost(req, res) {
    try {
        const { content, userId } = req.body;

        if(content === "") {
            return res.status(400).json("empty");
        };

        await postQueries.createPostDB(content, userId);

        return res.status(201).json("created");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function deletePost(req, res) {
    try {
        const { id } = req.body;

        await postQueries.deletePostDB(id);

        return res.status(201).json("deleted");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
};

async function like(req, res) {
    try {
        const { userId, postId } = req.body;

        await postQueries.likeDB(userId, postId);

        return res.status(200).json("liked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function unlike(req, res) {
    try {
        const { userId, postId } = req.body;

        await postQueries.unlikeDB(userId, postId);

        return res.status(200).json("unliked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
};

async function getPosts(req, res) {
    try {
        const { userId } = req.params;

        const posts = await postQueries.getPostsDB(userId);

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

async function getFollowingPosts(req, res) {
    try {
        const { userId } = req.params;

        const posts = await postQueries.getFollowingPostsDB(userId);

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

async function getLogoutPosts(req, res) {
    try {
        const { userId } = req.params;

        const posts = await postQueries.getLogoutPostsDB(userId);

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};


async function checkLikes(req, res) {
    try {
        const { userId, postId } = req.body;

        const check = await postQueries.getLikesDB(userId);

        if(check.likedPosts.some(e => e.id === postId) || check.likedComments.some(e => e.id === postId)) {
            return res.status(200).json(true);
        } else {
            return res.status(200).json(false);
        };
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    };
};

async function getLikes(req, res) {
    try {
        const { userId } = req.params;

        const likes = await postQueries.getLikesDB(userId);

        return res.status(200).json(likes);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

async function getPost(req, res) {
    try {
        const { postId } = req.params;

        const posts = await postQueries.getPostDB(postId);

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

module.exports = {
    createPost,
    deletePost,
    like,
    unlike,
    getPosts,
    checkLikes,
    getLikes,
    getFollowingPosts,
    getLogoutPosts,
    getPost
}