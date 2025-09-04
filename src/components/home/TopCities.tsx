"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const cities = [
  {
    name: "Delhi / NCR",
    image: "/images/icons/city.jpg",
    properties: "233,000+ Properties",
  },
  {
    name: "Bangalore",
    image: "/images/icons/city.jpg",
    properties: "62,000+ Properties",
  },
  {
    name: "Pune",
    image: "/images/icons/city.jpg",
    properties: "64,000+ Properties",
  },
  {
    name: "Mumbai",
    image: "/images/icons/city.jpg",
    properties: "63,000+ Properties",
  },
  {
    name: "Hyderabad",
    image: "/images/icons/city.jpg",
    properties: "29,000+ Properties",
  },
  {
    name: "Kolkata",
    image: "/images/icons/city.jpg",
    properties: "41,000+ Properties",
  },
  {
    name: "Chennai",
    image: "/images/icons/city.jpg",
    properties: "41,000+ Properties",
  },
  {
    name: "Ahmedabad",
     image: "/images/icons/city.jpg",
    properties: "30,000+ Properties",
  },
];

const TopCities = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">
            Top Cities
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Explore Real Estate in Popular Indian Cities
          </h2>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* City Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src={city.image}
                  alt={city.name}
                  width={400}
                  height={250}
                  className="object-cover w-full h-40 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* City Details */}
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  {city.name}
                </h3>
                <p className="text-gray-600 text-sm">{city.properties}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCities;
