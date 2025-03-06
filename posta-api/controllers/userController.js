const userQueries = require("../queries/userQueries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
    try {
        const { username, password, bio } = req.body;

        if(username === "" || password === "" || bio === "") {
            return res.status(400).json("empty");
        };

        const hash = bcrypt.hashSync(password, 10);

        await userQueries.createUserDB(username, hash, bio);

        return res.status(201).json("created");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    };
};

async function updateUser(req, res) {
    try {
        const { userId, newUsername, bio } = req.body;

        if(newUsername === "" || bio === "") {
            return res.status(400).json("empty");
        };

        await userQueries.updateUserDB(userId, newUsername, bio);

        return res.status(200).json("updated");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
};

async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        await userQueries.deleteUserDB(userId);

        return res.status(200).json("deleted");
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
};

async function getUser(req, res) {
    try {
        const { userId } = req.params;

        const user = await userQueries.getUserDB(userId);
        
        if(!user) {
            return res.status(500).json("error");
        };

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }  
};

async function getCurrentUser(req, res) {
    try {
        const token = req.cookies.token;
        const jwtUser = jwt.verify(token, process.env.SECRET);

        const user = await userQueries.getUserDB(jwtUser.userId);

        if(!user) {
            return res.status(200).json("error");
        };

        return res.status(200).json(user);
    } catch (error) {
        return res.status(200).json("error");
    }
};

async function getAllUsers(req, res) {
    try {
        const users = await userQueries.getAllUsersDB();

        if(!users) {
            return res.status(200).json("error");
        };

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(200).json("error");
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
            return res.status(400).json("userError");
        };

        if(user.username === username && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                {userId: user.id},
                process.env.SECRET,
                {expiresIn: "1d"}
            );

            return res.status(200).cookie("token", token, {maxAge: 1000*60*60*24, httpOnly: true}).json("login");
        } else {
            return res.status(400).json("userError");
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json("error");
    }
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
    getAllUsers,
    login,
    logout
}