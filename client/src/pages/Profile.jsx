import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/user.slice";
import { Link } from "react-router-dom";

// Purely design-focused profile page (red/black/white)
export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const [showlistingserror, setShowlistingserror] = useState(false);
  const [listings, setListings] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.sucess === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      alert("Profile updated successfully!");
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      console.log(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.sucess === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      alert("Account deleted successfully!");
      window.location.href = "/";
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const Handlesignout = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      dispatch(deleteUserSuccess());
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.sucess === false) {
        console.log(data.message);
        setShowlistingserror(true);
        return;
      }
      console.log(data.listings);
      setListings(data.listings);
      setShowlistingserror(false);
    } catch (error) {
      console.log(error);
      setShowlistingserror(true);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.sucess === false) {
        console.log(data.message);
        return;
      }
      alert("Listing deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-black/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-4 py-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-black">
            Profile
          </h1>
        </div>

        {/* Card */}
        <div className="mt-6 rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
            {/* Left: Avatar */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-black/10 bg-black/[0.02]">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-black ring-4 ring-red-500/20 select-none">
                    <img
                      src={currentUser.photo}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder={currentUser.username}
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={currentUser.email}
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={handleChange}
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl px-5 py-2.5 font-semibold bg-red-500 text-white shadow hover:brightness-95"
                  >
                    {loading ? "Loading" : "Update"}
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl px-5 py-2.5 font-semibold border border-black hover:bg-black hover:text-white transition"
                    onClick={Handlesignout}
                  >
                    Sign Out
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl px-5 py-2.5 font-semibold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                  <Link
                    to="/create-listing"
                    className="flex-1 rounded-xl px-5 py-2.5 font-semibold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition text-center"
                  >
                    Create Listing
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Show Listings Button */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={handleShowListings}
          className="w-full rounded-xl px-5 py-2.5 font-semibold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition text-center"
        >
          Show Listings
        </button>

        {showlistingserror && (
          <p className="text-red-500 mt-2">Error showing listings</p>
        )}

        {listings.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="flex flex-col gap-2 border rounded-xl p-3"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{listing.name}</h3>
                  <p className="text-sm text-gray-500">{listing.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-blue-500 hover:text-blue-600">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/listing/${listing._id}`}>
                    <button className="text-green-500 hover:text-green-600">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
