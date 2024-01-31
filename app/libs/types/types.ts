interface ICollegeDetails {
  id: string;
  collegeCode: string;
  collegeName: string;
  cutoffDetailsList: cutoffDetailsList[];
}

type cutoffDetailsList = {
  courseCode: string;
  courseName: string;
  year: number;
  cutOffOC: any;
  cutOffBC: any;
  cutOffBCM: any;
  cutoffMBCDNC: any;
  cutoffMBCV: any;
  cutOffSC: any;
  cutOffST: any;
  cutOffMBC: any;
  cutOffSCA: any;
};

interface ICollegeTable {
  data: ICollegeDetails[];
}

export type { ICollegeDetails, ICollegeTable };
