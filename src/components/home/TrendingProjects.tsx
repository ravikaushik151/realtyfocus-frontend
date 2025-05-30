import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import ProjectCard from './ProjectCard';

// Trending project data
const trendingProjects = [
  {
    id: 1,
    title: 'DIVINE GREEN LEAF',
    location: 'YELAHANKA, BANGALORE',
    configuration: '2, 3 BHK',
    area: '1120 SQ. FT. - 1408 SQ. FT.',
    possession: 'Dec-2027',
    price: '₹ 90 L - ₹ 1.13 Cr',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'divine-green-leaf'
  },
  {
    id: 2,
    title: 'PRESTIGE LAVENDER FIELDS',
    location: 'VARTHUR WHITEFIELD, BANGALORE',
    configuration: '1 BHK, 2 BHK, 3 BHK, 4 BHK',
    area: '669 SQ. FT. - 3656 SQ. FT.',
    possession: 'May-2027',
    price: '₹ 64.99 L - ₹ 3.55 Cr',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'prestige-lavender-fields'
  },
  {
    id: 3,
    title: 'GODREJ ELEVATE',
    location: 'WHITEFIELD, BANGALORE',
    configuration: '2 BHK, 3 BHK',
    area: '1137 SQ. FT. - 1529 SQ. FT.',
    possession: 'Jun-2028',
    price: '₹ 80 L - ₹ 1.08 Cr',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'godrej-elevate'
  }
];

const TrendingProjects = () => {
  return (
    <section className="py-16 container">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <div className="text-sm font-medium text-realty-red uppercase tracking-wider">
            APARTMENTS FOR SALE
          </div>
        </div>
        <h2 className="section-heading">TRENDING PROJECTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProjects;
