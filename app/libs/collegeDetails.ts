interface ICutoffDetails {
    courseCode: string;
    courseName: string;
    year: number;
    cutOffOC: number;
    cutOffBC: number;
    // Other cutoffs...
  }
  
  interface ICollegeDetails {
    id: string;
    collegeCode: string;
    collegeName: string;
    cutoffDetailsList: ICutoffDetails[];
    courseOffered(courseCode: string): boolean;
  }
  
  export const collegeDetails: ICollegeDetails = {
    id: "1",
    collegeCode: "1001",
    collegeName: "ABC College",
    cutoffDetailsList: [
      {
        courseCode: "CS101",
        courseName: "Computer Science",
        year: 2024,
        cutOffOC: 90,
        cutOffBC: 85,
        // Other cutoffs...
      },
      // More courses...
    ],
    courseOffered(courseCode: string) {
      return this.cutoffDetailsList.some(
        (course) => course.courseCode === courseCode
      );
    },
  };
  