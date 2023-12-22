import { z, number, string } from "zod";

const formSchema = z.object({
  name: string().refine((value) =>
    /^(?!.(.).\\1{2})[a-zA-Z][a-zA-Z0-9_-]{3,15}$/.test(value)
  ),
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
