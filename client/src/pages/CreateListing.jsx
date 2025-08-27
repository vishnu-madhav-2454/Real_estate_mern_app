import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
 // Adjust the import based on your auth setup


export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    discountedPrice: "",
    bathrooms: "",
    bedrooms: "",
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    imageUrls: [],

  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFiles(Array.from(files));
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      if(formData.imageUrls.length === 0){
        return alert("Please upload images before submitting!");
      }
      if(formData.offer && Number(formData.discountedPrice) >= Number(formData.regularPrice)){
        return alert("Discounted price must be less than regular price");
      }
      setLoading(true);
      setError(null);
      const res = await fetch("/api/listing/create",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id || "defaultUserId" // Replace with actual user ID
        }),
      })
      const data = await res.json();
      setLoading(false);
      if(data.success){
        alert("Listing created successfully!");
        setFormData({
          name: "",
          description: "",
          address: "",
          regularPrice: "",
          discountedPrice: "",
          bathrooms: "",
          bedrooms: "",
          furnished: false,
          parking: false,
          type: "rent",
          offer: false,
          imageUrls: [],
        });
        setFiles([]);
        navigate(`/${data._id}`);
      }
      else{
        setError(data.message || "Failed to create listing");
      }
    }
    catch(error){
      setError(error.message);
      setLoading(false);
    }
    
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Resume_Project");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbbxinlsg/image/upload",
        { method: "POST", body: data }
      );
      const json = await res.json();
      if (json.secure_url) return json.secure_url;
      throw new Error(json.error?.message || "Upload failed");
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw error;
    }
  };

  const handleClick = async () => {
    if (files.length === 0) return alert("Please select images first!");
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...urls] }));
      alert("Images uploaded successfully!");
    } catch {
      alert("Image upload failed.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      address: "",
      regularPrice: "",
      discountedPrice: "",
      bathrooms: "",
      bedrooms: "",
      furnished: false,
      parking: false,
      type: "rent",
      offer: false,
      imageUrls: [],
    });
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          Create Listing
        </h1>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
          <form className="p-6 grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter listing name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Regular Price (₹)
                </label>
                <input
                  type="number"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Discounted Price (₹)
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-black/20 rounded"
                />
                Furnished
              </label>
              <label className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-black/20 rounded"
                />
                Parking
              </label>
              <label className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  name="offer"
                  checked={formData.offer}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-black/20 rounded"
                />
                Offer
              </label>
            </div>

            {/* Type (radio) */}
            <div className="flex gap-6 text-black">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="rent"
                  checked={formData.type === "rent"}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-black/20"
                />
                Rent
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="sale"
                  checked={formData.type === "sale"}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-black/20"
                />
                Sale
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Upload Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={handleClick}
                className="mt-2 rounded-lg px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
              >
                Upload Images
              </button>
            </div>

            {/* Preview */}
            {formData.imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.imageUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Uploaded preview"
                    className="rounded-lg border"
                  />
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl px-5 py-2.5 font-semibold bg-red-500 border border-red-500 text-white hover:bg-white hover:text-red-500 transition"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                type="reset"
                className="flex-1 rounded-xl px-5 py-2.5 font-semibold border bg-black text-white border-black hover:bg-white hover:text-black transition"
                onClick={handleReset}
              >
                Reset
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
