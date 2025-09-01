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

const ProjectCardNew = ({ project }) => {
  return (
    <div className="group relative w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
      
      {/* Image Section */}
      <div className="relative">
        {/* Category Tag */}
        {project.category && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
            {project.category.toUpperCase()}
          </span>
        )}

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
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Price Badge */}
        {project.price && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
            {project.price}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Project Title */}
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
          {project.title
            ? project.title
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : ""}
        </h2>

        {/* Builder */}
        {project.buildername && (
          <p className="text-gray-500 text-sm flex items-center mt-2">
            <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-2 text-red-500" />
            {project.buildername}
          </p>
        )}

        {/* Location */}
        {project.location && (
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
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        )}

        {/* Project Features */}
        <ul className="mt-4 grid grid-cols-3 gap-2 text-gray-700">
          {project.configuration && (
            <li className="flex items-center text-xs">
              <FontAwesomeIcon icon={faBed} className="w-4 h-4 mr-1 text-blue-500" />
              {project.configuration}
            </li>
          )}
          {project.area && (
            <li className="flex items-center text-xs">
              <FontAwesomeIcon icon={faRulerCombined} className="w-4 h-4 mr-1 text-green-500" />
              {project.area}
            </li>
          )}
          {project.possession && (
            <li className="flex items-center text-xs">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1 text-yellow-500" />
              {project.possession}
            </li>
          )}
        </ul>

        {/* View Details Button */}
        <Link href={`/projects/${project.slug}`} passHref>
          <button className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02]">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCardNew;
