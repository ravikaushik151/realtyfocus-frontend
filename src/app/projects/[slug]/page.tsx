
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RootLayout from '@/components/layout/RootLayout';
import ProjectSlider from '@/components/ProjectSlider';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faKey, faBed, faHammer, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import EnquiryForm from '@/components/EnquiryForm';

// Types
interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  configuration: string;
  area: string;
  possession: string;
  price: Array<{
    type: string;
    sqft: string;
    price: number;
    basic_cost: number;
  }>;
  imageUrls: string[];
  galleryimageUrls: string[];
  masterPlan: string;
  floorPlanimageUrls: string[];
  amenitiesimageUrls: string[];
  builderLogo: string;
  builderName: string;
  category: string;
  amenities: Array<{ name: string; image: string }>;
  specifications: { [key: string]: string };
  slug: string;
}

// Update Props to include searchParams (required by Next.js)
interface ProjectDetailPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Helper to convert CSV to image URL array
const toUrlArray = (csv: string, base: string): string[] =>
  csv
    ? csv.split(',').map(id => {
      const trimmed = id.trim();
      return base + (trimmed.endsWith('.jpg') ? trimmed : `${trimmed}.jpg`);
    })
    : [];

// Main Page Component
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = params;
  const res = await fetch(`http://localhost:4000/api/microsites/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
    return null;
  }

  const rawData = await res.json();

  // Base URLs
  const BASE = {
    slider: "https://realtyfocus.info/images/slider/",
    gallery: "https://realtyfocus.info/images/gallery/",
    floorPlan: "https://realtyfocus.info/images/floor_plan/",
    masterPlan: "https://realtyfocus.info/images/master_plan/",
    amenities: "https://realtyfocus.info/images/amenities/",
    builder: "https://realtyfocus.info/images/builderimage/",
  };

  const details = rawData.details || {};
  const floorplan = rawData.floorplan || [];
  const amenities = rawData.amenities || [];
  const name = rawData.name || "Unknown Project";

  const project: Project = {
    id: rawData.micro_id ?? 0,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    title: name,
    location: rawData.location ?? '',
    description: details.about ?? '',
    configuration: details.rooms ?? '',
    area: rawData.total_area ?? '',
    possession: rawData.possession ?? '',
    price: Array.isArray(rawData.price) ? rawData.price : [],
    imageUrls: toUrlArray(details.slider_image, BASE.slider),
    galleryimageUrls: toUrlArray(details.gallery_image, BASE.gallery),
    masterPlan: details.masterplan_image ? BASE.masterPlan + details.masterplan_image : '',
    floorPlanimageUrls: Array.isArray(floorplan) ? floorplan.map(fp => BASE.floorPlan + fp.image) : [],
    amenitiesimageUrls: Array.isArray(amenities) ? amenities.map(am => BASE.amenities + am.image) : [],
    builderLogo: details.mlogo ? BASE.builder + details.mlogo : '',
    builderName: details.builderName ?? "House of Hiranandani",
    category: rawData.project_type ?? '',
    amenities: Array.isArray(amenities) ? amenities : [],
    specifications: details.specifications ?? {},
  };

  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-10">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <p className="mt-2">{project.location}</p>
              <div className="mt-3 inline-block px-4 py-1 bg-realty-green text-white text-sm">
                {project.category}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-2xl font-bold">price here</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2">
              <div className="relative aspect-video overflow-hidden rounded-md mb-6">
                <ProjectSlider title={project.title} imageUrls={project.imageUrls} />
              </div>

              {/* Overview */}
              <div className="bg-white p-6 rounded-md shadow-md mb-6 single-property-overview">
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Overview</h2>
                <ul className="info-box">
                  <li className="item"><div className="box-icon w-52"><FontAwesomeIcon icon={faHouse} /></div><div className="content"><span className="label">Configuration:</span><span>{project.configuration}</span></div></li>
                  <li className="item"><div className="box-icon w-52"><FontAwesomeIcon icon={faKey} /></div><div className="content"><span className="label">Possession:</span><span>{project.possession}</span></div></li>
                  <li className="item"><div className="box-icon w-52"><FontAwesomeIcon icon={faBed} /></div><div className="content"><span className="label">Builder:</span><span>{project.builderName}</span></div></li>
                  <li className="item"><div className="box-icon w-52"><FontAwesomeIcon icon={faHammer} /></div><div className="content"><span className="label">Year Built:</span><span>2024</span></div></li>
                  <li className="item"><div className="box-icon w-52"><FontAwesomeIcon icon={faArrowsAlt} /></div><div className="content"><span className="label">Area:</span><span>{project.area}</span></div></li>
                </ul>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-md shadow-md mb-6" id='about'>
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Description</h2>
                <p className="text-gray-600 text-justify">{project.description}</p>
              </div>

              {/* Amenities */}
              {project.amenitiesimageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 my-6">
                  {amenities.map((am, idx) => (
                    <div key={idx} className="text-center">
                      <Image
                        src={
                          am.image.includes('https://storage.googleapis.com/')
                            ? am.image
                            : `https://realtyfocus.info/images/amenities/${am.image}`
                        }
                        alt={am.name}
                        width={100}
                        height={100}
                        className="rounded mx-auto object-contain"
                      />
                      <p className="text-sm mt-2">{am.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Specifications */}
              {project.specifications && Object.keys(project.specifications).length > 0 && (
                <div className="bg-white p-6 rounded-md shadow-md" id="specifications">
                  <h2 className="text-xl font-bold mb-4 text-realty-navy">Specifications</h2>
                  <div className="space-y-4">
                    {Object.entries(project.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="font-semibold capitalize">{key}</p>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Master Plan */}
              {project.masterPlan && (
                <div className="bg-white p-6 rounded shadow my-6" id='master-plan'>
                  <h2 className="text-xl font-bold mb-4 text-realty-navy">Master Plan</h2>
                  <Image
                    src={project.masterPlan}
                    alt="Master Plan"
                    width={1000}
                    height={600}
                    className="rounded w-full object-contain"
                  />
                </div>
              )}

              {/* Floor Plans */}
              {floorplan?.length > 0 && (
                <div className="bg-white p-6 rounded shadow my-6" id='floor-plan'>
                  <h2 className="text-xl font-bold mb-4 text-realty-navy">Floor Plans</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {floorplan.map((url, idx) => (
                      <Image
                        key={idx}
                        src={
                          url.image.includes('https://storage.googleapis.com/')
                            ? url.image
                            : `https://realtyfocus.info/images/floor_plan/${url.image}`
                        }
                        alt={`Floor plan ${idx + 1}`}
                        width={800}
                        height={600}
                        className="rounded w-full object-contain"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Table */}
              {Array.isArray(project.price) && project.price.length > 0 && (
                <div className="bg-white p-6 rounded shadow my-6" id="floor-price">
                  <h2 className="text-xl font-bold mb-4 text-realty-navy">Pricing</h2>
                  <table className="min-w-full table-auto border border-gray-200 text-center">
                    <thead>
                      <tr className="bg-gray-100 text-center">
                        <th className="px-4 py-2 border">Type</th>
                        <th className="px-4 py-2 border">Area (sqft)</th>
                        <th className="px-4 py-2 border">Price/sqft (₹)</th>
                        <th className="px-4 py-2 border">Basic Cost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.price.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 border">{item.type}</td>
                          <td className="px-4 py-2 border">{item.sqft}</td>
                          <td className="px-4 py-2 border">₹{item.price.toLocaleString()}</td>
                          <td className="px-4 py-2 border">₹{item.basic_cost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Gallery */}
              <div className="bg-white p-6 rounded shadow my-6" id='gallery'>
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryimageUrls?.map((url, index) => {
                    const finalUrl = url.startsWith('https://storage.googleapis.com/')
                      ? url
                      : `${url}`;
                    return (
                      <Image
                        key={index}
                        src={finalUrl}
                        alt={`Gallery image ${index + 1}`}
                        width={800}
                        height={600}
                        className="rounded w-full object-contain"
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Contact */}
            <div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}

// Generate Static Params for Dynamic Routes
export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/api/microsites');
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return data.map((project: { name: string }) => ({
    slug: project.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}