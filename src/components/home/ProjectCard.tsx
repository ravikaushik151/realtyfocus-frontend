// components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBed, faRulerCombined, faClock } from '@fortawesome/free-solid-svg-icons';


const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="relative">
                {/* New Launch Tag */}
                <span className="absolute top-0 left-0 bg-red-600 text-white px-4 py-1 rounded-br-lg">{project.category}</span>
                {/* Image */}
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                />
                {/* Price */}
                <div className="absolute bottom-0 right-0 p-2">
                    <span className="bg-black text-white px-4 py-1 rounded-bl-lg">{project.price}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 relative">
                {/* Title */}
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                {/* Subtitle - Builder Name */}
                <p className="text-gray-600 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM3.854 20.146a5 5 0 006.792 0l1.854-1.854m0 0a5 5 0 00-6.792 0l-1.854 1.854m19.646 0A5 5 0 0118 16v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h4" />
                    </svg>
                    Godrej Properties
                </p>
                {/* Location */}
                <p className="flex items-center text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414 17.657 8.172a4 4 0 015.656 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 0012 15c.142 0 .285.01.427.022" />
                    </svg>
                    {project.location}
                </p>

                {/* Features */}
                <ul className="list-none text-gray-600 mb-4 space-y-2">
                    <li className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-1 text-red-500" />
                        Apartment
                    </li>
                    <li className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faBed} className="w-4 h-4 mr-1 text-blue-500" />
                        {project.configuration}
                    </li>
                    <li className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faRulerCombined} className="w-4 h-4 mr-1 text-green-500" />
                        {project.area}
                    </li>
                    <li className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1 text-yellow-500" />
                        Announcing - Soon
                    </li>
                </ul>

                {/* Action Button */}
                <Link href={`/projects/${project.slug}`} passHref>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full">
                        VIEW DETAILS
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;