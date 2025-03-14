const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUserDB(username, password) {
    try {
        await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function updateUserDB(userId, newUsername, bio) {
    try {
        await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                username: newUsername,
                bio: bio
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function deleteUserDB(userId) {
    try {
        await prisma.user.delete({
            where: {
                id: Number(userId)
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserDB(userId) {
    try {
        const user = await prisma.user.findUnique({
            omit: {
                password: true
            },
            where: {
                id: Number(userId)
            },
            include: {
                posts: {
                    select: {
                        id: true,
                        content: true
                    }, 
                    orderBy: {
                        date: "desc"
                    }
                },
                following: {
                    select: {
                        id: true
                    }
                },
                followedBy: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getAllUsersDB() {
    try {
        const users = await prisma.user.findMany({
            select: {
                username: true,
                id: true
            }
        });

        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getLoginUserDB(username) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    createUserDB,
    updateUserDB,
    deleteUserDB,
    getUserDB,
    getLoginUserDB,
    getAllUsersDB
}