import { ICollegeTable } from "@/app/libs/types/types";

const CollegeTable = ({
  key,
  data,
  showDetails,
  onClick,
}: ICollegeTable) => {

  return (
    <div className="grid place-items-center">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>College Code</th>
            <th>College Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item:any) => (
            <tr key={data?.id}>
              <td>{item?.collegeCode}</td>
              <td>{item?.collegeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;
