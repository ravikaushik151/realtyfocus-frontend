// app/projects/ProjectList.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '@/components/home/ProjectCard';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

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
                console.error('Failed to fetch projects:', err);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [currentPage]);


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

    if (loading) return <p className='text-center py-5'>Loading...</p>;

    return (
        <>
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
                            {/* City Select */}
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

                            {/* Category Select */}
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

                            {/* Search Input */}
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
                    <h2 className="text-2xl font-bold mb-6">OUR PROJECTS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.micro_id}
                                project={{
                                    title: project.name,
                                    location: `${project.location} ${project.city || 'Bangalore'}`,
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
                                    slug: project.name?.toLowerCase().replace(/\s+/g, '-') || '',
                                }}
                            />
                        ))}
                    </div>

                    {/* Pagination UI */}
                    <div className="flex justify-center mt-10">
                        <nav className="inline-flex space-x-2">
                            <Button onClick={() => window.location.href = `?page=${currentPage - 1}`}>Previous</Button>
                            <span>{currentPage}</span>
                            <Button onClick={() => window.location.href = `?page=${currentPage + 1}`}>Next</Button>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    );
}