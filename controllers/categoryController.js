const categoryModel=require("../model/categoryModel")

exports.createCategory = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(200).json({
                status:true,
                message:"Please login to your account"
            })
        }
        let {name}=req.body;
        const createCategory=await categoryModel.create({name:name})
        return res.status(200).json({
            status: true,
            message:"Category created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.deleteCategory = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(200).json({
                status:true,
                message:"Please login to your account"
            })
        }
        const {categoryId}=req.params;
        //#TODO:Delete Products
        const delCategory=await categoryModel.findByIdAndDelete(categoryId);
        if(delCategory){
            return res.status(200).json({
                status:true,
                message:"Category deleted successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.updateCategory = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(200).json({
                status:true,
                message:"Please login to your account"
            })
        }
        const {categoryId}=req.params;
        const updateCat=await categoryModel.findByIdAndUpdate(categoryId,req.body,{new:true});
        if(updateCat){
            return res.status(200).json({
                status:true,
                message:"Category updated successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.getAllCategories = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(200).json({
                status:true,
                message:"Please login to your account"
            })
        }
        const getCategories=await categoryModel.find({}).sort({"createdAt":-1});
        return res.status(200).json({
            status:true,
            data:getCategories,
            length:getCategories.length
        })

    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}