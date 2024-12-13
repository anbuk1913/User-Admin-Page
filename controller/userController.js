const bcrypt = require('bcrypt')
const usercollection = require("../model/userModel");

const loginGet = async (req, res) => {
  if (req.session.signup || req.session.login) {
    res.redirect("/home");
  } else {
    logError = req.session.logError;
    res.render("user/login", { logError });
  }
};

const signupGet = async (req, res) => {
  if (req.session.signup || req.session.login) {
    res.redirect("/home");
  } else {
    signError = req.session.signError;
    res.render("user/signUp", { signError });
  }
};

async function comparePassword(enteredPassword, storedPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
  return isMatch;
}

const loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userData = await usercollection.findOne({ email: req.body.email });
    if (userData) {
      if (await comparePassword(req.body.password,userData.password)) {
        req.session.login = true;
        req.session.phone = userData.phone;
        req.session.user = userData.name;
        req.session.email = req.body.email;
        res.redirect("/");
      } else {
        req.session.logError = "Incorrect Email or Password";
        res.redirect("/");
      }
    } else {
      req.session.logError = "Incorrect Email or Password";
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

async function encryptPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const signupPost = async (req, res) => {
    const hashedPassword = await encryptPassword(req.body.password)
    const user = new usercollection({
    name: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword
  });
  const userExists = await usercollection.findOne({ email: req.body.email });
  if (userExists) {
    req.session.signError = "Email already Exits!";
    signError = req.session.signError;
    res.redirect("/signup");
  } else {
    req.session.signup = true;
    await user.save();
    req.session.user = req.body.username;
    req.session.phone = req.body.phone;
    req.session.email = req.body.email;
    req.session.signup = true;
    res.redirect("/");
  }
};

const homepage = async (req, res) => {
  if (req.session.signup || req.session.login) {
    userVer = await usercollection.findOne({ email: req.session.email });
    if (userVer) {
      const user = userVer.name;
      const phone = userVer.phone;
      res.render("user/home", { user, phone });
    } else {
      req.session.email = null;
      req.session.login = false;
      req.session.signup = false;
      res.redirect("/");
    } 
    } else {
        res.redirect("/")
    }
};

const logOut = async (req, res) => {
  req.session.user = null;
  req.session.logError = null;
  req.session.signError = null;
  req.session.login = false;
  req.session.signup = false;
  req.session.phone = null;
  req.session.email = null;
  res.redirect("/");
};

module.exports = {
  loginGet,
  signupGet,
  loginPost,
  signupPost,
  homepage,
  logOut,
};
