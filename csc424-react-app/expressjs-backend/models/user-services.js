const { mongoose } = require('mongoose');
const { userModel } = require('./user.js');
const { bcrypt } = require('bcrypt');
const { jwt } = require('jsonwebtoken');


mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsersByName(name) {
  try {
    const usersList = await userModel.find({ name: { $regex: new RegExp(name, "i") } });
    return usersList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function findUserById(id) {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addUser(user) {
  try {
    const newUser = new userModel(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function login(username, password) {
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ username: user.username }, "your-secret-key");
    user.token = token;
    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function register(username, password, validatePassword) {
  try {
    if (password !== validatePassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      throw new Error(
        "Password not strong enough. Your password must meet these requirements:\n - At least 8 characters\n - At least one capital letter\n - At least one number\n - At least one special character"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  addUser,
  getUsersByName,
  findUserById,
  login,
  
};

exports.register = register;