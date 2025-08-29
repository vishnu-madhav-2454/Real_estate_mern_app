import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaParking,
  FaCouch,
  FaTag,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/${id}`);
        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message || "Failed to load listing");
        } else {
          setListing(data.listings[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const totalSlides = listing?.imageUrls?.length || 0;
  const goToSlide = (index) => {
    if (totalSlides === 0) return;
    const next = (index + totalSlides) % totalSlides;
    setCurrentSlide(next);
  };
  const goNext = () => goToSlide(currentSlide + 1);
  const goPrev = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    if (!listing?.imageUrls || listing.imageUrls.length < 2) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => ((prev + 1) % listing.imageUrls.length));
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [listing]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-2xl font-semibold text-red-600 animate-pulse flex items-center gap-2">
          <FaHome className="animate-bounce" /> Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black">
      {error && (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 rounded-lg shadow-md flex items-center gap-3">
          <FaTag className="text-red-700" /> {error}
        </div>
      )}
      {!error && listing && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Image Slider */}
          {listing.imageUrls && listing.imageUrls.length > 0 && (
            <div className="mb-12 relative">
              {listing.imageUrls.length === 1 ? (
                <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={listing.imageUrls[0]}
                    alt="Main Property"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[420px] md:h-[540px] rounded-2xl overflow-hidden shadow-xl bg-gray-50">
                  {listing.imageUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Slide ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                        currentSlide === idx ? "opacity-100" : "opacity-0"
                      }`}
                      draggable={false}
                    />
                  ))}
                  {/* Controls */}
                  <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-md"
                  >
                    <FaArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-md"
                  >
                    <FaArrowRight className="h-5 w-5" />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10">
                    {listing.imageUrls.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-2.5 rounded-full transition-all ${
                          currentSlide === idx
                            ? "w-8 bg-red-600"
                            : "w-2.5 bg-gray-300 hover:bg-red-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-red-600 tracking-tight mb-2 flex items-center gap-2">
                  <FaHome /> {listing.name}
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <FaTag /> {listing.address}
                </p>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 text-sm rounded-full bg-red-50 text-red-700 border border-red-200 capitalize font-medium flex items-center gap-1">
                  <FaHome /> {listing.type}
                </span>
                {listing.offer && (
                  <span className="px-4 py-2 text-sm rounded-full bg-green-50 text-green-700 border border-green-200 font-medium flex items-center gap-1">
                    <FaTag /> On Offer
                  </span>
                )}
                {listing.furnished && (
                  <span className="px-4 py-2 text-sm rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium flex items-center gap-1">
                    <FaCouch /> Furnished
                  </span>
                )}
                {listing.parking && (
                  <span className="px-4 py-2 text-sm rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium flex items-center gap-1">
                    <FaParking /> Parking
                  </span>
                )}
              </div>
              {/* Description */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <FaHome /> About this property
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {listing.description}
                </p>
              </div>
              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: "Type", value: listing.type, icon: <FaHome /> },
                  { label: "Bedrooms", value: listing.bedrooms, icon: <FaBed /> },
                  { label: "Bathrooms", value: listing.bathrooms, icon: <FaBath /> },
                  { label: "Furnished", value: listing.furnished ? "Yes" : "No", icon: <FaCouch /> },
                  { label: "Parking", value: listing.parking ? "Yes" : "No", icon: <FaParking /> },
                  { label: "Offer", value: listing.offer ? "Yes" : "No", icon: <FaTag /> },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-md"
                  >
                    <span className="block text-gray-500 text-sm mb-1 flex items-center gap-1">
                      {feature.icon} {feature.label}
                    </span>
                    <span className="font-semibold text-lg">{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-white border border-red-100 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                  <FaTag /> Price Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                      <FaTag /> Regular Price
                    </p>
                    <p className="text-3xl font-bold text-gray-900">₹{listing.regularPrice}</p>
                  </div>
                  {listing.discountedPrice && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <FaTag /> Discounted Price
                      </p>
                      <p className="text-3xl font-bold text-green-600">₹{listing.discountedPrice}</p>
                    </div>
                  )}
                </div>
                <button className="w-full bg-red-600 text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg mt-8 flex items-center justify-center gap-2">
                  <FaPhoneAlt /> Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
