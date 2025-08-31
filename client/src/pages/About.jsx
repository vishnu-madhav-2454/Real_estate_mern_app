import React from "react";
import { motion } from "framer-motion";
import { Building2, Home, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto bg-white">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-8 text-slate-800 text-center"
      >
        About {" "}
        <span className="font-semibold bg-red-500 text-white rounded-2xl px-4 py-2 inline-flex items-center shadow-md">
          <span className="text-black">Buy</span>Land
        </span>
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-10 text-lg text-slate-700 text-center max-w-3xl mx-auto"
      >
        <span className="font-semibold bg-red-500 text-white rounded px-2 py-1 inline-flex items-center">
          <span className="text-black">Buy</span>Land
        </span>{" "}
        is your trusted partner in real estate. From buying, selling, or renting
        properties, our mission is to make the journey smooth, transparent, and
        rewarding.
      </motion.p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white shadow-lg border border-slate-200 text-center"
        >
          <Building2 className="mx-auto text-red-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Who We Are</h2>
          <p className="text-slate-600">
            A leading real estate agency with years of expertise in the most
            desirable neighborhoods, dedicated to exceptional service.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white shadow-lg border border-slate-200 text-center"
        >
          <Home className="mx-auto text-red-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Our Mission</h2>
          <p className="text-slate-600">
            To empower clients with expert advice, personalized service, and a
            clear path to achieving their property goals.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white shadow-lg border border-slate-200 text-center"
        >
          <MapPin className="mx-auto text-red-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Why Choose Us</h2>
          <p className="text-slate-600">
            Our experienced agents bring deep knowledge, trust, and a
            client-first approach to make real estate an exciting journey.
          </p>
        </motion.div>
      </div>

      {/* Closing Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 bg-red-500 rounded-2xl p-10 text-center shadow-lg"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Turning Your Dreams Into Reality
        </h2>
        <p className="text-white text-lg max-w-3xl mx-auto">
          At <span className="font-bold text-black">Buy</span>Land, we believe
          buying or selling a property should be more than a transaction – it
          should be a rewarding and memorable experience.
        </p>
      </motion.div>
    </div>
  );
}