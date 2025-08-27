import Listing from "../models/listing.model.js";


export const createlisting = async(req, res,next) => {
    try{
        const newListing = new Listing(req.body);
        await newListing.save();
        return res.status(201).json({newListing});
    }
    catch(error){
        next(error);
    }
};