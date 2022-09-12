const userModel=require("../model/userModel");
const bcrypt= require('bcrypt')
const {generateJwt}=require("../config/jwt.config")
const {sendEmail}=require("../config/nodemailer.config")

exports.userSignup=async(req,res)=>{
    try {
        const {name,email,password,dateOfBirth}=req.body
        const doesUserExist = await userModel.find({email:email});
        if(doesUserExist.length>0){
            return res.status(200).json({
                status:false,
                message:"This email already exists"
            })
        }
        //Hashing the password is necessary to protect the user rights
        const hashedPassword= bcrypt.hashSync(password, 10, function(err, hash) {
             return hash;
        });
        const createUser=await userModel.create(
            {
                name:name,
                email:email,
                password:hashedPassword,
                dateOfBirth:dateOfBirth
            }
        )
        if(createUser){
            return res.status(200).json({
                status:true,
                message:"Registration Successfull!!",
                data:createUser
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.userLogin=async(req,res)=>{
    try {
        const {email,password} = req.body
        const findUser=await userModel.findOne({email:email});
        if (findUser){
            const checkPassword= bcrypt.compareSync(password,findUser.password);
            // console.log(checkPassword)
            if(checkPassword){
                const token=generateJwt(findUser)
                return res.status(200).json({
                    status:true,
                    checkPassword:checkPassword,
                    token:token
                })
            }
            else{
                return res.status(200).json({
                    status:true,
                    message:"Email or password is incorrect"
                })
            }
        }
        return res.status(200).json({
            status:true,
            message:"Email or password is incorrect"
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.updateProfile=async(req,res)=>{
    try {
        const id=req.user._id;
        const updateAccountInfo=await userModel.findByIdAndUpdate(id,req.body,{new:true});
        if(updateAccountInfo){
            return res.status(200).json({
                status:true,
                message:"Details updated successfully",
                data:updateAccountInfo
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.changePassword=async(req,res)=>{
    try {
        const {id}=req.user;
        const {password}=req.body;
        const getUser= await userModel.findById(id);
        const checkPassword= bcrypt.compareSync(password,getUser.password);
        if(checkPassword){
            return res.status(200).json({
                status:true,
                message:"Old password can't be same as new password"
            })
        }
        const hashedPassword= bcrypt.hashSync(password, 10, function(err, hash) {
            return hash;
       });
       const updatePassword= await userModel.findByIdAndUpdate(id,{password:hashedPassword},{new:true});
       return res.status(200).json({
            status:true,
            message:"Password changed successfully",
            data:updatePassword
       })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

exports.forgetPassword=async (req,res)=>{
    try {
        const {email}=req.body;
        const getUser=await userModel.findOne({email:email});
        if(!getUser){
            return res.status(200).json({
                status:false,
                message:"User not found"
            })
        }
        const token=generateJwt(getUser);
        const doesMailSent=await sendEmail(getUser.email,token);
        console.log(doesMailSent)
        return res.status(200).json({
            status:true,
            data:doesMailSent,
            message:"A verification email has been sent successfully to your mail id"
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}