import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-2xl mx-auto">
      <Link
        to={`/listing/${listing._id}`}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch p-4 sm:p-0"
      >
        {/* Image */}
        <div className="w-full sm:w-1/3 flex-shrink-0">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg"
            }
            alt={listing.name}
            className="w-full h-48 sm:h-52 object-cover rounded-t-2xl sm:rounded-xl shadow"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between w-full sm:w-2/3 py-2 sm:py-4 px-0 sm:px-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 truncate">
              {listing.name}
            </h2>

            {/* Location */}
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <MdLocationOn className="text-green-700 text-base sm:text-lg" />
              <p className="truncate text-xs sm:text-sm">{listing.address}</p>
            </div>

            {/* Description */}
            <p className="text-gray-500 mt-2 line-clamp-2 text-xs sm:text-sm">
              {listing.description}
            </p>
          </div>

          {/* Price & Beds/Baths */}
          <div className="mx-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-slate-700">
            <p className="text-base sm:text-lg font-bold text-blue-600">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <div className="flex gap-4 text-xs sm:text-sm font-medium">
              <span>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </span>
              <span>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
