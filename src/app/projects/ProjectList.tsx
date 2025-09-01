"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/home/ProjectCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  micro_id: number;
  name: string;
  location: string;
  type: string;
  rooms: string;
  city: string;
  min_sqft: number;
  max_sqft: number;
  possession: string;
  min_basic_cost: number;
  max_basic_cost: number;
  featured_image: string;
  builder_name: string;
  status: string;
}

export default function ProjectList({ currentPage = 1 }: { currentPage: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const limit = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`);
        const allProjects = res.data || [];
        const paginated = allProjects.slice((currentPage - 1) * limit, currentPage * limit);
        setProjects(paginated);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [currentPage]);

  const formatPrice = (value: number) => {
    if (!value || isNaN(value)) return "N/A";
    const num = Number(value);
    if (num >= 10000000) return (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(2) + " L";
    return num.toString();
  };

  const formatPriceRange = (min: number, max: number) => {
    if (!min && !max) return "Price on Request";
    const minFormatted = formatPrice(min);
    const maxFormatted = formatPrice(max);
    return minFormatted === maxFormatted ? minFormatted : `${minFormatted} - ${maxFormatted}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== "string") return "TBA";
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return "TBA";

    const date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    if (isNaN(date.getTime())) return "TBA";

    const monthShort = date.toLocaleString("en-US", { month: "short" });
    return `${monthShort}-${year}`;
  };

  function decodeHtml(html: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  if (loading) return <p className="text-center py-5 text-lg">Loading...</p>;

  return (
    <>
      {/* Hero Section */}
      <div className="relative relative bg-hero bg-cover bg-center h-[300px] md:h-[400px] w-full">
       
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Explore Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-3 text-lg md:text-xl text-gray-200"
          >
            Find your dream home in Bangalore & other top cities.
          </motion.p>
        </div>
      </div>

      {/* Search Bar */}
      <section className="container mx-auto px-4 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-lg shadow-xl p-6 rounded-xl"
        >
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
            Search Your Dream Home 🏡
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City Select */}
            <Select>
              <SelectTrigger className="bg-white border border-gray-300">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Select */}
            <Select>
              <SelectTrigger className="bg-white border border-gray-300">
                <SelectValue placeholder="Project Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential-apartment">Residential Apartment</SelectItem>
                <SelectItem value="residential-villas">Residential Villas</SelectItem>
                <SelectItem value="residential-plot">Residential Plot</SelectItem>
                <SelectItem value="apartment-penthouse">
                  Residential Apartment & Penthouse
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search Project / Locality / Builder"
              className="bg-white border border-gray-300"
            />
          </div>
          <div className="flex justify-center mt-5">
            <Button className="bg-realty-red hover:bg-realty-red/90 px-8 text-lg rounded-lg shadow-lg">
              Search
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Projects List */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Our Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.micro_id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ProjectCard
                project={{
                  title: project.name,
                  location: `${project.location} ${project.city || "Bangalore"}`,
                  category: project.type || "N/A",
                  configuration: project.rooms
                    ? decodeHtml(project.rooms).replace(/<\/?[^>]+(>|$)/g, "")
                    : "N/A",
                  area:
                    project.min_sqft && project.max_sqft
                      ? `${project.min_sqft} - ${project.max_sqft}`
                      : project.min_sqft
                      ? `${project.min_sqft}`
                      : project.max_sqft
                      ? `${project.max_sqft}`
                      : "N/A",
                  possession: formatDate(project.possession),
                  price: formatPriceRange(project.min_basic_cost, project.max_basic_cost),
                  imageUrl: project.featured_image,
                  buildername: project.builder_name || "N/A",
                  status: project.status,
                  slug: project.name?.toLowerCase().replace(/\s+/g, "-") || "",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <nav className="inline-flex space-x-2">
            <Button
              variant="outline"
              onClick={() => window.location.href = `?page=${currentPage - 1}`}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700">
              {currentPage}
            </span>
            <Button
              variant="outline"
              onClick={() => window.location.href = `?page=${currentPage + 1}`}
            >
              Next
            </Button>
          </nav>
        </div>
      </section>
    </>
  );
}
