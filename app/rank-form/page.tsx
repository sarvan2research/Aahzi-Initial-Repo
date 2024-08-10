"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
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
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
  const router = useRouter();

  //Dynamic loading of course details
  const [searchCourseQuery, setSearchCourseQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [predefinedCourseNames, setPredefinedCourseNames] = useState<string[]>(
    []
  );
  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses");
      const courseData: Course[] = await response.json();
      setCourses(courseData);
      setPredefinedCourseNames(courseData.map((course) => course.courseName));
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

  const handleCourseInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchCourseQuery(e.target.value);
    setFormData((prevData) => ({ ...prevData, course: e.target.value }));
  };

  //Dynamic loading of course details
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [predefinedCollegeNames, setPredefinedCollegeNames] = useState<
    string[]
  >([]);

  useEffect(() => {
    async function fetchColleges() {
      const response = await fetch("/api/colleges");
      const data: College[] = await response.json();
      setColleges(data);
      setPredefinedCollegeNames(data.map((college) => college.collegeName));
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

  const handleCollegeInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchQuery(e.target.value);
    setFormData((prevData) => ({ ...prevData, collegeName: e.target.value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue = name === "rank" ? parseFloat(value) : value;
    const updatedValue =
      typeof numericValue === "number" && !isNaN(numericValue)
        ? numericValue
        : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisclaimerChecked) {
      setErrors({ ...errors, disclaimer: "You must accept the disclaimer" });
      return;
    }
    try {
      setIsLoading(true);
      const parsedFormData = formRankSchema.parse(formData);
      const data = { ...parsedFormData };

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

  const formRankSchema = z.object({
    name: z.string().min(1, "Name is required."),
    mobileNumber: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be 10 digits."),
    collegeName: z
      .string()
      .min(1, "College name is required")
      .refine((value) => predefinedCollegeNames.includes(value), {
        message:
          "Type more than two characters and select desired college from drop down.",
      }),
    rank: z.number().min(1, "Rank must be greater than 0."),
    course: z
      .string()
      .min(1, "Course is required")
      .refine((value) => predefinedCourseNames.includes(value), {
        message:
          "Type more than two characters and select desired course from drop down.",
      }),
    community: z.string().min(1, "Community is required."),
  });

  return (
    <div className="p-10 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex flex-col justify-center items-center">
      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-16 max-md:grid-flow-row m-2 max-md:gap-4 bg-white rounded-3xl shadow-lg p-10">
        <div className="grid place-items-center text-center">
          <h2 className="text-5xl font-extrabold text-blue-600 max-md:text-3xl mb-6">
            Welcome to Aahzi
          </h2>
          <Image
            src="/chatbot-welocme.jpg"
            alt="chatbot-welcome"
            title="chatbot-welcome"
            className="max-w-sm rounded-xl max-sm:w-6/12 max-md:w-6/12 transition-transform duration-300 transform hover:scale-105"
            width={500}
            height={500}
          />

          <h2 className="font-bold leading-loose hidden max-md:block text-sm tracking-widest text-black">
            Here you can check your Cutoff and Top Ranklist of colleges will
            update soon...
          </h2>
        </div>

        <form
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 p-8 rounded-2xl shadow-xl"
          onSubmit={onSubmit}
        >
          <p className="text-4xl font-bold text-white mb-8 text-center">
            Know Your College
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
              />
              {errors.mobileNumber && (
                <p className="text-white text-sm">{errors.mobileNumber}</p>
              )}
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
              )}
            </div>
            {/* <div className="grid grid-flow-col gap-4 max-md:grid-flow-row max-sm:grid-flow-row"> */}
            <div className="grid grid-cols-1 gap-x-2 gap-y-4">
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  label="Course Name / படிப்பின் பெயர்"
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
                {errors.course && (
                  <p className="text-red-500 text-sm">{errors.course}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-2 gap-y-4">
              <label
                htmlFor="community"
                className="block text-base font-medium leading-6 text-white"
              >
                Community / சமூகத்தின் பெயர்
              </label>

              <div className="sm:col-span-2">
                <select
                  name="community"
                  className="select w-10/12  min-w-max border-green-500 bg-white text-black"
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
            {/* </div> */}
            <div className="grid grid-cols-1 gap-x-2 gap-y-4">
              <div className="sm:col-span-2">
                <Input
                  id="rank"
                  label="Rank / தரவரிசை"
                  type="text"
                  value={formData.rank}
                  onChange={handleInputChange}
                  placeholder="Enter your rank"
                  maxLength={3}
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
                  label="College Name/ கல்லூரி பெயர்"
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
                {errors.collegeName && (
                  <p className="text-red-500 text-sm">{errors.collegeName}</p>
                )}
              </div>
            </div>
            <div>
              <label className="flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  checked={isDisclaimerChecked}
                  onChange={(e) => setIsDisclaimerChecked(e.target.checked)}
                  className="mr-2"
                />
                I understand that college predictions do not guarantee
                admission.
              </label>
              {errors.disclaimer && (
                <p className="text-red-500 text-sm">{errors.disclaimer}</p>
              )}
            </div>
            <div className="text-center">
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
                  className="align-middle px-8 py-4 text-2xl font-bold rounded-full shadow-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-cyan-700 text-white hover:bg-gradient-to-l hover:from-cyan-700 hover:to-indigo-700 transform hover:scale-110 transition-transform duration-700 ease-in-out max-sm:w-full animate-fade-in-up animation-delay-400"
                  title="submit"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBotForm;
