import { ICollegeDetails, ICollegeTable } from "@/app/libs/types/types";

const CollegeTable = ({ data }: ICollegeTable) => {
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
        {data && data.length > 0 ? (
          <table className="table-auto w-2/4 bg-emerald-200 border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <caption className="table-caption mt-5 mb-4 text-base text-white-900 text-center">
              The following Colleges were listed based on a trusted Statistical
              data analyzed by Doctorates and Trained professors
            </caption>
            <thead className="bg-emerald-300">
              <tr>
                <th className="p-4 text-base text-cyan-600 border border-gray-200">
                  College Code
                </th>
                <th className="p-4 text-base text-cyan-600 border border-gray-200">
                  College Name
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: ICollegeDetails) => (
                <tr
                  key={item?.id}
                  className="odd:bg-emerald-100 even:bg-emerald-200"
                >
                  <td className="p-4 border border-gray-200">
                    {item?.collegeCode}
                  </td>
                  <td
                    className="p-4 max-w-sm whitespace-nowrap overflow-hidden text-ellipsis hover:cursor-pointer border border-gray-200"
                    title={item?.collegeName}
                  >
                    {item?.collegeName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center w-full p-6 bg-red-100 border border-red-300 text-red-800 rounded-lg shadow-md">
            <p className="text-center">
              Based on the given data, the chances of getting into this college
              for the specified course and community are low.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeTable;
