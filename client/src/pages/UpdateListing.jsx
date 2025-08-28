
// UpdateListing page log
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
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
  const { id } = useParams();

  // Fetch existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data && !data.message) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            address: data.address || "",
            regularPrice: data.regularPrice || "",
            discountedPrice: data.discountedPrice || "",
            bathrooms: data.bathrooms || "",
            bedrooms: data.bedrooms || "",
            furnished: data.furnished || false,
            parking: data.parking || false,
            type: data.type || "rent",
            offer: data.offer || false,
            imageUrls: data.imageUrls || [],
          });
        } else {
          setError(data.message || "Failed to fetch listing");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch listing");
        setLoading(false);
      }
    };
    fetchListing();
    // eslint-disable-next-line
  }, [id]);

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
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
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
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
      return alert("Please upload images before submitting!");
    }
    if (
      formData.offer &&
      Number(formData.discountedPrice) >= Number(formData.regularPrice)
    ) {
      return alert("Discounted price must be less than regular price");
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/listing/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id || "defaultUserId",
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data && data.message === "Listing edited successfully") {
        alert("Listing updated successfully!");
        navigate(`/`);
      } else {
        setError(data.message || "Failed to update listing");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-black">
            Update Listing
          </h1>
        </div>
        <div className="mt-6 rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
          <form className="p-6" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="grid grid-cols-1 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
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
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              {/* Price, Discounted Price, Bedrooms, Bathrooms */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Regular Price
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
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
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
              {/* Type, Offer, Furnished, Parking */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-7">
                  <input
                    type="checkbox"
                    name="offer"
                    checked={formData.offer}
                    onChange={handleChange}
                  />
                  <label className="text-sm font-semibold text-black">
                    Offer
                  </label>
                </div>
                <div className="flex items-center gap-2 mt-7">
                  <input
                    type="checkbox"
                    name="furnished"
                    checked={formData.furnished}
                    onChange={handleChange}
                  />
                  <label className="text-sm font-semibold text-black">
                    Furnished
                  </label>
                </div>
                <div className="flex items-center gap-2 mt-7">
                  <input
                    type="checkbox"
                    name="parking"
                    checked={formData.parking}
                    onChange={handleChange}
                  />
                  <label className="text-sm font-semibold text-black">
                    Parking
                  </label>
                </div>
              </div>
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
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
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="reset"
                  className="flex-1 rounded-xl px-5 py-2.5 font-semibold border bg-black text-white border-black hover:bg-white hover:text-black transition"
                  onClick={handleReset}
                >
                  Reset
                </button>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
