import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { motion } from "framer-motion";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative background like Profile */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-black/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-10 gap-6"
      >
        {/* Sidebar */}
        <div className="p-6 rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] md:min-h-screen md:w-80">
          <h2 className="text-xl font-bold text-black mb-4">Filters</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Search Term */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Search Term
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold mb-1">Type</label>
              <div className="flex flex-col gap-2 text-sm">
                {["all", "rent", "sale", "offer"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={opt}
                      checked={sidebardata.type === opt || sidebardata[opt]}
                      onChange={handleChange}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="capitalize">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Amenities
              </label>
              <div className="flex flex-col gap-2 text-sm">
                {["parking", "furnished"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={opt}
                      checked={sidebardata[opt]}
                      onChange={handleChange}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="capitalize">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold mb-1">Sort</label>
              <select
                onChange={handleChange}
                defaultValue={"createdAt_desc"}
                id="sort_order"
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>

            <button
              className="rounded-xl px-5 py-2.5 font-semibold bg-red-500 text-white shadow hover:brightness-95"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-black mb-4">Results</h1>
          <div className="flex flex-wrap gap-6">
            {!loading && listings.length === 0 && (
              <p className="text-lg text-gray-500">No listing found!</p>
            )}
            {loading && (
              <p className="text-lg text-gray-500 w-full text-center">
                Loading...
              </p>
            )}

            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}

            {showMore && (
              <button
                onClick={onShowMoreClick}
                className="w-full rounded-xl px-5 py-2.5 font-semibold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
