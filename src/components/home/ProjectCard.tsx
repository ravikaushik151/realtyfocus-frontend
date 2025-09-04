// components/ProjectCard.tsx

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faRulerCombined,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const IMAGE_BASE_URL = "https://realtyfocus.info/images/";

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative w-full max-w-sm bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative">
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
          {project.category?.toUpperCase()}
        </span>

        {/* Project Image */}
        <Image
          src={
            project.imageUrl?.startsWith("https://storage.googleapis.com/")
              ? project.imageUrl
              : IMAGE_BASE_URL + "fimage/" + project.imageUrl
          }
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
          {project.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Project Title */}
        <h2 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
          {project.title
            ? project.title
                .toLowerCase()
                .split(" ")
                .map(
                  (word) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ")
            : ""}
        </h2>

        {/* Builder */}
        <p className="text-gray-500 text-sm flex items-center mt-1">
          <FontAwesomeIcon
            icon={faBuilding}
            className="w-4 h-4 mr-2 text-red-500"
          />
          {project.buildername}
        </p>

        {/* Location */}
        <p className="text-gray-500 text-sm flex items-center mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21c-4.97-5.82-7-9.12-7-12a7 7 0 1114 0c0 2.88-2.03 6.18-7 12z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {project.location
            ? project.location
                .toLowerCase()
                .split(" ")
                .map(
                  (word) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ")
            : ""}
        </p>

        {/* Project Features */}
        <ul className="mt-4 space-y-2 text-gray-600">
          <li className="flex items-center text-sm">
            <FontAwesomeIcon
              icon={faBed}
              className="w-4 h-4 mr-2 text-blue-500"
            />
            {project.configuration}
          </li>
          <li className="flex items-center text-sm">
            <FontAwesomeIcon
              icon={faRulerCombined}
              className="w-4 h-4 mr-2 text-green-500"
            />
            {project.area}
          </li>
          <li className="flex items-center text-sm">
            <FontAwesomeIcon
              icon={faClock}
              className="w-4 h-4 mr-2 text-yellow-500"
            />
            {project.possession}
          </li>
        </ul>

        {/* View Details Button */}
        <Link href={`/projects/${project.slug}`} passHref>
          <button className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300">
            VIEW DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
