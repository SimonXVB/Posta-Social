const commentQueries = require("../queries/commentQueries");

async function createComment(req, res) {
    try {
        const { content, userId, postId } = req.body;

        if(content === "") {
            return res.status(400).json("empty");
        }

        await commentQueries.createCommentDB(content, userId, postId);

        return res.status(201).json("created");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function deleteComment(req, res) {
    try {
        const { id } = req.body;

        await commentQueries.deleteCommentDB(id);

        return res.status(200).json("deleted");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function likeComment(req, res) {
    try {
        const { userId, commentId } = req.body;

        await commentQueries.likeCommentDB(userId, commentId);

        return res.status(200).json("liked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function unlikeComment(req, res) {
    try {
        const { userId, commentId } = req.body;

        await commentQueries.unlikeCommentDB(userId, commentId);

        return res.status(200).json("unliked");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function getComments(req, res) {
    try {
        const { userId } = req.params;

        const comments = await commentQueries.getCommentsDB(userId);

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
    }  
};

module.exports = {
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
    getComments
}