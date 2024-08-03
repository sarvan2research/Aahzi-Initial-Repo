"use client";
import Image from "next/image";
import Link from "next/link";
import useToggle from "../../api/hooks/useState";

const Navbar = () => {
  const [toggle, setToggle] = useToggle(false);

  return (
    <div className="relative">
      <div className="navbar bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 p-4">
        <div className="flex-none md:hidden" onClick={setToggle}>
          <button
            className="btn btn-square btn-ghost"
            title="bar"
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current transform transition-transform duration-300 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-auto gap-6">
          <div className="flex justify-evenly min-w-full max-sm:hidden">
            <Link
              href={"/"}
              className="relative text-xl text-white font-bold tracking-wider hover:text-lime-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Aahzi
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-lime-400 to-lime-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
            </Link>
            <Link
              href={"/rank-form"}
              className="relative text-xl text-white font-bold tracking-wider hover:text-lime-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              KYC <br /> 
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-lime-400 to-lime-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
            </Link>
          </div>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-white ring-offset-2 ring-offset-indigo-500">
                <Image
                  alt="person"
                  src="/person.png"
                  title="user-image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg p-4 animate-slide-down z-50">
          <div aria-labelledby="dropdownDefaultButton">
            <Link
              href={"/"}
              className="block text-indigo-600 hover:bg-indigo-100 w-fit p-2 rounded-md transition-colors duration-300 ease-in-out"
            >
              Aahzi
            </Link>
            <Link
              href={"/rank-form"}
              className="block text-indigo-600 hover:bg-indigo-100 w-fit p-2 rounded-md transition-colors duration-300 ease-in-out"
            >
              KYC
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
