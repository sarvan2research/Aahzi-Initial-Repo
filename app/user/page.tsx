import { connectToDatabase } from "../api/controller/database";

const UserFetchCollegeData = async (res: { json: () => void }) => {
  const { client, db }:any = await connectToDatabase();

  const collection = db.collection("CutOff");
  const data = await collection.find().toArray();
  // console.log(data);

  const __courseCode = "$cutoffDetailsList.courseCode";
  const __courseName = "$cutoffDetailsList.courseName";
  const uniqueCourseValue = await collection
    .aggregate([
      { $unwind: "$cutoffDetailsList" },
      {
        $group: {
          _id: {
            courseCode: __courseCode,
            courseName : __courseName
          },
          count : { $sum : 1 },
        },
      },
      {
        $match : {
          count : { $gt : 1},
        }
      },
      {
        $project : {
          _id : 0,
          value : {
            courseCode : "$_id.courseCode",
            courseName : "$_id.courseName"
          },
          count : 1
        }
      }
    ])
    .toArray();
  // console.log(uniqueCourseValue);

  // const result = await Promise.all(
  //   uniqueCourseValue.map(async (values) => {
  //     const count = await collection.countDocuments({
  //       ["cutoffDetailsList.__courseCode"]: values._id,
  //     });
  //     return {
  //       values: values._id,
  //       count,
  //     };
  //   })
  // );
  // console.log(result);

  return (
    
      <table className="table table-bordered ">
        <thead>
          <th>CourseCode</th>
          <th>CourseName</th>
          <th>Count</th>
        </thead>
        <tbody>
          {uniqueCourseValue.map((data:any) => (
            <tr key={data.count}>
              <td>{data.value.courseCode}</td>
              <td>{data.value.courseName}</td>
              <td>{data.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

  );
};

export default UserFetchCollegeData;
