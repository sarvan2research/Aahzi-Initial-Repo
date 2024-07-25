import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-r from-indigo-400 to-cyan-400 max-sm:flex max-sm:flex-col-reverse">
      <div className="grid place-items-center grid-flow-col max-md:grid-flow-row max-sm:grid-flow-row max-sm:gap-8 max-md:gap-8">
        <Image
          src="/old-approach.jpg"
          alt="old-approach-method"
          title="old-approach-method"
          className="h-3/6 rounded-lg shadow-2xl max-sm:w-6/12 max-md:w-6/12 max-sm:h-5/6 max-md:h-5/6"
          width={500}
          height={500}
        />
        <div className="grid place-items-center gap-2 p-2">
          <h1 className="text-center text-4xl font-bold leading-normal drop-shadow-xl text-emerald-100 tracking-wider">
            Hello there!
            <br />
            Welcome to Aahzi
          </h1>
          <p className="p-4 text-justify text-white leading-7 tracking-wider max-md:tracking-wide">
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
 
          <Link className="p-4 duration-500 font-bold rounded-lg text-2xl tracking-wider shadow-2xl bg-gradient-to-r from-indigo-400 to-cyan-400
          text-white blur-sm hover:blur-0 max-sm:blur-0 max-md:blur-0" href={"/form"}>
            Get Started
          </Link>
        </div>
        <Image
          src="/new-approach.jpg"
          alt="new-approach-method"
          title="new-approach-method"
          className="h-3/6 rounded-lg shadow-2xl max-sm:w-6/12 max-md:w-6/12 max-sm:h-5/6 max-md:h-5/6"
          width={500}
          height={100}
        />
      </div>
    </div>
  );
}
