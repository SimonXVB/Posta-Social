const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createPostDB(content, userId) {
    try {  
        await prisma.post.create({
            data: {
                content: content,
                author: {
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

async function deletePostDB(id) {
    try {
        await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function likeDB(userId, postId) {
    try {
        await prisma.post.update({
            where: {
                id: Number(postId)
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

async function unlikeDB(userId, postId) {
    try {
        await prisma.post.update({
            where: {
                id: Number(postId)
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

async function getPostsDB(userId) {
    try {
        const posts = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                posts: {
                    select: {
                        content: true,
                        id: true,
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

        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getPostLikesDB(userId) {
    try {
        const likes = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                likedPosts: {
                    select: {
                        content: true,
                        id: true,
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

        return likes;
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

async function getFollowingPostsDB(userId) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    OR: [
                        {
                            id: Number(userId)
                        }, 
                        {
                            followedBy: {
                                some: {
                                    id: Number(userId)
                                }
                            }
                        }
                    ]
                }
            },
            select: {
                    content: true,
                    id: true,
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
        });
        
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getLogoutPostsDB() {
    try {
        const posts = await prisma.post.findMany({
            select: {
                    content: true,
                    id: true,
                    date: true,
                    author: {
                        select: {
                            username: true,
                            id: true
                        }
                    }
                },
                orderBy: {
                    date: "desc"
                }
        });
        
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getPostDB(postId) {
    try {
        const posts = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            },
            select: {
                    content: true,
                    id: true,
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
                }
        });
        
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



module.exports = {
    createPostDB,
    deletePostDB,
    likeDB,
    unlikeDB,
    getPostsDB,
    getPostLikesDB,
    getFollowingPostsDB,
    getLogoutPostsDB,
    getPostDB
}