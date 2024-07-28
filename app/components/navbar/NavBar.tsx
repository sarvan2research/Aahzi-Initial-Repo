"use client";
import Image from "next/image";
import Link from "next/link";
import useToggle from "../../api/hooks/useState";

const Navbar = () => {
  const [toggle, setToggle] = useToggle(false);

  return (
    <div>
      <div className="navbar bg-blue-500 shadow-xl">
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
              className="inline-block w-5 h-5 stroke-current"
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
              className="text-xl text-white font-bold tracking-wider hover:text-lime-400 hover:border-b-2 border-indigo-600"
            >
              Aahzi
            </Link>
            <Link
              href={"/form"}
              className="text-xl text-white font-bold tracking-wider hover:text-lime-400 hover:border-b-2 border-indigo-600"
            >
              Form
            </Link>
            <Link
              href={"/rank-form"}
              className="text-xl text-white font-bold tracking-wider hover:text-lime-400 hover:border-b-2 border-indigo-600"
            >
              Rank Form
            </Link>
          </div>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
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
        <div className="p-4">
          <div aria-labelledby="dropdownDefaultButton">
            <Link
              href={"/"}
              className="block text-white hover:bg-slate-200 w-fit p-2 hover:text-rose-500"
            >
              Aahzi
            </Link>
            <Link
              href={"/form"}
              className="block text-white hover:bg-slate-200 w-fit p-2 hover:text-rose-500"
            >
              Form
            </Link>
            <Link
              href={"/rank-form"}
              className="block text-white hover:bg-slate-200 w-fit p-2 hover:text-rose-500"
            >
              Rank Form
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
