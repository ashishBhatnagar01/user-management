const userController= require("../controllers/userController")
const express = require("express")
const router=express.Router();
const {verifyUser}=require("../middleware/tokenDecoder")

router.post("/register",userController.userSignup)
router.post("/login",userController.userLogin)
router.post("/changePassword",verifyUser,userController.changePassword)
router.patch("/updateProfile",verifyUser,userController.updateProfile)
router.get("/forgetPassword",userController.forgetPassword)

module.exports = router;