// app/location/[slug]/page.tsx
import ClassificationProjects from '@/components/ClassificationProjects';
import RootLayout from '@/components/layout/RootLayout';
import LocationProjects from '@/components/LocationProjects';
import StatusProjects from '@/components/StatusProjects';
import TypeProjects from '@/components/TypeProjects';

export type ClassificationPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`);
    const projects = await res.json();

    const uniqueLocations = Array.from(
        new Set(
            projects
                .filter(project => Boolean(project?.rooms))
                .map(project =>
                    project.rooms.toLowerCase().replace(/\s+/g, '-')
                )
        )
    );

    return uniqueLocations.map(slug => ({ slug }));
}


export default async function ClassificationPage({ params }: ClassificationPageProps) {
    // ✅ Await params
    const { slug } = await params;

    return (
        <RootLayout>
            {/* Pass slug to LocationProjects */}
            <ClassificationProjects slug={slug} />
        </RootLayout>
    );
}