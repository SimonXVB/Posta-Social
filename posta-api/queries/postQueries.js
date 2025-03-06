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
        throw error;
    }
};

async function getLikesDB(userId) {
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
                },
                likedComments: {
                    select: {
                        content: true,
                        id: true,
                        postId: true,
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
                }
            }
        });

        return likes;
    } catch (error) {
        throw error;
    }  
};

async function getFollowingPostsDB(userId) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    followedBy: {
                        some: {
                            id: Number(userId)
                        }
                    }
                }
            },
            select: {
                    content: true,
                    id: true,
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
        throw error;
    }
};

async function getLogoutPostsDB() {
    try {
        const posts = await prisma.post.findMany({
            select: {
                    content: true,
                    id: true,
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
                    },
                    comments: {
                        select: {
                            id: true,
                            content: true,
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
        throw error;
    }
};



module.exports = {
    createPostDB,
    deletePostDB,
    likeDB,
    unlikeDB,
    getPostsDB,
    getLikesDB,
    getFollowingPostsDB,
    getLogoutPostsDB,
    getPostDB
}