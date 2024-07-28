"use client";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import formSchema from "../api/schema/schema";
import Input from "../components/formInputs/Input";
import { FormData } from "../components/formInputs/Input";
import Image from "next/image";

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
  const [isLoading, setIsLoading] = useState(false);
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
    calculatecutoff();
  }, [formData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue = name.includes("Marks") ? parseFloat(value) : value;
    const updatedValue =
      typeof numericValue === "number" && !isNaN(numericValue)
        ? numericValue
        : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const parsedFormData = formSchema.parse(formData);

      const { physicsMarks, chemistryMarks, mathsMarks, ...newFormData } =
        parsedFormData;
      const data = { ...newFormData, cutoffMarks };

      const userDetail = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userDetail.ok) {
        const userID = await userDetail.json();
        router.push(`/data?user=${userID}`);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
          setErrors(newErrors);
        });
      } else {
        console.log("Form has no errors.");
      }
    }
  };

  return (
    <div className="mt-6 grid place-items-center grid-flow-col gap-16 max-md:grid-flow-row m-2 max-md:gap-4">
      <div className="grid place-items-center">
        <h2 className="text-5xl font-bold text-blue-400 max-md:text-2xl">
          Welcome to Aahzi
        </h2>

        <Image
          src="/chatbot-welocme.jpg"
          alt="chatbot-welcome"
          title="chatbot-welcome"
          className="max-w-sm rounded-lg max-sm:w-6/12 max-md:w-6/12"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h2 className="font-bold leading-loose hidden max-md:block text-sm tracking-widest">
          Here you can check your Cutoff and Top Ranklist of colleges will
          update soon...
        </h2>
      </div>

      <form
        className="grid place-items-center bg-gradient-to-r from-indigo-400 to-cyan-400 p-7 rounded-xl max-md:w-3/5"
        onSubmit={onSubmit}
      >
        <p className="text-5xl font-bold max-md:text-2xl text-white">Rank</p>
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

          <div className="grid grid-flow-col gap-4 max-md:grid-flow-row max-sm:grid-flow-row">
            <div>
              <select
                name="course"
                className="select w-10/12 min-w-max border-green-500"
                title="Select any Course"
                onChange={handleInputChange}
                suppressHydrationWarning={true}
              >
                <option disabled selected value="">
                  Select any Course
                </option>
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
                <option disabled selected value="">
                  Select your Community
                </option>
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
              Your Calculated Cutoff is :
            </p>
            <p className="ml-4 text-white">{cutoffMarks}</p>
          </div>
          <div>
            {isLoading ? (
              <button
                className="h-12 rounded-lg bg-slate-500 text-white w-full text-lg"
                title="submit"
                type="submit"
              >
                Submitting Data...
              </button>
            ) : (
              <button
                className="btn btn-neutral text-white w-full text-lg"
                title="submit"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>

      <div>
        <h2 className="text-2xl w-3/4 font-bold leading-loose max:md:hidden">
          Here you can check your Cutoff and Top Ranklist of colleges will
          update soon...
        </h2>
      </div>
    </div>
  );
};

export default ChatBotForm;
