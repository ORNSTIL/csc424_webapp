const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
mongoose.set("debug", true);
mongoose.set('strictQuery',false);
dotenv.config();

mongoose
      .connect(process.env.MONGO.URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));



async function getAllUsers() {
	console.log("in user sesrvices");
    return await userModel.find();
}

async function addUser(user) {
    try {
      const userToAdd = new userModel(user);
      const savedUser = await userToAdd.save();
      return savedUser;
    } catch (error) {
      console.log(error);
      return false;
    }
}


async function findUserById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}

async function loginCheck(username, password) {
    
    return (await userModel.find({username: username, password: password}))[0] !==  undefined;
}

async function findUser(username, password) {
    return await userModel.find({username: username, password: password});
}

async function userExistsCheck(username){
  return (await userModel.find({ username: username }))[0] !== undefined;
}

async function findUserByUsername(username) {
    return await userModel.find({ username: username });

}



exports.findUserById = findUserById;
exports.findUser = findUser;
exports.findUserByUsername = findUserByUsername;
exports.addUser = addUser;
exports.getAllUsers = getAllUsers;
exports.userExistsCheck = userExistsCheck;
exports.loginCheck = loginCheck;
