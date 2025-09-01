'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Pay on Credit',
    description: 'Pay your rent using Credit Card',
    icon: '/images/icons/buy.svg',
  },
  {
    id: 2,
    title: 'Housing Premium',
    description: 'Instant access to zero brokerage properties',
    icon: '/images/icons/buy.svg',
  },
  {
    id: 3,
    title: 'Home Loans',
    description: 'Lowest interest rate offers',
    icon: '/images/icons/buy.svg',
  },
  {
    id: 4,
    title: 'Housing Protect',
    description: 'Protection against cyber frauds',
    icon: '/images/icons/buy.svg',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Housing Edge
            </h2>
            <p className="text-gray-500 mt-1">
              Explore property-related services
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition">
            Explore Services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-lg bg-red-100 flex items-center justify-center">
               <Image
  src={service.icon} // can be local path or external URL (with config)
  alt={service.title}
  width={32} // w-8 = 32px
  height={32} // h-8 = 32px
  className="object-contain"
/>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Explore Button */}
        <div className="flex justify-center mt-6 md:hidden">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition">
            Explore Services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
