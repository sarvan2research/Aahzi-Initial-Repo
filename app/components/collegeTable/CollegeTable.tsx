import { ICollegeTable } from "@/app/libs/types/types";

const CollegeTable = ({
  key,
  data,
  showDetails = false,
  onClick,
}: ICollegeTable) => {
  console.log(data[0]?.cutoffDetailsList);
  return (
    <div className="grid place-items-center">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>College Code</th>
            <th>College Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <tr key={item?.id}>
              <td>{item?.collegeCode}</td>
              <td>{item?.collegeName}</td>
              <td onClick={onClick} className="btn btn-neutral">
                Show Details
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((items:any, index:any) => (
              <tr key={index}>
                <td>{items[index]?.cutoffDetailsList[index]?.courseCode}</td>
                <td>{items[index]?.cutoffDetailsList[index]?.courseName}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      {/* <h1 className="text-center text-4xl font-bold leading-20 text-zinc-800 mt-10 mb-10">
      Hey! Our Team had got your query. Soon we&apos;ll reach you
    </h1>
    <Image
      src="/smiley-emoji.png"
      alt="smiley-emoji"
      className="max-w-sm rounded-lg shadow-2xl"
      width={500}
      height={500}
    /> */}
    </div>
  );
};

export default CollegeTable;
