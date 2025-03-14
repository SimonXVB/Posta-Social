const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function followDB(userId, followUserId) {
    try {
        await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                following: {
                    connect: {
                        id: Number(followUserId)
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function unfollowDB(userId, followUserId) {
    try {
        await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                following: {
                    disconnect: {
                        id: Number(followUserId)
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getFollowingDB(userId) {
    try {
        const following = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                following: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
        });

        return following;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getFollowersDB(userId) {
    try {
        const followers = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                followedBy: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });

        return followers;
    } catch (error) {
        console.log(error);
        throw error;
    }  
};

module.exports = {
    followDB,
    unfollowDB,
    getFollowingDB,
    getFollowersDB
}