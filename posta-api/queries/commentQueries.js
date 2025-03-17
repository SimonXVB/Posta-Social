const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCommentDB(content, userId, postId) {
    try {
        await prisma.comment.create({
            data: {
                content: content,
                author: {
                    connect: {
                        id: Number(userId)
                    }
                },
                post: {
                    connect: {
                        id: Number(postId)
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function deleteCommentDB(id) {
    try {
        await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function likeCommentDB(userId, commentId) {
    try {
        await prisma.comment.update({
            where: {
                id: Number(commentId)
            },
            data: {
                userLikes: {
                    connect: {
                        id: Number(userId)
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function unlikeCommentDB(userId, commentId) {
    try {
        await prisma.comment.update({
            where: {
                id: Number(commentId)
            },
            data: {
                userLikes: {
                    disconnect: {
                        id: Number(userId)
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function getCommentsDB(userId) {
    try {
        const comments = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                comments: {
                    select: {
                        content: true,
                        id: true,
                        postId: true,
                        date: true,
                        author: {
                            select: {
                                username: true,
                                id: true
                            }
                        },
                        userLikes: {
                            select: {
                                id: true
                            }
                        }
                    },
                    orderBy: {
                        date: "desc"
                    }
                }
            }
        });

        return comments;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getPostCommentsDB(postId) {
    try {
        const comments = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            },
            select: {
                comments: {
                    select: {
                        content: true,
                        id: true,
                        postId: true,
                        date: true,
                        author: {
                            select: {
                                username: true,
                                id: true
                            }
                        },
                        userLikes: {
                            select: {
                                id: true
                            }
                        }
                    },
                    orderBy: {
                        date: "desc"
                    }
                }
            }
        });

        return comments;
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function getLikedCommentsDB(userId) {
    try {
        const likes = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                likedComments: {
                    select: {
                        content: true,
                        id: true,
                        date: true,
                        postId: true,
                        author: {
                            select: {
                                username: true,
                                id: true
                            }
                        },
                        userLikes: {
                            select: {
                                id: true
                            }
                        }
                    },
                    orderBy: {
                        date: "desc"
                    }
                }
            }
        });

        return likes;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

module.exports = {
    createCommentDB,
    deleteCommentDB,
    likeCommentDB,
    unlikeCommentDB,
    getCommentsDB,
    getPostCommentsDB,
    getLikedCommentsDB
}