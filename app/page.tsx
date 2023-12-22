import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid place-items-center p-10 min-h-screen bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="flex justify-center items-center">
        <Image
          src="/old-approach.jpg"
          alt="old-approach-method"
          className="max-w-sm rounded-lg shadow-2xl"
          width={500}
          height={500}
        />
        <div className="text-center p-4 leading-7">
          <h1 className="text-3xl font-bold leading-10 text-indigo-800">
            Hello there!
            <br />
            Welcome to Aahzi
          </h1>
          <p className="p-6 text-justify text-white">
            Aahzi, an educational consultancy, offers optimal career paths for
            students who have completed their schooling. This service is
            delivered by a team of seasoned educators and industry specialists.
            Aahzi assists by recommending suitable courses, institutions,
            universities, study locations, and relevant information aligned with
            current technology trends and job market demands. The portal is
            designed to be exceptionally user-friendly, eliminating the need for
            expertise in college education or reliance on additional educational
            consultants. Aahzi serves as a comprehensive educational consultant.
          </p>
          <button className="btn btn-secondary">
            <Link href={"/form"}>Get Started</Link>
          </button>
        </div>
        <Image
          src="/new-approach.jpg"
          alt="new-approach-method"
          className="max-w-sm rounded-lg shadow-2xl"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
