import User from "../models/user"
import { hashPassword,comparePassword } from "../helpers/auth.js";
export const register = async(req,res) => {
    const {name,email,password,secret} = req.body;

    //validation 
    if(!name) return res.status(400).send("Name is required");
    if(!password || password.length < 6)
        return res
            .status(400)
            .send("password is required and should be 6 character long");
    if(!secret) return res.status(400).send("answer is required");
    const exist = await User.findOne({email});
    if(exist)
        return res.status(400).send("email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);
    const user = new User({name, email, password:hashedPassword ,secret});
    try{
        // const hashpassword = await hashPassword(password);
        // const user = new User({name, email, password:hashpassword ,secret});
        await user.save();
        // console.log("registered user =>" ,user); 
        return res.json({
            ok:true,
        });
    }catch(err){
        console.log("register fail =>",err);
        return res.status(400).send("error, try again");
    }
}
 