'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import RootLayout from '@/components/layout/RootLayout';

// Helpers
const toImageUrl = (imagePath: string | undefined): string =>
    !imagePath ? '/builder-logo.jpeg' :
        imagePath.startsWith('http') ? imagePath :
            `https://www.realtyfocus.info/images/builder/${imagePath}`;

const stripHtmlTags = (html: string): string =>
    html?.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, ' ') || '';

export default function BuilderList() {
    const searchParams = useSearchParams();
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = 9;

    const [builders, setBuilders] = useState([]);
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

    const totalPages = Math.ceil(total / limit);
    const paginatedBuilders = builders.slice((page - 1) * limit, page * limit);

    return (
        <RootLayout>
            <div className="bg-realty-darkNavy py-16 text-white text-center">
                <h1 className="text-3xl font-bold">Top Builders in Bangalore</h1>
                <p>List of the most prestigious real estate developers in Bangalore</p>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedBuilders.length > 0 ? (
                            paginatedBuilders.map((builder) => (
                                <Card key={builder.builder_id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-realty-navy">
                                                <Link
                                                    href={`/builders/${encodeURIComponent(
                                                        builder.name?.toLowerCase().replace(/\s+/g, '-')
                                                    )}`}
                                                    className="hover:text-realty-red transition-colors"
                                                >
                                                    {builder.name
                                                        ?.toLowerCase()
                                                        .split(' ')
                                                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                                        .join(' ')}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
                                                {stripHtmlTags(builder.address)}
                                            </p>
                                        </div>
                                        <Image
                                            src={toImageUrl(builder.logo)}
                                            alt={builder.name}
                                            width={64}
                                            height={60}
                                            className="rounded object-contain"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                        {stripHtmlTags(builder.about)}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(builder.locations || []).slice(0, 3).map((loc, idx) => (
                                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{loc}</span>
                                        ))}
                                        {(builder.locations || []).length > 3 && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                +{builder.locations.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 text-sm gap-2">
                                        <div>
                                            <p className="text-gray-500">Completed Projects</p>
                                            <p className="font-semibold">{builder.completed_projects || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Ongoing Projects</p>
                                            <p className="font-semibold">{builder.ongoing_projects || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <Link
                                            href={`/builders/${encodeURIComponent(builder.name?.toLowerCase().replace(/\s+/g, '-'))}`}
                                            className="text-realty-red text-sm hover:underline"
                                        >
                                            View Projects
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className="col-span-full text-center">No builders found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {/* Smart Pagination */}
                    <div className="flex justify-center mt-10">
                        <nav className="inline-flex space-x-2">
                            {/* Previous Button */}
                            <Link
                                href={`/builders?page=${page - 1}`}
                                className={`px-3 py-2 rounded ${page <= 1 ? 'text-gray-400 pointer-events-none' : 'hover:bg-gray-100'}`}
                            >
                                Previous
                            </Link>

                            {/* Dynamic Page Buttons */}
                            {(() => {
                                const sidePages = 2; // Show 2 before & after current
                                const buttons = [];
                                const totalPagesToShow = 7; // Max visible buttons including ellipses

                                let start = Math.max(2, page - sidePages);
                                let end = Math.min(totalPages - 1, page + sidePages);

                                // Always show first page
                                buttons.push(
                                    <Link
                                        key={1}
                                        href="/builders?page=1"
                                        className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${page === 1 ? 'bg-realty-red text-white' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        1
                                    </Link>
                                );

                                // Add ellipsis between first and middle
                                if (start > 2) {
                                    buttons.push(
                                        <span key="dots-start" className="px-3 py-2">
                                            ...
                                        </span>
                                    );
                                }

                                // Render nearby pages
                                for (let i = start; i <= end; i++) {
                                    buttons.push(
                                        <Link
                                            key={i}
                                            href={`/builders?page=${i}`}
                                            className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${page === i ? 'bg-realty-red text-white' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {i}
                                        </Link>
                                    );
                                }

                                // Add ellipsis before last page if needed
                                if (end < totalPages - 1) {
                                    buttons.push(
                                        <span key="dots-end" className="px-3 py-2">
                                            ...
                                        </span>
                                    );
                                }

                                // Always show last page
                                if (totalPages > 1) {
                                    buttons.push(
                                        <Link
                                            key={totalPages}
                                            href={`/builders?page=${totalPages}`}
                                            className={`px-3 py-2 w-10 h-10 flex items-center justify-center rounded-md ${page === totalPages ? 'bg-realty-red text-white' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {totalPages}
                                        </Link>
                                    );
                                }

                                return buttons;
                            })()}

                            {/* Next Button */}
                            <Link
                                href={`/builders?page=${page + 1}`}
                                className={`px-3 py-2 rounded ${page >= totalPages ? 'text-gray-400 pointer-events-none' : 'hover:bg-gray-100'}`}
                            >
                                Next
                            </Link>
                        </nav>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
}
