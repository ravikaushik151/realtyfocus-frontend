'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProjectCard from '@/components/home/ProjectCard';
import ProjectCardNew from './ProjectCardNew';

export default function TrendingProjectsPage() {
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`)
      .then((res) => {
        const filtered = res.data.filter(
          (project) => project.project_type === 'Trending'
        );
        setTrendingProjects(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-red-600 uppercase tracking-widest">
            Apartments For Sale
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            Trending Projects
          </h2>
          <p className="text-gray-500 text-base mt-2">
            Explore the most popular projects curated just for you
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1.1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.2 }, // mobile
              768: { slidesPerView: 2 },   // tablet
              1024: { slidesPerView: 3 },  // small desktop
            }}
            style={{
              paddingRight: '8%',
            }}
          >
            {trendingProjects.slice(0, 12).map((project) => (
              <SwiperSlide key={project.micro_id}>
                <ProjectCardNew
                  project={{
                    title: project.name,
                    location: project.location
                      ?.toLowerCase()
                      .split(' ')
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' '),
                    category: project.type?.toUpperCase() || 'N/A',
                    configuration:
                      project.rooms?.replace(/(<([^>]+)>)/gi, '') || 'N/A',
                    area:
                      project.min_sqft && project.max_sqft
                        ? `${project.min_sqft} - ${project.max_sqft} sq.ft.`
                        : 'N/A',
                    possession: project.possession
                      ? new Date(project.possession)
                          .toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })
                          .replace(/ /g, '-')
                      : 'TBA',
                    price:
                      project.min_basic_cost && project.max_basic_cost
                        ? `₹ ${shortenPrice(
                            project.min_basic_cost
                          )} - ₹ ${shortenPrice(project.max_basic_cost)}`
                        : 'Price on Request',
                    imageUrl: project.featured_image,
                    buildername: project.builder_name || '',
                    slug: project.name
                      ?.toLowerCase()
                      .replace(/\s+/g, '-'),
                    project_type: 'Trending',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right-side white gradient fade */}
          <div className="absolute top-0 right-0 h-full w-[15%] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}

function shortenPrice(value: string) {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
  return num;
}
