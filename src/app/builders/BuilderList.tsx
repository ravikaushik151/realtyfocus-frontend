'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const toImageUrl = (imagePath: string | undefined): string =>
    !imagePath ? '/builder-logo.jpeg' :
        imagePath.startsWith('http') ? imagePath :
            `https://www.realtyfocus.info/images/builder/${imagePath}`;

const stripHtmlTags = (html: string): string =>
    html?.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, ' ') || '';

// ✅ Proper Type Definition
interface Builder {
    builder_id: number;
    name: string;
    address?: string | null;
    about?: string | null;
    logo?: string | null;
    completed_projects?: number | null;
    ongoing_projects?: number | null;
}

export default function BuilderList({ currentPage = 1 }: { currentPage: number }) {
    const limit = 9;
    const [builders, setBuilders] = useState<Builder[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchBuilders = async () => {
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${API_BASE_URL}/builders`);
                const data: Builder[] = await res.json();
                setBuilders(data);
                setTotal(data.length);
            } catch (error) {
                console.error('Failed to fetch builders:', error);
            }
        };
        fetchBuilders();
    }, []);

    const totalPages = Math.ceil(total / limit);
    const page = Math.max(currentPage, 1);
    const paginatedBuilders = builders.slice((page - 1) * limit, page * limit);

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedBuilders.length === 0 ? (
                        <p className="col-span-full text-center">No builders found.</p>
                    ) : (
                        paginatedBuilders.map((builder: any) => (
                            <Card key={builder.builder_id} className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-realty-navy">
                                            <Link
                                                href={`/builders/${encodeURIComponent(
                                                    builder.name?.toLowerCase().replace(/\s+/g, '-')
                                                )}`}
                                                className="hover:text-realty-red transition-colors"
                                            >
                                                {builder.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500 flex items-center">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
                                            {stripHtmlTags(builder.address)}
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 relative">
                                        <Image
                                            src={toImageUrl(builder.logo)}
                                            alt={builder.name || "Builder Logo"}
                                            width={64}
                                            height={64}
                                            className="rounded object-contain"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{stripHtmlTags(builder.about)}</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
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
                    )}
                </div>

                {/* Smart Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <nav className="inline-flex items-center space-x-2 text-sm">
                            {/* Previous Button */}
                            <Link
                                href={`/builders/page/${page - 1}`}
                                className={`px-3 py-2 rounded-md ${page <= 1 ? 'text-gray-400 pointer-events-none' : 'hover:bg-gray-100'}`}
                            >
                                Previous
                            </Link>

                            {/* Page 1 always */}
                            <Link
                                href={`/builders/page/1`}
                                className={`px-3 py-2 rounded-md ${page === 1 ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
                            >
                                1
                            </Link>

                            {/* Left Ellipsis */}
                            {page > 4 && <span className="px-2">...</span>}

                            {/* Dynamic middle pages */}
                            {Array.from({ length: 5 }, (_, i) => i + page - 2)
                                .filter(p => p > 1 && p < totalPages)
                                .map(p => (
                                    <Link
                                        key={p}
                                        href={`/builders/page/${p}`}
                                        className={`px-3 py-2 rounded-md ${p === page ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        {p}
                                    </Link>
                                ))}

                            {/* Right Ellipsis */}
                            {page < totalPages - 3 && <span className="px-2">...</span>}

                            {/* Last Page */}
                            {totalPages > 1 && (
                                <Link
                                    href={`/builders/page/${totalPages}`}
                                    className={`px-3 py-2 rounded-md ${page === totalPages ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
                                >
                                    {totalPages}
                                </Link>
                            )}

                            {/* Next Button */}
                            <Link
                                href={`/builders/page/${page + 1}`}
                                className={`px-3 py-2 rounded-md ${page >= totalPages ? 'text-gray-400 pointer-events-none' : 'hover:bg-gray-100'}`}
                            >
                                Next
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </section>
    );
}
