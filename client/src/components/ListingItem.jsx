import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto overflow-hidden">
      <Link to={`/listing/${listing._id}`} className="block">
        {/* Image on Top */}
        <div className="w-full h-48 sm:h-56 overflow-hidden">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg"
            }
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Information Below */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-slate-800 truncate">
            {listing.name}
          </h2>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-2 text-gray-600">
            <MdLocationOn className="text-green-700" />
            <p className="truncate text-sm">{listing.address}</p>
          </div>

          {/* Description */}
          <p className="text-gray-500 mt-2 line-clamp-2 text-sm">
            {listing.description}
          </p>

          {/* Price & Beds/Baths */}
          <div className="flex justify-between items-center mt-3">
            <p className="text-lg font-bold text-blue-600">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>

            <div className="flex gap-3 text-sm font-medium text-gray-700">
              <span>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
              </span>
              <span>
                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
