import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// Combined project data (featured + trending)
const projectsData = [
  {
    id: 1,
    title: 'LODHA MIRABELLE',
    location: 'MANYATA TECH PARK, BANGALORE',
    configuration: '2.5, 3&4 BHK',
    area: '1350 SQ. FT. - 2500 SQ. FT.',
    possession: 'Jan-2028',
    price: '₹ 1.49 Cr - ₹ 2.8 Cr',
    imageUrl: '/images/projects/project1.jpeg',
    builderLogo: '/images/builder-logo.jpeg',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'lodha-mirabelle'
  },
  {
    id: 2,
    title: 'PROVIDENT DEANSGATE',
    location: 'KEMPALINGAPURA, BANGALORE',
    configuration: '3 BHKTOWNHOUSES',
    area: '1700 SQ. FT. - 2300 SQ. FT.',
    possession: 'Jan-2028',
    price: '₹ 1.8 Cr - ₹ 2 Cr',
    imageUrl: '/images/projects/project2.jpeg',
    builderLogo: '/images/builder-logo.jpeg',
    category: 'RESIDENTIAL VILLAS',
    slug: 'provident-deansgate'
  },
  {
    id: 3,
    title: 'URBAN SANCTUM',
    location: 'SARJAPUR ROAD, BANGALORE',
    configuration: 'LUXURYVILLAPLOTS',
    area: '1200 SQ. FT. - 2400 SQ. FT.',
    possession: 'Jan-2026',
    price: '₹ 1.21 Cr - ₹ 2.42 Cr',
    imageUrl: '/images/projects/project3.png',
    builderLogo: '/images/builder-logo.jpeg',
    category: 'RESIDENTIAL PLOT AND VILLAS',
    slug: 'urban-sanctum'
  },
  {
    id: 4,
    title: 'DIVINE GREEN LEAF',
    location: 'YELAHANKA, BANGALORE',
    configuration: '2, 3 BHK',
    area: '1120 SQ. FT. - 1408 SQ. FT.',
    possession: 'Dec-2027',
    price: '₹ 90 L - ₹ 1.13 Cr',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'divine-green-leaf'
  },
  {
    id: 5,
    title: 'PRESTIGE LAVENDER FIELDS',
    location: 'VARTHUR WHITEFIELD, BANGALORE',
    configuration: '1 BHK, 2 BHK, 3 BHK, 4 BHK',
    area: '669 SQ. FT. - 3656 SQ. FT.',
    possession: 'May-2027',
    price: '₹ 64.99 L - ₹ 3.55 Cr',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'prestige-lavender-fields'
  },
  {
    id: 6,
    title: 'GODREJ ELEVATE',
    location: 'WHITEFIELD, BANGALORE',
    configuration: '2 BHK, 3 BHK',
    area: '1137 SQ. FT. - 1529 SQ. FT.',
    possession: 'Jun-2028',
    price: '₹ 80 L - ₹ 1.08 Cr',
    category: 'RESIDENTIAL APARTMENT',
    slug: 'godrej-elevate'
  }
];

export default function ProjectsPage() {
  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold text-center">
            PROJECTS
          </h1>
          <p className="text-center mt-2">Residential Projects in Bangalore for Sale</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-realty-darkNavy py-10 container">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-center text-xl mb-6">Search Your Dream Home!</h2>
          <div className="bg-white p-6 rounded-sm shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <h2 className="section-heading">OUR PROJECTS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <Card key={project.id} className="overflow-hidden property-card border-none">
                <div className="relative">
                  <div className="aspect-[4/3] relative bg-gray-200">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl font-bold text-gray-400">{project.title.charAt(0)}</div>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 bg-realty-green text-white px-3 py-1 text-xs">
                    {project.category}
                  </div>
                  {project.builderLogo && (
                    <Link
                      href={`/builders/${project.slug}`}
                      className="absolute bottom-4 left-4"
                    >
                      <Image
                        src={project.builderLogo}
                        alt="Builder Logo"
                        width={50}
                        height={30}
                        className="rounded-sm"
                      />
                    </Link>
                  )}
                </div>

                <CardContent className="pt-4">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-realty-red font-bold text-xl hover:text-realty-red/80 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">{project.location}</p>

                  <div className="mt-3 bg-gray-100 p-3">
                    <p className="text-realty-navy font-semibold mb-2 text-center">
                      {project.configuration}
                    </p>

                    <div className="flex items-center mt-2">
                      <div className="w-1/2 border-r border-gray-300 pr-2">
                        <div className="flex items-center text-xs">
                          <div className="w-5 h-5 bg-gray-200 flex items-center justify-center mr-1">
                            <span className="text-xs">📏</span>
                          </div>
                          <span>{project.area}</span>
                        </div>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center text-xs">
                          <div className="w-5 h-5 bg-gray-200 flex items-center justify-center mr-1">
                            <span className="text-xs">🗓️</span>
                          </div>
                          <span>Possession: {project.possession}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center bg-realty-navy text-white p-3">
                  <div className="text-lg font-bold">
                    {project.price}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-white hover:underline uppercase"
                  >
                    READ MORE
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-10">
            <div className="w-10 h-10 bg-realty-navy text-white flex items-center justify-center">
              1
            </div>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              2
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              3
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              4
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              5
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              6
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              7
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              8
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              9
            </Link>
            <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              10
            </Link>
            <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">
              ...
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
