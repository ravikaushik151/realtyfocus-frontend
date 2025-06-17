// app/location/[slug]/page.tsx
import RootLayout from '@/components/layout/RootLayout';
import LocationProjects from '@/components/LocationProjects';

export type LocationPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsites/all`);
    const projects = await res.json();

    const uniqueLocations = Array.from(
        new Set(
            projects
                .filter(project => Boolean(project?.location))
                .map(project =>
                    project.location.toLowerCase().replace(/\s+/g, '-')
                )
        )
    );

    return uniqueLocations.map(slug => ({ slug }));
}


export default async function LocationPage({ params }: LocationPageProps) {
    // ✅ Await params
    const { slug } = await params;

    return (
        <RootLayout>
            {/* Pass slug to LocationProjects */}
            <LocationProjects slug={slug} />
        </RootLayout>
    );
}