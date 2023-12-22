/* eslint-disable react/jsx-no-duplicate-props */
"use client";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { ZodError } from "zod";
import formSchema from "../api/schema/schema";
import Input from "../components/formInputs/Input";
import { FormData } from "../components/formInputs/Input";
import { useRouter } from "next/navigation";

const ChatBotForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobileNumber: "",
    physicsMarks: 0,
    chemistryMarks: 0,
    mathsMarks: 0,
    course: "",
    community: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [cutoffMarks, setCutoffMarks] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const calculatecutoff = () => {
      const maths = formData.mathsMarks;
      const physics = formData.physicsMarks / 2;
      const chemistry = formData.chemistryMarks / 2;

      const cutoff = maths + physics + chemistry;
      setCutoffMarks(cutoff);
    };

    const validateForm = async () => {
      try {
        if (Object.values(touchedFields).some((field) => field)) {
          formSchema.parse(formData);
          calculatecutoff();
          setErrors({});
        }
      } catch (error) {
        if (error instanceof ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            const path = err.path.join(".");
            newErrors[path] = err.message;
          });
          setErrors(newErrors);
        } else {
          console.error("Form has errors. Please check and correct.", error);
        }
      }
    };
    validateForm();
    calculatecutoff();
  }, [formData, touchedFields]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const numericValue = name.includes("Marks") ? parseFloat(value) : value;
    const updatedValue =
      typeof numericValue === "number" && !isNaN(numericValue)
        ? numericValue
        : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };
  async function userDetail(data: {
    cutoffMarks: number | null;
    mobileNumber: string;
    course: string;
  }) {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedFormData = formSchema.parse(formData);

      const { physicsMarks, chemistryMarks, mathsMarks, ...newFormData } =
        parsedFormData;
      const data = { ...newFormData, cutoffMarks };

      userDetail(data);

      router.push('/data')
    } catch (error) {
      if (error) throw new Error("Error in catch", error);
    }
  };

  return (
    <div className="mt-10 grid place-items-center gap-4">
      <p className="text-5xl font-bold sm:text-3xl">Form</p>
      {/* <div className="flex flex-col w-full"><div className="divider divide-warning"></div></div> */}

      <form className="flex justify-center" onSubmit={onSubmit}>
        <div className="space-y-6">
          <div>
            <Input
              id={"name"}
              label={"Name / பெயர்"}
              type={"text"}
              key={"name"}
              value={formData.name}
              placeholder={"Enter your name"}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              id={"mobileNumber"}
              label={"Mobile Number / கைபேசி எண்"}
              type={"tel"}
              key={"mobileNumber"}
              value={formData.mobileNumber}
              placeholder={"Enter your Mobile Number"}
              maxLength={10}
              onChange={handleInputChange}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
            )}
          </div>

          <div className="grid grid-flow-col gap-4">
            <div>
              <select
                name="course"
                className="select w-10/12 min-w-max border-green-500"
                title="Select any Course"
                onChange={handleInputChange}
                suppressHydrationWarning={true}
              >
                <option>Select any Course</option>
                <option value="ME">Mechanical</option>
                <option value="EE">EEE</option>
                <option value="EC">ECE</option>
                <option value="CS">CSE</option>
                <option value="CE">Civil</option>
                <option value="AIDS">AIDS</option>
                <option value="IM">IT</option>
                <option value="MC">Mechatronics</option>
                <option value="AIML">AIML</option>
              </select>

              {errors.course && (
                <p className="text-red-500 text-sm">{errors.course}</p>
              )}
            </div>
            <div>
              <select
                name="community"
                className="select w-10/12 min-w-max border-green-500"
                title="Select your Community"
                onChange={handleInputChange}
                suppressHydrationWarning={true}
              >
                <option>Select your Community</option>
                <option value="cutOffOC">OC</option>
                <option value="cutOffBC">BC</option>
                <option value="cutOffBCM">BCM</option>
                <option value="cutOffMBC">MBC</option>
                <option value="cutOffMBCDNC">MBCDNC</option>
                <option value="cutOffMBCV">MBCV</option>
                <option value="cutOffSC">SC</option>
                <option value="cutOffST">ST</option>
                <option value="cutOffSCA">SCA</option>
              </select>

              {errors.community && (
                <p className="text-red-500 text-sm">{errors.community}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-2 gap-y-4">
            <div className="sm:col-span-2">
              <Input
                id={"physicsMarks"}
                label={"Physics"}
                type={"text"}
                key={"physicsMarks"}
                value={formData.physicsMarks}
                onChange={handleInputChange}
                placeholder={"Enter marks"}
                maxLength={3}
              />
              {errors.physicsMarks && (
                <p className="text-red-500 text-sm">{errors.physicsMarks}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Input
                id={"chemistryMarks"}
                label={"Chemistry"}
                type={"text"}
                key={"chemistryMarks"}
                value={formData.chemistryMarks}
                onChange={handleInputChange}
                placeholder={"Enter marks"}
                maxLength={3}
              />
              {errors.chemistryMarks && (
                <p className="text-red-500 text-sm">{errors.chemistryMarks}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Input
                id={"mathsMarks"}
                label={"Maths"}
                type={"text"}
                key={"mathsMarks"}
                value={formData.mathsMarks}
                onChange={handleInputChange}
                placeholder={"Enter marks"}
                maxLength={3}
              />
              {errors.mathsMarks && (
                <p className="text-red-500 text-sm">{errors.mathsMarks}</p>
              )}
            </div>
          </div>
          <div className="flex">
            <p className="text-base leading-6 text-gray-900">
              Your Calculated Cutoff is :{" "}
            </p>
            <p className="ml-4 text-green-500">{cutoffMarks}</p>
          </div>
          <div className="btn btn-info text-white w-full text-lg">
            <button title="submit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBotForm;
