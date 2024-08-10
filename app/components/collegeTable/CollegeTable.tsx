import { ICollegeTable } from "@/app/libs/types/types";

const CollegeTable = ({ data, error }: ICollegeTable) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
        <div className="p-8">
          <div
            role="alert"
            className="alert flex items-center bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 p-4 rounded-lg mb-8 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current w-8 h-8 mr-3 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-lg font-semibold">
              Our platform offers engineering cutoff scores based on five-year
              data. For the latest information, book an appointment with our
              experts.
            </span>
          </div>
          <div className="flex justify-center">
            {error ? (
              <div className="flex flex-col items-center justify-center w-full p-12 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
                <svg
                  className="animate-spin w-16 h-16 text-red-500 mb-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <p className="text-2xl font-bold text-center">
                  Try again. The selected college does not offer the selected
                  course. Please make sure you are selecting the correct course.
                </p>
              </div>
            ) : data && data.length > 0 ? (
              <div className="flex flex-col items-center justify-center w-full p-12 bg-green-50 border border-green-300 text-green-800 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-green-500 mb-6 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-2xl font-bold text-center">
                  Yay, Your chances of getting into this college are high!
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full p-12 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
                <svg
                  className="animate-spin w-16 h-16 text-red-500 mb-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <p className="text-2xl font-bold text-center">
                  Your chances of getting into the college are low.
                </p>
                <div className="mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20 h-20 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeTable;
