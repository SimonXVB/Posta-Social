const commentQueries = require("../queries/commentQueries");
const { returnCurrentUser } = require("./userController");

async function createComment(req, res) {
    try {
        const { content, userId, postId } = req.body;

        if(content === "") {
            return res.status(400).json("empty");
        };

        await commentQueries.createCommentDB(content, userId, postId);

        return res.status(201).json("created");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function deleteComment(req, res) {
    try {
        const { id } = req.body;

        await commentQueries.deleteCommentDB(id);

        return res.status(200).json("deleted");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function likeComment(req, res) {
    try {
        const { userId, commentId } = req.body;

        await commentQueries.likeCommentDB(userId, commentId);

        return res.status(200).json("liked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }  
};

async function unlikeComment(req, res) {
    try {
        const { userId, commentId } = req.body;

        await commentQueries.unlikeCommentDB(userId, commentId);

        return res.status(200).json("unliked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }  
};

async function getComments(req, res) {
    try {
        const { userId } = req.params;

        const comments = await commentQueries.getCommentsDB(userId);
        const checkedComments = await checkCommentLikes(req, comments.comments);

        return res.status(200).json(checkedComments);
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }; 
};

async function getPostComments(req, res) {
    try {
        const { postId } = req.params;
        
        const comments = await commentQueries.getPostCommentsDB(postId);
        const checkedComments = await checkCommentLikes(req, comments.comments);

        return res.status(200).json(checkedComments);
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function getLikedComments(req, res) {
    try {
        const { userId } = req.params;

        const commentLikes = await commentQueries.getLikedCommentsDB(userId);
        const checkedPostComments = await checkCommentLikes(req, commentLikes.likedComments);

        return res.status(200).json(checkedPostComments);
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function checkCommentLikes(req, comments) {
    try {
        const currentUser = await returnCurrentUser(req);  

        if(!currentUser) {
            return comments;
        } else {
            const newComments = [];
            comments.forEach(comment => {
                if(comment.userLikes.some(e => e.id === currentUser.id)) {
                    newComments.push({...comment, isLiked: true});
                } else {
                    newComments.push({...comment, isLiked: false});
                };
            });
    
            return newComments;
        };
    } catch (error) {
        throw new Error("internalError");
    };
};

module.exports = {
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
    getComments,
    getPostComments,
    getLikedComments
}