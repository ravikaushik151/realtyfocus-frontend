'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const tabs = ['News', 'Tax & Legal', 'Help Guides', 'Investment'];

const articles = {
  News: [
    {
      title: 'Delhi govt mandates anti-smog guns',
      date: 'Mar 03, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'All about Delhi RERA new guidelines',
      date: 'Jan 17, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Delhi metro phase inaugurated',
      date: 'Jan 06, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Ropeways over Ya Delhi soon',
      date: 'Jan 03, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'New real estate bill approved by Parliament',
      date: 'Feb 10, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Delhi airport expansion to complete soon',
      date: 'Feb 25, 2025',
      image: '/images/icons/buy.svg',
    },
  ],

  'Tax & Legal': [
    {
      title: 'GST rate revision for property buyers',
      date: 'Feb 05, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Income tax benefits on home loans explained',
      date: 'Jan 22, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Property registration charges reduced',
      date: 'Mar 01, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Latest RERA compliance checklist for developers',
      date: 'Feb 15, 2025',
      image: '/images/icons/buy.svg',
    },
  ],

  'Help Guides': [
    {
      title: 'Step-by-step guide to buying your first home',
      date: 'Feb 12, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'How to apply for a home loan easily',
      date: 'Jan 29, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Tips to negotiate property prices',
      date: 'Feb 18, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Documents required for property registration',
      date: 'Mar 02, 2025',
      image: '/images/icons/buy.svg',
    },
  ],

  Investment: [
    {
      title: 'Top 5 emerging real estate locations in Delhi NCR',
      date: 'Feb 08, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Best investment options in 2025 real estate market',
      date: 'Jan 30, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Is co-living a good investment? Expert insights',
      date: 'Feb 20, 2025',
      image: '/images/icons/buy.svg',
    },
    {
      title: 'Commercial vs residential property investments',
      date: 'Mar 05, 2025',
      image: '/images/icons/buy.svg',
    },
  ],
};


export default function ProjectOverview() {
  const [activeTab, setActiveTab] = useState('News');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left - Image */}

<div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md mx-auto">
  <Image
    src="/images/projectOverview.webp"
    alt="Dream Home"
    width={600}      // set a base width
    height={400}     // set corresponding height for aspect ratio
    className="w-full h-auto object-cover"
    priority
  />
</div>


        {/* Right - Content */}
        <div>
          <h3 className="uppercase text-sm font-semibold text-red-600">
            All Property Needs - One Portal
          </h3>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Find Better Places to Live, Work <br /> and Wonder…
          </h1>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-red-600">Buy a Home</h2>
            <p className="text-gray-600 mt-1">
              Find, Buy & Own Your Dream Home
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Explore from Apartments, land, builder floors, villas and more.
            </p>
            <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition flex items-center gap-2">
              Explore Buying <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Top articles on home buying
              </h2>
              <p className="text-gray-500 text-sm">
                Read from Beginners check-list to Pro Tips
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-5 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-red-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
            {articles[activeTab].map((article, index) => (
              <div key={index} className="flex gap-3 items-start">
              <Image
              src={article.image}
              alt={article.title}
              width={64}
              height={64}
              className="w-16 h-16 rounded-md object-cover"
            />
                <div>
                  <h4 className="text-gray-800 font-medium text-sm hover:text-red-600 transition cursor-pointer">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Read More */}
          <div className="mt-6">
            <a
              href="#"
              className="text-red-600 hover:underline text-sm flex items-center gap-1"
            >
              Read realty news, guides & articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
