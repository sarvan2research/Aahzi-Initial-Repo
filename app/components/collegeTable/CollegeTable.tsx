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
        <table className="table table-auto w-2/4 bg-emerald-200">
          <caption className="table-caption mt-5 mb-4 text-base text-gray-900 text-center">
            The following Colleges were listed based on a trusted Statistical data analyzed by Doctorates and Trained professors
          </caption>
          <thead>
            <tr>
              <th className="p-4 text-base text-cyan-600">College Code</th>
              <th className="p-4 text-base text-cyan-600">College Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: ICollegeDetails) => (
              <tr key={item?.id}>
                <td>{item?.collegeCode}</td>
                <td
                  className="max-w-sm whitespace-nowrap overflow-hidden text-ellipsis hover:cursor-pointer"
                  title={item?.collegeName}
                >
                  {item?.collegeName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeTable;
