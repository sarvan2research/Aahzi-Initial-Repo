interface ICollegeDetails {
  [x: string]: any;
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
  key: any;
  data: ICollegeDetails;
  showDetails?: boolean;
  onClick: () => void;
}

export type { ICollegeDetails, ICollegeTable };
