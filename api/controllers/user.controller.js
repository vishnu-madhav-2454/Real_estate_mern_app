import { errorHandler } from "../utilis/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";


export const test = (req,res) => {
    res.send('Test route is working');
}

export const updateUserinfo = async (req, res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,"UnAuthorized!"));
    }
    try{
        if(req.body.password){
            req.body.password = await bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});

        const {password,...others} = updatedUser._doc;
        res.status(200).json(others);
    }
    catch(err){
        next(err);
    }
};
export const deleteUser = async (req, res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,"UnAuthorized!"));
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token",{httpOnly:true,secure:true,sameSite:"none"});
        res.status(200).json("User has been deleted")
    }
    catch(err){
        next(err);
    }
};
