const postQueries = require("../queries/postQueries");
const { returnCurrentUser } = require("./userController");

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
        return res.status(500).json("internalError");
    }  
};

async function deletePost(req, res) {
    try {
        const { id } = req.body;

        await postQueries.deletePostDB(id);

        return res.status(201).json("deleted");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function likePost(req, res) {
    try {
        const { userId, postId } = req.body;

        await postQueries.likeDB(userId, postId);

        return res.status(200).json("liked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function unlikePost(req, res) {
    try {
        const { userId, postId } = req.body;

        await postQueries.unlikeDB(userId, postId);

        return res.status(200).json("unliked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function getPosts(req, res) {
    try {
        const { userId } = req.params;

        const posts = await postQueries.getPostsDB(userId);
        const checkedPosts = await checkPostLikes(req, posts.posts);
        
        return res.status(200).json(checkedPosts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("internalError");
    }
};

async function getFollowingPosts(req, res) {
    try {
        const { userId } = req.params;

        const posts = await postQueries.getFollowingPostsDB(userId);
        const checkedPosts = await checkPostLikes(req, posts);

        return res.status(200).json(checkedPosts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("internalError");
    }  
};

async function getLogoutPosts(req, res) {
    try {
        const posts = await postQueries.getLogoutPostsDB();

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(200).json("internalError");
    }  
};

async function getPost(req, res) {
    try {
        const { postId } = req.params;

        const post = await postQueries.getPostDB(postId);
        const checkedPost = await checkPostLikes(req, [post]);

        return res.status(200).json(checkedPost);
    } catch (error) {
        console.error(error);
        return res.status(200).json("internalError");
    }  
};

async function getLikedPosts(req, res) {
    try {
        const { userId } = req.params;

        const postLikes = await postQueries.getPostLikesDB(userId);
        const checkedPostLikes = await checkPostLikes(req, postLikes.likedPosts);

        return res.status(200).json(checkedPostLikes);
    } catch (error) {
        console.error(error);
        return res.status(200).json("internalError");
    }  
};

async function checkPostLikes(req, posts) {

    try {
        const currentUser = await returnCurrentUser(req);

        if(!currentUser) {
            return posts;
        } else {
            const newPosts = [];
            posts.forEach(post => {
                if(post.userLikes.some(e => e.id === currentUser.id)) {
                    newPosts.push({...post, isLiked: true});
                } else {
                    newPosts.push({...post, isLiked: false});
                };
            });
    
            return newPosts;
        };  
    } catch (error) {
        throw new Error("internalError");
    };
};

module.exports = {
    createPost,
    deletePost,
    likePost,
    unlikePost,
    getPosts,
    getLikedPosts,
    getFollowingPosts,
    getLogoutPosts,
    getPost
}