"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin, Home, IndianRupee,Search } from "lucide-react";

const HeroSection = () => {
  // Tabs State
  const [activeTab, setActiveTab] = useState("buy");

  // Search Form State
  const [location, setLocation] = useState("bangalore");
  const [propertyType, setPropertyType] = useState("villa");
  const [budget, setBudget] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Buy", "Rent", "PG", "Plot", "Commercial", "Post Free Property Ad"];

  const handleSearch = () => {
    console.log({
      activeTab,
      location,
      propertyType,
      budget,
      searchQuery,
    });

    // You can navigate or trigger an API search here.
    alert(`Searching for ${propertyType} in ${location} under ${budget}`);
  };

  return (
    <div className="relative bg-white pt-12 pb-16 flex flex-col items-center overflow-hidden">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
          Welcome back! Start your{" "}
          <span className="text-red-600">#PataBadloLifeBadlo</span> Journey
        </h1>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap justify-center items-center gap-5 mt-8 text-gray-700 font-semibold text-lg"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-1 transition duration-300 ${
              activeTab === tab.toLowerCase()
                ? "border-b-2 border-red-600 text-red-600"
                : "hover:text-red-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="bg-white rounded-full shadow-xl flex flex-wrap lg:flex-nowrap items-center w-full max-w-6xl mt-8 px-4 py-4 border border-gray-200 hover:shadow-2xl transition-all duration-300"
      >
        {/* Location Selector */}
        <div className="flex items-center space-x-3 px-4 border-r border-gray-300 w-full lg:w-1/4">
          <MapPin className="w-5 h-5 text-red-500" />
          <Select onValueChange={setLocation} defaultValue={location}>
            <SelectTrigger className="w-full border-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="flex items-center space-x-3 px-4 border-r border-gray-300 w-full lg:w-1/4">
          <Home className="w-5 h-5 text-red-500" />
          <Select onValueChange={setPropertyType} defaultValue={propertyType}>
            <SelectTrigger className="w-full border-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="plot">Plot</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="flex items-center space-x-3 px-4 border-r border-gray-300 w-full lg:w-1/4">
          <IndianRupee className="w-5 h-5 text-red-500" />
          <Select onValueChange={setBudget}>
            <SelectTrigger className="w-full border-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">₹20L - ₹40L</SelectItem>
              <SelectItem value="40">₹40L - ₹80L</SelectItem>
              <SelectItem value="80">₹80L - ₹1.5Cr</SelectItem>
              <SelectItem value="150">₹1.5Cr+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex items-center px-4 w-full lg:w-2/4">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Project / Locality / Builder"
            className="border-0 shadow-none focus:ring-0 focus:outline-none w-full text-gray-800"
          />
        </div>

        {/* Search Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-md transition-all duration-300"
          >
              <Search className="w-5 h-5 text-white-500" /> Search
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
