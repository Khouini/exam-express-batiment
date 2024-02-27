const UserModel = require("../models/user");

async function addUserWithGet(req, res) {
    try {
        const {name, email, cin} = req.query;
        const user = new UserModel({
            name,
            email,
            cin,
        });
        const savedUser = await user.save();
        return res.json(savedUser);
    } catch (error) {
        console.log('🚀 ~ router.get ~ error:', error);
        return res.send(error.message);
    }
}

async function addUSer(req, res) {
    try {
        const {name, email, cin} = req.body;
        const user = new UserModel({
            name,
            email,
            cin,
        });
        const savedUser = await user.save();
        return res.json(savedUser);
    } catch (error) {
        console.log('🚀 ~ router.get ~ error:', error.message);
        return res.status(400).send({
            error,
        });
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params;
        const {name, email, cin} = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                cin,
            },
            {new: true}
        );
        return res.json(updatedUser);
    } catch (error) {
        console.log('🚀 ~ router.put ~ error:', error.message);
        return res.status(400).send({
            error,
        });
    }
}

async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log('🚀 ~ router.delete ~ error:', error.message);
        return res.status(400).send({
            error,
        });
    }
}

async function getUserByName(req, res) {
    try {
        const {name} = req.params;
        const user = await UserModel.findOne({name});
        return res.json(user);
    } catch (error) {
        console.log('🚀 ~ router.get ~ error:', error.message);
        return res.status(400).send({
            error,
        });
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserModel.find();
        return res.json(users);
    } catch (error) {
        console.log('🚀 ~ router.get ~ error:', error.message);
        return res.status(400).send({
            error,
        });
    }
}

module.exports = {
    addUserWithGet,
    addUSer,
    updateUser,
    deleteUser,
    getUserByName,
    getUsers,
};