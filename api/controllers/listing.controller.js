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
export const getListing = async(req, res,next) => {
    try{
        const userId = req.params.id;
        const listings = await Listing.find({userId});
        return res.status(200).json(listings);
    }
    catch(error){
        next(error);
    }
}
export const deleteListing = async(req, res,next) => {
    try{
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return res.status(404).json({message: 'Listing not found'});
        }
        if(req.user.id !== listing.userRef){
            return res.status(401).json({message: 'You are not authorized to delete this listing'});
        }
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: 'Listing deleted successfully'});
    }
    catch(error){
        next(error);
    }
}
export const editListing = async(req, res,next) => {
    try{
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return res.status(404).json({message: 'Listing not found'});
        }
        if(req.user.id !== listing.userRef){
            return res.status(401).json({message: 'You are not authorized to edit this listing'});
        }
        const listingUpdated =  await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json({message: 'Listing edited successfully',listingUpdated});
    }
    catch(error){
        next(error);
    }
}