const userQueries = require("../queries/userQueries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
    try {
        const { username, password} = req.body;

        if(username === "" || password === "") {
            return res.status(400).json("empty");
        };

        if(username.length >= 25) {
            return res.status(400).json("length");
        };

        const hash = bcrypt.hashSync(password, 10);

        await userQueries.createUserDB(username, hash);

        return res.status(201).json("created");
    } catch (error) {
        if(error.code === "P2002") {
            return res.status(400).json("existsError");
        };

        console.error(error);
        return res.status(500).json("internalError");
    };
};

async function updateUser(req, res) {
    try {
        const { userId, newUsername, bio } = req.body;

        if(newUsername === "" || bio === "") {
            return res.status(400).json("empty");
        };

        if(newUsername.length > 25 || bio.length > 50) {
            return res.status(400).json("length");
        };

        await userQueries.updateUserDB(userId, newUsername, bio);

        return res.status(200).json("updated");
    } catch (error) {

        if(error.code === "P2002") {
            return res.status(400).json("existsError");
        };
        
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        await userQueries.deleteUserDB(userId);

        return res.status(200).json("deleted");
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function getUser(req, res) {
    try {
        const { userId } = req.params;

        const user = await userQueries.getUserDB(userId);
        const currentUser = await returnCurrentUser(req);

        if(currentUser && user?.followedBy.some(e => e.id === currentUser.id)) {
            return res.status(200).json({ ...user, isFollowing: true});
        } else {
            return res.status(200).json({ ...user, isFollowing: false});
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }  
};

async function getCurrentUser(req, res) {
    try {
        const token = req.cookies.token;

        if(token) {
            const jwtUser = jwt.verify(token, process.env.SECRET);
            const user = await userQueries.getUserDB(jwtUser.userId);

            if(user === null) {
                return res.status(200).clearCookie("token").json("logout");
            };
    
            return res.status(200).json(user);
        } else {
            return res.status(200).json(false);
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }
};

async function returnCurrentUser(req) {
    try {
        const token = req.cookies.token;

        if(!token) {
            return false;
        };

        const jwtUser = jwt.verify(token, process.env.SECRET);
        const user = await userQueries.getUserDB(jwtUser.userId);

        return user;
    } catch (error) {
        console.error(error);
        throw new Error("internalError");
    };
};

async function getAllUsers(req, res) {
    try {
        const currentUser = await returnCurrentUser(req);
        const users = await userQueries.getAllUsersDB();

        const newUsers = users.filter(e => {
            return e.id !== currentUser.id;
        });

        return res.status(200).json(newUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    }  
};

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if(username === "" || password === "") {
            return res.status(400).json("empty");
        };

        const user = await userQueries.getLoginUserDB(username);

        if(user === null) {
            return res.status(400).json("noUserError");
        };

        if(user.username.toLowerCase() === username.toLowerCase() && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                {userId: user.id},
                process.env.SECRET,
                {expiresIn: "1d"}
            );

            return res.status(200).cookie("token", token, {maxAge: 1000*60*60*24, httpOnly: true}).json("login");
        } else {
            return res.status(400).json("passwordError");
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    };
};

function logout(req, res) {
    return res.status(200).clearCookie("token").json("logout");
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getCurrentUser,
    returnCurrentUser,
    getAllUsers,
    login,
    logout
}