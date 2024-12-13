const express = require("express")
const userController = require("../controller/userController")
const router = express.Router()

router.get("/",userController.loginGet)
router.get("/signup",userController.signupGet)
router.post("/login",userController.loginPost)
router.post("/signup",userController.signupPost)
router.get("/home",userController.homepage)
router.post("/logout",userController.logOut)

module.exports = router