import { z, number, string } from "zod";

interface Course{
  courseCode:string
  courseName:string
}

interface College{
  collegeCode:string
  collegeName:string
}

const formSchema = z.object({
  name: string().max(30),
  mobileNumber: string().refine((value) => /^\d{10}$/.test(value)),
  physicsMarks: number().refine((value) =>
    /^\b(?:0|[1-9]\d{0,1}|100)\b$/.test(value.toString())
  ),
  chemistryMarks: number().refine((value) =>
    /^\b(?:0|[1-9]\d{0,1}|100)\b$/.test(value.toString())
  ),
  mathsMarks: number().refine((value) =>
    /^\b(?:0|[1-9]\d{0,1}|100)\b$/.test(value.toString())
  ),
  course: string(),
  community: string(),
});

export default formSchema;


