import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-sm:gap-10 max-sm:flex max-sm:flex-col-reverse items-center">
        {/* Old Approach Image */}
        <div className="relative group max-md:w-full max-sm:w-full transform hover:scale-105 transition-transform duration-700 ease-in-out">
          <Image
            src="/old-approach.jpg"
            alt="old-approach-method"
            title="old-approach-method"
            className="rounded-lg shadow-2xl max-sm:w-full"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700  opacity-0 group-hover:opacity-90 transition-opacity duration-700 ease-in-out rounded-lg"></div>
        </div>

        {/* Text and Get Started Button */}
        <div className="grid place-items-center text-center gap-8 p-4 max-sm:p-0">
          <h1 className="text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 tracking-widest drop-shadow-2xl max-sm:text-5xl max-sm:tracking-wide animate-fade-in-up">
            Hello Future Engineers!
            <br />
            Welcome to Aahzi
          </h1>
          <p className="text-xl text-white leading-8 tracking-widest drop-shadow-lg max-md:tracking-normal max-sm:text-lg max-sm:p-4 animate-fade-in-up animation-delay-200">
            Aahzi, an educational consultancy, offers optimal career paths for students who have completed their schooling. This service is delivered by a team of seasoned educators and industry specialists. Aahzi assists by recommending suitable courses, institutions, universities, study locations, and relevant information aligned with current technology trends and job market demands. The portal is designed to be exceptionally user-friendly, eliminating the need for expertise in college education or reliance on additional educational consultants. Aahzi serves as a comprehensive educational consultant.
          </p>
          <Link
            className="px-8 py-4 text-2xl font-bold rounded-full shadow-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-cyan-700 text-white hover:bg-gradient-to-l hover:from-cyan-700 hover:to-indigo-700 transform hover:scale-110 transition-transform duration-700 ease-in-out max-sm:w-full animate-fade-in-up animation-delay-400"
            href="/rank-form"
          >
            Get Started
          </Link>
        </div>

        {/* New Approach Image */}
        
      </div>
    </div>
  );
}
