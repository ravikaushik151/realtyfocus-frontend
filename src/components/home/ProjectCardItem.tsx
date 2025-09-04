import Image from "next/image";
import Link from "next/link";

const IMAGE_BASE_URL = "https://realtyfocus.info/images/";

const ProjectCards = ({ project }) => {
  return (
    <div
      className="relative w-full flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition hover:shadow-xl"
      
    >
      {/* RIGHT SIDE WHITE CLOUD EFFECT */}
      <div className="absolute top-0 right-[-15%] w-[50%] h-full bg-white opacity-50 blur-3xl rounded-full pointer-events-none z-0"></div>

      {/* LEFT INFO PANEL */}
      <div className="w-full md:w-[40%] bg-gradient-to-b from-red-50 to-red-100 p-6 flex flex-col justify-between relative z-10">
        {/* Top Section */}
        <div className="flex items-start gap-4">
          {/* Project Logo */}
          <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden">
            <Image
              src={
                project.logo
                  ? `https://realtyfocus.info/images/builder/${project.logo}`
                  : "/default-logo.png"
              }
              alt={project.title}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          {/* Project Name & Link */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {project.title}
            </h3>
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm text-red-600 hover:underline"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Middle Section */}
        <div className="mt-5">
          <h4 className="text-2xl font-bold text-gray-900">{project.name}</h4>
          <p className="text-gray-600 text-sm">
            {project.location
              ?.toLowerCase()
              .split(" ")
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>

          {/* Price */}
          <p className="mt-4 text-xl font-semibold text-gray-900">
            {project.price}
          </p>

          {/* Configuration */}
          <p className="text-sm text-gray-500">{project.configuration}</p>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <Link href={`/projects/${project.slug}`}>
            <button className="bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-full py-2 px-6 w-full">
              Contact
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div className="w-full md:w-[60%] relative z-10">
        <Image
          src={
            project.imageUrl?.startsWith("https://storage.googleapis.com/")
              ? project.imageUrl
              : IMAGE_BASE_URL + "fimage/" + project.imageUrl
          }
          alt={project.title}
          width={800}
          height={500}
          className="w-full h-72 md:h-full object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default ProjectCards;
