'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import RootLayout from '@/components/layout/RootLayout';
import { Button } from '@/components/ui/button';

const toImageUrl = (imagePath: string | undefined): string =>
    !imagePath
        ? '/builder-logo.jpeg'
        : imagePath.startsWith('http')
        ? imagePath
        : `https://www.realtyfocus.info/images/builder/${imagePath}`;

const stripHtmlTags = (html: string): string =>
    html?.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, ' ') || '';

export default function Builders() {
interface Builder {
  builder_id: number;
  name: string;
  logo?: string;
  address?: string;
  about?: string;
  locations?: string[];
  completed_projects?: number;
  ongoing_projects?: number;
}

const [builders, setBuilders] = useState<Builder[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchBuilders = async () => {
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${API_BASE_URL}/builders`);
                const data = await res.json();
                setBuilders(data);
                setTotal(data.length);
            } catch (error) {
                console.error('Failed to fetch builders:', error);
            }
        };
        fetchBuilders();
    }, []);

    return (
        <RootLayout>
            {/* Hero Section */}
            <div className="relative  bg-hero bg-cover bg-center bg-gradient-to-r from-black/70 to-black/40">
               
                <div className="relative text-center py-20 text-white z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                        Top Builders in Bangalore
                    </h1>
                    <p className="mt-3 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
                        Discover the most prestigious and trusted real estate developers in Bangalore.
                    </p>
                </div>
            </div>

            {/* Builder Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
                        Our Featured Builders
                    </h2>

                    {builders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {builders.map((builder) => (
                                <div
                                    key={builder.builder_id}
                                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Builder Logo */}
                                    <div className="relative bg-gray-100 h-48 flex items-center justify-center">
                                        <Image
                                            src={toImageUrl(builder.logo)}
                                            alt={builder.name}
                                            width={150}
                                            height={150}
                                            className="rounded-lg object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Builder Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-realty-red transition-colors duration-300">
                                            <Link
                                                href={`/builders/${encodeURIComponent(
                                                    builder.name?.toLowerCase().replace(/\s+/g, '-')
                                                )}`}
                                            >
                                                {builder.name
                                                    ?.toLowerCase()
                                                    .split(' ')
                                                    .map(
                                                        (w) => w.charAt(0).toUpperCase() + w.slice(1)
                                                    )
                                                    .join(' ')}
                                            </Link>
                                        </h3>

                                        <p className="text-sm text-gray-500 flex items-center mt-2">
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className="mr-2 text-realty-red"
                                            />
                                            {stripHtmlTags(builder.address)}
                                        </p>

                                        <p className="mt-4 text-gray-600 text-sm line-clamp-3">
                                            {stripHtmlTags(builder.about)}
                                        </p>

                                        {/* Locations */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {(builder.locations || []).slice(0, 3).map((loc, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-realty-red/10 text-realty-red px-2 py-1 rounded-full"
                                                >
                                                    {loc}
                                                </span>
                                            ))}
                                            {(builder.locations || []).length > 3 && (
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                    +{builder.locations.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Project Stats */}
                                        <div className="grid grid-cols-2 gap-4 mt-5 text-center">
                                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                                <p className="text-gray-500 text-sm">Completed</p>
                                                <p className="font-bold text-lg">
                                                    {builder.completed_projects || 'N/A'}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                                <p className="text-gray-500 text-sm">Ongoing</p>
                                                <p className="font-bold text-lg">
                                                    {builder.ongoing_projects || 'N/A'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex justify-center mt-6">
                                            <Link
                                                href={`/builders/${encodeURIComponent(
                                                    builder.name?.toLowerCase().replace(/\s+/g, '-')
                                                )}`}
                                            >
                                                <Button className="bg-realty-red hover:bg-realty-red/90 text-white px-6 py-2 rounded-full text-sm shadow-md">
                                                    View Projects
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-10">
                            No builders found.
                        </p>
                    )}
                </div>
            </section>
        </RootLayout>
    );
}
