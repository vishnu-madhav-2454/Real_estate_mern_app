import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { motion } from "framer-motion";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-10 md:p-14 text-center border border-slate-200"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Find your next <span className="text-red-500">perfect place</span>{" "}
            with ease
          </h1>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Browse through the best offers, rentals, and sales around you. Start
            your journey with {" "}
            <span className="font-semibold bg-red-500 text-white rounded px-2 py-1 inline-flex items-center">
              <span className="text-black">Buy</span>Land
            </span>
          </p>

          <Link
            to="/search"
            className="inline-block mt-6 px-8 py-3 bg-red-500 text-white rounded-2xl shadow-lg hover:bg-red-600 transition font-semibold text-lg"
          >
            🔍 Start Exploring
          </Link>
        </motion.div>

        {/* Swiper Section */}
        {offerListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 mt-10"
          >
            <Swiper
              navigation
              className="rounded-2xl overflow-hidden shadow-xl border border-slate-200"
              slidesPerView={1}
              spaceBetween={0}
              style={{ minHeight: "260px" }}
            >
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <Link to={`/listing/${listing._id}`}>
                    <div
                      style={{
                        background: `url(${listing.imageUrls[0]}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                      className="h-[260px] md:h-[400px] w-full transition-all duration-300"
                    >
                      <div className="bg-black/30 h-full w-full flex items-end p-4 rounded-2xl">
                        <span className="text-white text-lg font-semibold bg-red-500/80 px-4 py-2 rounded-xl shadow">
                          {listing.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* Listings Sections */}
        <div className="flex flex-col gap-12">
          {offerListings.length > 0 && (
            <Section
              title="✨ Recent Offers"
              link="/search?offer=true"
              listings={offerListings}
            />
          )}
          {rentListings.length > 0 && (
            <Section
              title="🏠 Places for Rent"
              link="/search?type=rent"
              listings={rentListings}
            />
          )}
          {saleListings.length > 0 && (
            <Section
              title="💰 Places for Sale"
              link="/search?type=sale"
              listings={saleListings}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, link, listings }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <Link
        to={link}
        className="text-red-500 hover:underline text-sm font-medium"
      >
        Show more →
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingItem listing={listing} key={listing._id} />
      ))}
    </div>
  </motion.div>
);
