const productModel = require("../model/productModel");

exports.createProduct=async(req,res)=>{
    try {
        const {name,imageUrl,price,description,rating,category}=req.body
        const addProduct=productModel.create({
            name:name,
            imageUrl:imageUrl,
            price:price,
            rating:rating,
            description:description,
            category:category
        })
        if(addProduct){
            return res.status(200).json({
                status: true,
                message: "Product created successfully",
                data:addProduct
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.updateProduct=async (req,res)=>{
    try {
        const {productId}=req.body;
        const updateProduct = await productModel.findByIdAndUpdate(productId,req.body,{new:true})
        if(updateProduct){
            return res.status(200).json({
                status: true,
                message: "Product updated successfully",
                data:updateProduct
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.deleteProductById=async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteProduct=await productModel.findByIdAndDelete(id);
        if(deleteProduct){
            return res.status(200).json({
                status: true,
                message: "Product deleted successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.getProductByCategory=async(req,res)=>{
    try {
        const {categoryId}=req.params;
        const data= await productModel.find({category:categoryId});
        return res.status(200).json({
            status: true,
            data:data,
            length:data.length
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}