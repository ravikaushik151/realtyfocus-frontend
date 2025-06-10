'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RootLayout from '@/components/layout/RootLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import ProjectCard from '@/components/home/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`);
        setProjects(res.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Pagination logic
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const formatPrice = (value) => {
    if (!value || isNaN(value)) return 'N/A';
    const num = Number(value);
    if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
    return num.toString();
  };

  const formatPriceRange = (min, max) => {
    if (!min && !max) return 'Price on Request';
    const minFormatted = formatPrice(min);
    const maxFormatted = formatPrice(max);
    return minFormatted === maxFormatted ? minFormatted : `${minFormatted} - ${maxFormatted}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return 'TBA';

    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return 'TBA';

    const date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    if (isNaN(date.getTime())) return 'TBA';

    const monthShort = date.toLocaleString('en-US', { month: 'short' });
    return `${monthShort}-${year}`;
  };

  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold text-center">PROJECTS</h1>
          <p className="text-center mt-2">Residential Projects in Bangalore for Sale</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-realty-darkNavy py-10 container">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-center text-xl mb-6">Search Your Dream Home!</h2>
          <div className="bg-white p-6 rounded-sm shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Project Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential-apartment">Residential Apartment</SelectItem>
                  <SelectItem value="residential-villas">Residential Villas</SelectItem>
                  <SelectItem value="residential-plot">Residential Plot</SelectItem>
                  <SelectItem value="apartment-penthouse">Residential Apartment and Penthouse</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="text"
                placeholder="Select Project / Locality / Builder"
                className="bg-white"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button className="bg-realty-red hover:bg-realty-red/90 text-white px-8">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <section className="py-16 container">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">OUR PROJECTS</h2>

          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.length > 0 ? (
                currentProjects.map((project) => (
                  <ProjectCard
                    key={project.micro_id}
                    project={{
                      title: project.name,
                      location: project.location + " " + project.city || 'Bangalore',
                      category: project.type || 'N/A',
                      configuration: project.rooms ? decodeHtml(project.rooms).replace(/<\/?[^>]+(>|$)/g, "") : 'N/A',
                      area: project.min_sqft && project.max_sqft
                        ? `${project.min_sqft} - ${project.max_sqft}`
                        : project.min_sqft
                          ? `${project.min_sqft}`
                          : project.max_sqft
                            ? `${project.max_sqft}`
                            : 'N/A',
                      possession: formatDate(project.possession),
                      price: formatPriceRange(project.min_basic_cost, project.max_basic_cost),
                      imageUrl: project.featured_image,
                      buildername: project.builder_name || 'N/A',
                      status: project.status,
                      slug: project.name?.toLowerCase().replace(/\s+/g, '-')
                    }}
                  />
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          )}

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <nav className="inline-flex items-center space-x-2 text-sm">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md ${currentPage === 1
                      ? 'text-gray-400 pointer-events-none'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  Previous
                </button>

                {/* Dynamic Page Buttons */}
                {(() => {
                  const sidePages = 2; // Show 2 before/after current
                  const pageButtons = [];

                  const renderButton = (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${pageNum === currentPage
                          ? 'bg-realty-red text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );

                  // Always show first page
                  pageButtons.push(renderButton(1));

                  let leftSide = Math.max(2, currentPage - sidePages);
                  let rightSide = Math.min(totalPages - 1, currentPage + sidePages);

                  // Add ellipsis between first and middle
                  if (leftSide > 2) {
                    pageButtons.push(
                      <span key="ellipsis-start" className="px-3 py-2">
                        ...
                      </span>
                    );
                  }

                  // Render middle buttons
                  for (let i = leftSide; i <= rightSide; i++) {
                    pageButtons.push(renderButton(i));
                  }

                  // Add ellipsis before last page if needed
                  if (rightSide < totalPages - 1) {
                    pageButtons.push(
                      <span key="ellipsis-end" className="px-3 py-2">
                        ...
                      </span>
                    );
                  }

                  // Always show last page
                  if (totalPages > 1) {
                    pageButtons.push(renderButton(totalPages));
                  }

                  return pageButtons;
                })()}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md ${currentPage === totalPages
                      ? 'text-gray-400 pointer-events-none'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </RootLayout>
  );
}