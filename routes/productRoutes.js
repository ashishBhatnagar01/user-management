const productController= require("../controllers/productController")
const express = require("express")
const router=express.Router();
const {verifyUser}=require("../middleware/tokenDecoder")

router.post("/createProduct",verifyUser.apply,productController.createProduct)
router.patch("/updateProduct",verifyUser.apply,productController.updateProduct)
router.delete("/deleteProduct/:id",verifyUser,productController.deleteProductById)
router.get("/getProductByCategory",verifyUser,productController.getProductByCategory)

module.exports = router