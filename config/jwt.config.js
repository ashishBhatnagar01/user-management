const jwt=require('jsonwebtoken')

const generateJwt=(user)=>{
    const token = jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY);
    return token;
}

module.exports={generateJwt}