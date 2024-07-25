'use client';
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import formSchema from "../api/schema/schema";
import Input from "../components/formInputs/Input";
import Image from "next/image";

const ChatBotForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    physicsMarks: 0,
    chemistryMarks: 0,
    rank: 0,
    course: "",
    community: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const router = useRouter();

  const colleges = [
    "Knowledge Institute of Technology",
    "KSR",
    "Sona",
    "Kongu",
    "PSR",
    // Add more college names here
  ];

  useEffect(() => {
    if (searchQuery) {
      setFilteredColleges(
        colleges.filter((college) =>
          college.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setFilteredColleges([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue = name.includes("Marks") || name === "rank" ? parseFloat(value) : value;
    const updatedValue =
      typeof numericValue === "number" && !isNaN(numericValue)
        ? numericValue
        : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownSelect = (college: string) => {
    setSearchQuery(college);
    setFormData((prevData) => ({ ...prevData, course: college }));
    setShowDropdown(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const parsedFormData = formSchema.parse(formData);

      const { physicsMarks, chemistryMarks, rank, ...newFormData } =
        parsedFormData;

      const data = { ...newFormData };

      const userDetail = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userDetail.ok) {
        const userID = await userDetail.json();
        router.push(`/data?user=${userID}`);
      }
      
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
          setErrors(newErrors);
        });
      } else {
        console.log("Form has no errors.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 grid place-items-center grid-flow-col gap-16 max-md:grid-flow-row m-2 max-md:gap-4">
      <div className="grid place-items-center">
        <h2 className="text-5xl font-bold text-blue-400 max-md:text-2xl mb-4">
          Welcome to Aahzi
        </h2>
        <Image
          src="/chatbot-welocme.jpg"
          alt="chatbot-welcome"
          title="chatbot-welcome"
          className="max-w-sm rounded-lg max-sm:w-6/12 max-md:w-6/12"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h2 className="font-bold leading-loose hidden max-md:block text-sm tracking-widest">
          Here you can check your Cutoff and Top Ranklist of colleges will update soon...
        </h2>
      </div>
      <form
        className="grid place-items-center bg-gradient-to-r from-indigo-400 to-cyan-400 p-7 rounded-xl max-md:w-3/5"
        onSubmit={onSubmit}
      >
        <p className="text-5xl font-bold max-md:text-2xl text-white">Form</p>
        <div className="space-y-6">
          <div>
            <Input
              id="name"
              label="Name / பெயர்"
              type="text"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleInputChange}
              className="input-name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              id="mobileNumber"
              label="Mobile Number / கைபேசி எண்"
              type="tel"
              value={formData.mobileNumber}
              placeholder="Enter your Mobile Number"
              maxLength={10}
              onChange={handleInputChange}
              className="input-mobileNumber"
            />
            {errors.mobileNumber && (
              <p className="text-white text-sm">{errors.mobileNumber}</p>
            )}
          </div>
          <div className="grid grid-flow-col gap-4 max-md:grid-flow-row max-sm:grid-flow-row">
            <div>
              <select
                name="course"
                className="select w-10/12 min-w-max border-green-500 text-black bg-white"
                title="Select any Course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select any Course
                </option>
                <option value="ME">Mechanical</option>
                <option value="EE">EEE</option>
                <option value="EC">ECE</option>
                <option value="CS">CSE</option>
                <option value="CE">Civil</option>
                <option value="AIDS">AIDS</option>
                <option value="IM">IT</option>
                <option value="MC">Mechatronics</option>
                <option value="AIML">AIML</option>
              </select>
              {errors.course && (
                <p className="text-red-500 text-sm">{errors.course}</p>
              )}
            </div>
            <div>
              <select
                name="community"
                className="select w-10/12 min-w-max border-green-500 bg-white text-black"
                title="Select your Community"
                value={formData.community}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select your Community
                </option>
                <option value="cutOffOC">OC</option>
                <option value="cutOffBC">BC</option>
                <option value="cutOffBCM">BCM</option>
                <option value="cutOffMBC">MBC</option>
                <option value="cutOffMBCDNC">MBCDNC</option>
                <option value="cutOffMBCV">MBCV</option>
                <option value="cutOffSC">SC</option>
                <option value="cutOffST">ST</option>
                <option value="cutOffSCA">SCA</option>
              </select>
              {errors.community && (
                <p className="text-red-500 text-sm">{errors.community}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-2 gap-y-4">
            <div className="sm:col-span-2">
              <Input
                id="rank"
                label="Enter the Rank"
                type="text"
                value={formData.rank}
                onChange={handleInputChange}
                placeholder="Enter your rank"
                maxLength={3}
                className="input-rank"
              />
              {errors.rank && (
                <p className="text-red-500 text-sm">{errors.rank}</p>
              )}
            </div>
          </div>
          <div>
            <Input
              id="search"
              label="Select College"
              type="text"
              value={searchQuery}
              placeholder="Enter college name"
              onChange={handleSearchChange}
              className="input-search"
            />
            {showDropdown && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-w-full sm:max-w-md w-full max-h-48 overflow-auto">
                {filteredColleges.map((college) => (
                  <li
                    key={college}
                    className="p-2 cursor-pointer hover:bg-gray-200 text-black transition-colors duration-150"
                    onClick={() => handleDropdownSelect(college)}
                  >
                    {college}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {isLoading ? (
              <button
                className="h-12 rounded-lg bg-slate-500 text-white w-full text-lg"
                title="submit"
                type="submit"
              >
                Submitting Data...
              </button>
            ) : (
              <button
                className="btn btn-neutral text-white w-full text-lg"
                title="submit"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150"
            >
              Yes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-150"
            >
              No
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBotForm;
