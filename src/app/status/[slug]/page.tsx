// app/location/[slug]/page.tsx
import RootLayout from '@/components/layout/RootLayout';
import LocationProjects from '@/components/LocationProjects';
import StatusProjects from '@/components/StatusProjects';
import TypeProjects from '@/components/TypeProjects';

export type StatusPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`);
    const projects = await res.json();

    const uniqueLocations = Array.from(
        new Set(
            projects
                .filter(project => Boolean(project?.status))
                .map(project =>
                    project.status.toLowerCase().replace(/\s+/g, '-')
                )
        )
    );

    return uniqueLocations.map(slug => ({ slug }));
}


export default async function StatusPage({ params }: StatusPageProps) {
    // ✅ Await params
    const { slug } = await params;

    return (
        <RootLayout>
            {/* Pass slug to LocationProjects */}
            <StatusProjects slug={slug} />
        </RootLayout>
    );
}