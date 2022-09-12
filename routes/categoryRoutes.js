const categoryController = require('../controllers/categoryController')
const express= require('express')
const router=express.Router()
const {verifyUser}= require('../middleware/tokenDecoder')

router.post("/createCategory",verifyUser,categoryController.createCategory)
router.delete("/deleteCategory/:categoryId",verifyUser,categoryController.deleteCategory)
router.patch("/updateCategory/:categoryId",verifyUser,categoryController.updateCategory)
router.get("/getAllCategories",verifyUser,categoryController.getAllCategories)

module.exports=router;