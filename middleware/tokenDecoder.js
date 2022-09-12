const jwt=require('jsonwebtoken')
const verifyUser=async(req,res,next)=>{
    // console.log("Hey")
    const token=req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedToken=jwt.verify(token,process.env.SECRET_KEY)
        if(decodedToken){
            req.user=decodedToken;
            console.log(decodedToken)
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports={verifyUser}