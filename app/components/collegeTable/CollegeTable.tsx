import { ICollegeTable } from "@/app/libs/types/types";

const CollegeTable = ({ data, courseOffered }: ICollegeTable) => {
  console.log("Data received:", data);

  // Check if any college in the data array has a non-empty cutoffDetailsList
  const hasData = data.some(college => college.cutoffDetailsList && college.cutoffDetailsList.length > 0);
  console.log("Has data:", hasData);

  return (
    <div className="">
      <div role="alert" className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="max-sm:text-sm">
          Our platform offers engineering cutoff scores based on five-year data,
          but please note these are estimations subject to change. For the
          latest information, book an appointment with our experts dedicated to
          guiding your educational journey amid annual variations in cutoffs.
          Your success is our priority.
        </span>
      </div>

      <div className="flex justify-center">
        {!courseOffered ? (
          <div className="text-yellow-500 text-center">
            Your entered details do not match any given college course.
          </div>
        ) : hasData ? (
          <div className="text-green-500 text-center">
            Yay! Your chances of getting into this college are high.
          </div>
        ) : (
          <div className="text-red-500 text-center">
            Oops! Your chance of getting into this college is low.
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeTable;
