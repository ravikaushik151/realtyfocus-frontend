import React from 'react';
import Link from 'next/link';
import RootLayout from '@/components/layout/RootLayout';
import Image from 'next/image';

// Helper function to format image URLs
const toImageUrl = (imagePath: string | undefined): string => {
    if (!imagePath) return '/builder-logo.jpeg';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://www.realtyfocus.info/images/builder/${imagePath}`;
};

// Function to strip HTML tags from strings
const stripHtmlTags = (html: string | undefined): string => {
    if (!html) return '';
    return html.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, ' ').trim();
};

// Define types
interface BuilderApiResponse {
    builder_id: number;
    name: string;
    about?: string;
    address?: string;
    logo?: string;
    completed_projects?: number | null;
    ongoing_projects?: number | null;
}

export type BuilderDetailPageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ⬇️ Required for `output: export`
export async function generateStaticParams() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

    try {
        const res = await fetch(`${API_BASE_URL}/builders`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch builders');

        const builders: BuilderApiResponse[] = await res.json();

        return builders.map((builder) => ({
            slug: builder.name?.toLowerCase().replace(/\s+/g, '-') || '',
        }));
    } catch (err) {
        console.error("generateStaticParams error:", err);
        return [];
    }
}

// Fetch builder by slug
async function getBuilderBySlug(slug: string): Promise<BuilderApiResponse | null> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

    try {
        const res = await fetch(`${API_BASE_URL}/builders`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load builders');

        const builders: BuilderApiResponse[] = await res.json();

        const builderName = slug.replace(/-/g, ' ').toLowerCase();
        return (
            builders.find(
                (builder) =>
                    builder.name?.toLowerCase() === builderName ||
                    builder.name?.toLowerCase().replace(/\s+/g, '-') === slug
            ) || null
        );
    } catch (error) {
        console.error('Error fetching builder:', error);
        return null;
    }
}


export default async function BuilderDetailPage({ params }: BuilderDetailPageProps) {


    const { slug } = await params;

    // You can also await searchParams if needed
    // const resolvedSearchParams = await searchParams;

    const builder = await getBuilderBySlug(slug);

    if (!builder) {
        return (
            <div className="container mt-5 mb-5 text-center">
                <h2 className="text-danger">Builder Not Found</h2>
                <p className="mt-3">
                    <Link href="/builders" className="btn btn-outline-primary">
                        Back to Builders
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <RootLayout>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Builder Header */}
                    <div className="row align-items-center mb-4">
                        <div className="col-md-3 text-center">
                            <Image
                                src={toImageUrl(builder.logo)}
                                alt={builder.name || "Builder Logo"}
                                width={100}
                                height={100}
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                        <div className="col-md-9">
                            <h1 className="display-6 fw-bold">
                                {builder.name
                                    ? builder.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')
                                    : 'Builder Name'}
                            </h1>
                        </div>
                    </div>

                    {/* About */}
                    <div className="card shadow-sm p-4 mb-4">
                        <h2 className="h5 fw-bold mb-3">About {builder.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: stripHtmlTags(builder.about) }} />
                    </div>

                    {/* Address */}
                    <div className="card shadow-sm p-4 mb-4">
                        <h3 className="h6 fw-bold mb-3">Head Office Address</h3>
                        <p>{stripHtmlTags(builder.address)}</p>
                    </div>

                    {/* Projects */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card shadow-sm p-4 mb-4">
                                <h3 className="h6 fw-bold mb-3">Completed Projects</h3>
                                <p>{builder.completed_projects ?? 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card shadow-sm p-4 mb-4">
                                <h3 className="h6 fw-bold mb-3">Ongoing Projects</h3>
                                <p>{builder.ongoing_projects ?? 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="text-center mt-4">
                        <Link href="/builders" className="btn btn-outline-secondary">
                            ← Back to All Builders
                        </Link>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
}
