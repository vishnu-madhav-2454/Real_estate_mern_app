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
