// components/LocationProjects.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '@/components/home/ProjectCard';

export default function LocationProjects({ slug }: { slug: string }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const projectsPerPage = 6;

    useEffect(() => {
        if (!slug) return;

        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`)
            .then((res) => {
                const filtered = res.data.filter((project) =>
                    project.location?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
                );

                const total = filtered.length;
                const paginated = filtered.slice(
                    (currentPage - 1) * projectsPerPage,
                    currentPage * projectsPerPage
                );

                setProjects(paginated);
                setTotalPages(Math.ceil(total / projectsPerPage));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [slug, currentPage]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!projects.length) {
        return <p className="text-center py-10">No projects found in {slug}</p>;
    }

    return (
        <section className="py-16 container">
            <div className="container mx-auto px-4">
                <div className="text-center mb-4">
                    <div className="text-sm font-medium text-realty-red uppercase tracking-wider">
                        APARTMENTS FOR SALE
                    </div>
                </div>
                <h2 className="section-heading">PROJECTS IN {slug.toUpperCase()}</h2>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.micro_id}
                            project={{
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
                                project_type: 'Featured'
                            }}
                        />
                    ))}
                </div>

                {/* Pagination UI */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                        <nav className="inline-flex space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'text-gray-400 pointer-events-none' : ''}`}
                            >
                                Previous
                            </button>

                            {/* Page Buttons */}
                            {(() => {
                                const sidePages = 2;
                                const buttons = [];
                                const leftSide = Math.max(2, currentPage - sidePages);
                                const rightSide = Math.min(totalPages - 1, currentPage + sidePages);

                                buttons.push(
                                    <button
                                        key={1}
                                        onClick={() => setCurrentPage(1)}
                                        className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${currentPage === 1 ? 'bg-realty-red text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        1
                                    </button>
                                );

                                if (leftSide > 2) buttons.push(<span key="dots-start" className="px-3 py-2">...</span>);

                                for (let i = leftSide; i <= rightSide; i++) {
                                    buttons.push(
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${currentPage === i ? 'bg-realty-red text-white' : 'hover:bg-gray-100'}`}
                                        >
                                            {i}
                                        </button>
                                    );
                                }

                                if (rightSide < totalPages - 1) buttons.push(<span key="dots-end" className="px-3 py-2">...</span>);

                                if (totalPages > 1) {
                                    buttons.push(
                                        <button
                                            key={totalPages}
                                            onClick={() => setCurrentPage(totalPages)}
                                            className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${currentPage === totalPages ? 'bg-realty-red text-white' : 'hover:bg-gray-100'}`}
                                        >
                                            {totalPages}
                                        </button>
                                    );
                                }

                                return buttons;
                            })()}
                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 pointer-events-none' : ''}`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
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