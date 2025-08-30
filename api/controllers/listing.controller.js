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
        const listings = await Listing.find({_id : userId});
        return res.status(200).json({listings,sucess:true});
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
export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };