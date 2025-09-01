"use client";
import React from "react";
import RootLayout from "@/components/layout/RootLayout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <RootLayout>
      {/* Hero Section */}
      <div className="relative bg-about bg-cover bg-center h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            ABOUT US
          </h1>
          <p className="text-white/80 mt-4 max-w-xl mx-auto text-lg">
            Discover who we are, what we do, and why clients love Realty Focus.
          </p>
        </motion.div>
      </div>

      {/* Who We Are */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-img.jpeg"
                alt="About Realty Focus"
                fill
                className="object-cover scale-105 hover:scale-110 transition-all duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              WHO WE ARE
              <span className="text-realty-red text-3xl ml-2">?</span>
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At Realty Focus, we believe that home is more than just a shared space of family. Keeping
              this value central to our operations, we are one of the leading real estate organisations
              continually working to help our clients find the best property they can call home.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Since our inception, Realty Focus has strived to set new standards for customer service,
              transparency, and trust. With over{" "}
              <span className="font-semibold text-realty-red">5,000 homes sold</span> across major
              metropolitan cities, we are committed to delivering excellence at every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                WHAT WE DO
                <span className="text-realty-red text-3xl ml-2">?</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Realty Focus gives you the opportunity to exchange property information, search, advertise,
                and browse through a vast listing of properties.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform simplifies the process of buying, selling, and renting properties while
                keeping you updated with the latest real estate insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 order-1 md:order-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Property Search",
                    desc: "Easily find properties matching your preferences.",
                  },
                  {
                    title: "Property Listing",
                    desc: "List your property for sale, rent, or purchase hassle-free.",
                  },
                  {
                    title: "Expert Consultation",
                    desc: "Get guidance from industry experts on buying or selling.",
                  },
                  {
                    title: "Market Updates",
                    desc: "Stay informed about real estate trends and insights.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-realty-navy">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-realty-darkNavy to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">WHY CHOOSE US?</h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-10">
            Realty Focus takes every project with dedication, ensuring complete client satisfaction.
            Here's why we stand out:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Licensed Real Estate Professionals",
              "Transparent in All Dealings",
              "Fast & Efficient Transactions",
              "Trustworthy and Reliable",
              "Instant Buyer-Seller Connections",
              "Simplifying Real Estate Contracts",
            ].map((reason, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
              >
                <h3 className="text-lg font-semibold">{reason}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Vision",
              desc: "We aim to be India's #1 online real estate platform while upholding ethics, sincerity, and quality service.",
            },
            {
              title: "Our Mission",
              desc: "Providing high-quality real estate services with value pricing and strong customer relationships.",
            },
            {
              title: "Our Value",
              desc: "Committed to transparency and accountability, ensuring client satisfaction and maximizing ROI.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-realty-red rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-white text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </RootLayout>
  );
}
