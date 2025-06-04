'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ProjectCard from '@/components/home/ProjectCard';

export default function TrendingProjectsPage() {
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`)
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
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="py-16 container">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <div className="text-sm font-medium text-realty-red uppercase tracking-wider">
            APARTMENTS FOR SALE
          </div>
        </div>
        <h2 className="section-heading">TRENDING PROJECTS</h2>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {trendingProjects.slice(0, 9).map((project) => (
            <SwiperSlide key={project.micro_id}>
              <ProjectCard project={{
                title: project.name,
                location: project.location
                  ?.toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                category: project.type?.toUpperCase() || 'N/A',
                configuration: project.rooms?.replace(/(<([^>]+)>)/gi, '') || 'N/A',
                area: project.min_sqft && project.max_sqft ? `${project.min_sqft} - ${project.max_sqft} sq.ft.` : 'N/A',
                possession: project.possession
                  ? new Date(project.possession).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).replace(/ /g, '-')
                  : 'TBA',
                price: project.min_basic_cost && project.max_basic_cost
                  ? `₹ ${shortenPrice(project.min_basic_cost)} - ₹ ${shortenPrice(project.max_basic_cost)}`
                  : 'Price on Request',
                imageUrl: project.featured_image,
                buildername: project.builder_name || '',
                slug: project.name?.toLowerCase().replace(/\s+/g, '-'),
                project_type: 'Trending'
              }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function shortenPrice(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
  return num;
}
