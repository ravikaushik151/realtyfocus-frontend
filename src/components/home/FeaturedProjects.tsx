// components/FeaturedProjects.tsx

import React from 'react';
import ProjectCard from './ProjectCard';

// Mock Data for Projects
const featuredProjects = [
  {
    id: 1,
    title: 'LODHA MIRABELLE',
    location: 'MANYATA TECH PARK, BANGALORE',
    configuration: '2.5, 3&4 BHK',
    area: '1350 SQ. FT. - 2500 SQ. FT.',
    possession: 'Jan-2028',
    price: '₹ 1.49 Cr - ₹ 2.8 Cr',
    imageUrl: '/images/projects/project1.jpeg',
    builderLogo: '/images/builder-logo.jpeg',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'lodha-mirabelle'
  },
  {
    id: 2,
    title: 'PROVIDENT DEANSGATE',
    location: 'KEMPALINGAPURA, BANGALORE',
    configuration: '3 BHKTOWNHOUSES',
    area: '1700 SQ. FT. - 2300 SQ. FT.',
    possession: 'Jan-2028',
    price: '₹ 1.8 Cr - ₹ 2 Cr',
    imageUrl: '/images/projects/project2.jpeg',
    builderLogo: '/images/builder-logo.jpeg',
    category: 'RESIDENTIAL VILLAS',
    slug: 'provident-deansgate'
  },
  {
    id: 3,
    title: 'URBAN SANCTUM',
    location: 'SARJAPUR ROAD, BANGALORE',
    configuration: 'LUXURY VILLA PLOTS',
    area: '1200 SQ. FT. - 2400 SQ. FT.',
    possession: 'Jan-2026',
    price: '₹ 1.21 Cr - ₹ 2.42 Cr',
    imageUrl: '/images/projects/project3.png',
    builderLogo: '/images/builder-logo.jpeg',
    category: 'RESIDENTIAL PLOT AND VILLAS',
    slug: 'urban-sanctum'
  }
];

const FeaturedProjects = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">FEATURED PROJECTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;