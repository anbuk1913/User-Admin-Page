const express = require("express")
const adminController = require("../controller/adminController")
const router = express.Router()

router.get("/admin",adminController.adminGet)
router.get("/adminhome",adminController.adminHome)
router.post("/adminver",adminController.adminVer)
router.post("/adminlogout",adminController.adminLogout)
router.get("/adminedit/:id",adminController.adminEdit)
router.get("/admin/edit",adminController.adminEditGet)
router.put("/update/profile",adminController.adminUpdate)
router.post('/adminadd',adminController.addUser)
router.delete("/userDelete",adminController.adminDelete)

module.exports = router
