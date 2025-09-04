'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCards from './ProjectCardItem';

export default function FeaturedProjects() {
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`)
      .then((res) => {
        const filtered = res.data.filter(
          (project) => project.project_type === 'featured'
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
      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center mb-4">
          <div className="text-sm font-medium text-realty-red uppercase tracking-wider">
            APARTMENTS FOR SALE
          </div>
        </div>
        <h2 className="section-heading">FEATURED PROJECTS</h2>

        {/* Swiper Container */}
        <div className="relative">
          {/* Swiper */}
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}  // ✅ Centers the active slide
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                centeredSlides: true, // ✅ Ensures centering on mobile
              },
              1024: {
                slidesPerView: 1.5,  // ✅ Desktop shows 1.5 slides
                centeredSlides: false, // ✅ No centering on desktop, so half slide peeks
              },
            }}
            style={{
              paddingRight: '10%',
              position: 'relative',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {trendingProjects.slice(0, 5).map((project) => (
              <SwiperSlide key={project.micro_id} className="!w-[70%]">
                <ProjectCards
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
                    logo: project.logo || '',
                    slug: project.name
                      ?.toLowerCase()
                      .replace(/\s+/g, '-'),
                    project_type: 'Featured',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Arrow */}
          <div className="swiper-button-prev-custom absolute left-[-25px] top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition z-20">
            <ChevronLeft size={24} />
          </div>

          {/* Right Arrow */}
          <div className="swiper-button-next-custom absolute right-[-25px] top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition z-20">
            <ChevronRight size={24} />
          </div>

          {/* Right-side fade effect */}
          <div className="absolute top-0 right-0 h-full w-[35%] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
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
