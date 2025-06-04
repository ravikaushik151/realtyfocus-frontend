// components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBed, faRulerCombined, faClock } from '@fortawesome/free-solid-svg-icons';

const IMAGE_BASE_URL = "https://realtyfocus.info/images/";

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="relative">
                {/* New Launch Tag */}
                <span className="absolute top-0 left-0 bg-red-600 text-white px-4 py-1 rounded-br-lg">
                    {project.category?.toUpperCase()}
                </span>


                {/* Image */}
                <Image
                    src={
                        project.imageUrl?.startsWith("https://storage.googleapis.com/")
                            ? project.imageUrl
                            : IMAGE_BASE_URL + 'fimage/' + project.imageUrl
                    }
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
                <h2 className="text-xl font-bold mb-2">
                    {project.title
                        ? project.title
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        : ''}
                </h2>
                {/* Subtitle - Builder Name */}
                <p className="text-gray-600 mb-2 flex items-center">
                    <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-1 text-red-500" />
                    {project.buildername}
                </p>
                {/* Location */}
                <p className="flex items-center text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21c-4.97-5.82-7-9.12-7-12a7 7 0 1114 0c0 2.88-2.03 6.18-7 12z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location
                        ? project.location
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        : ''}
                </p>

                {/* Features */}
                <ul className="list-none text-gray-600 mt-4 mb-4 space-y-2">
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
                        {project.possession}
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