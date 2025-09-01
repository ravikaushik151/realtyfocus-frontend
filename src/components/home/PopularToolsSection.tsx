'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const tools = [
  {
    id: 1,
    title: 'Budget Calculator',
    description: 'Check your affordability range for buying home',
    icon:'/images/icons/buy.svg',
  },
  {
    id: 2,
    title: 'EMI Calculator',
    description: 'Calculate your home loan EMI',
   icon:'/images/icons/buy.svg',
  },
  {
    id: 3,
    title: 'Loan Eligibility',
    description: 'See what you can borrow for your home',
    icon:'/images/icons/buy.svg',
  },
  {
    id: 4,
    title: 'Area Converter',
    description: 'Convert one area into any other easily',
   icon:'/images/icons/buy.svg',
  },
];

export default function PopularToolsSection() {
  return (
    <section className="py-16 bg-[#f5faff]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
             <Image
  src="/images/icons/buy.svg"
  alt="Tools"
  width={24}   // w-6 = 24px
  height={24}  // h-6 = 24px
  className="object-contain"
/>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Use popular tools
              </h2>
              <p className="text-gray-500 text-sm">Go from browsing to buying</p>
            </div>
          </div>

          {/* View All Insights Button */}
          <button className="hidden md:flex items-center gap-2 px-5 py-2 border border-red-600 text-red-600 rounded-md font-medium hover:bg-red-50 transition">
            View all Insights
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tools Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
                <Image
  src={tool.icon}      // local path or external URL
  alt={tool.title}
  width={32}           // Tailwind w-8 = 32px
  height={32}          // Tailwind h-8 = 32px
  className="object-contain"
/>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View Button */}
        <div className="flex justify-center mt-6 md:hidden">
          <button className="flex items-center gap-2 px-5 py-2 border border-red-600 text-red-600 rounded-md font-medium hover:bg-red-50 transition">
            View all Insights
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
