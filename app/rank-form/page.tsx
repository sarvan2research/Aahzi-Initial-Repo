"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import formSchema from "../api/schema/schema";
import Input from "../components/formInputs/Input";
import Image from "next/image";

interface College {
  collegeName: string;
  collegeCode: number;
}

interface Course {
  courseCode: string;
  courseName: string;
}

const ChatBotForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    collegeName: "",
    rank: 0,
    course: "",
    community: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  //Dynamic loading of course details
  const [searchCourseQuery, setSearchCourseQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses");
      const courseData: Course[] = await response.json();
      setCourses(courseData);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchCourseQuery.length > 2) {
      const filtered = courses.filter((course) =>
        course.courseName
          .toLowerCase()
          .includes(searchCourseQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  }, [searchCourseQuery, courses]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setFormData((prevData) => ({ ...prevData, course: course.courseName }));
    setSearchCourseQuery(""); // Clear search query
    setFilteredCourses([]); // Hide the dropdown
  };

  const handleCourseInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCourseQuery(e.target.value);
    setFormData((prevData) => ({ ...prevData, course: e.target.value }));
  };

  //Dynamic loading of course details
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  useEffect(() => {
    async function fetchColleges() {
      const response = await fetch("/api/colleges");
      const data: College[] = await response.json();
      setColleges(data);
    }
    fetchColleges();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = colleges.filter((college) =>
        college.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges([]);
    }
  }, [searchQuery, colleges]);

  const handleCollegeSelect = (college: College) => {
    setSelectedCollege(college);
    setFormData((prevData) => ({
      ...prevData,
      collegeName: college.collegeName,
    }));
    setSearchQuery(""); // Clear search query
    setFilteredColleges([]); // Hide the dropdown
  };

  const handleCollegeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFormData((prevData) => ({ ...prevData, collegeName: e.target.value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue =
      name.includes("Marks") || name === "rank" ? parseFloat(value) : value;
    const updatedValue =
      typeof numericValue === "number" && !isNaN(numericValue)
        ? numericValue
        : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      //const parsedFormData = formSchema.parse(formData);
      console.log(formData);
      const data = { ...formData };

      const userDetail = await fetch("/api/registerUserRank", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userDetail.ok) {
        const userID = await userDetail.json();
        router.push(`/dataRank?user=${userID}`);
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
          Here you can check your Cutoff and Top Ranklist of colleges will
          update soon...
        </h2>
      </div>
      <form
        className="grid place-items-center bg-gradient-to-r from-indigo-400 to-cyan-400 p-7 rounded-xl max-md:w-3/5"
        onSubmit={onSubmit}
      >
        <p className="text-5xl font-bold max-md:text-2xl text-white">
          Rank Form
        </p>
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
            <div className="grid grid-cols-1 gap-x-2 gap-y-4">
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  label="Enter the Course Name"
                  value={searchCourseQuery || formData.course}
                  placeholder="Type to search for courses..."
                  id="courseName"
                  onChange={handleCourseInputChange}
                />
                {filteredCourses.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-w-full sm:max-w-md w-full max-h-48 overflow-auto">
                    {filteredCourses.map((course) => (
                      <li
                        key={course.courseCode}
                        onClick={() => {
                          console.log(course);
                          handleCourseSelect(course);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200 text-black transition-colors duration-150"
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedCourse?.courseCode === course.courseCode
                              ? "lightgray"
                              : "white",
                        }}
                      >
                        {course.courseName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
                <option value="rankOC">OC</option>
                <option value="rankBC">BC</option>
                <option value="rankBCM">BCM</option>
                <option value="rankMBC">MBC</option>
                <option value="rankMBCDNC">MBCDNC</option>
                <option value="rankMBCV">MBCV</option>
                <option value="rankSC">SC</option>
                <option value="rankST">ST</option>
                <option value="rankSCA">SCA</option>
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
          <div className="grid grid-cols-1 gap-x-2 gap-y-4">
            <div className="sm:col-span-2">
              <Input
                type="text"
                label="Enter the College"
                value={searchQuery || formData.collegeName}
                onChange={handleCollegeInputChange}
                placeholder="Type to search for colleges..."
                id="collegeName"
              />
              {filteredColleges.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-w-full sm:max-w-md w-full max-h-48 overflow-auto">
                  {filteredColleges.map((college) => (
                    <li
                      key={college.collegeCode}
                      onClick={() => handleCollegeSelect(college)}
                      className="p-2 cursor-pointer hover:bg-gray-200 text-black transition-colors duration-150"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedCollege?.collegeCode === college.collegeCode
                            ? "lightgray"
                            : "white",
                      }}
                    >
                      {college.collegeName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
          {/* <div className="mt-4 flex justify-center space-x-4">
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
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default ChatBotForm;
