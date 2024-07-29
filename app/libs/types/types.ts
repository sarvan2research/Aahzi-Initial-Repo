type CutoffDetailsList = {
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

interface ICollegeDetails {
  id?: string;
  collegeCode: string;
  collegeName: string;
  cutoffDetailsList?: CutoffDetailsList[]; // Make this optional if it might not be present
}

interface ICollegeTable {
  data: ICollegeDetails[];
  courseOffered: boolean;
}

export type { ICollegeDetails, ICollegeTable };
