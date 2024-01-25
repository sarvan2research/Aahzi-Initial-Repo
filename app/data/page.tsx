"use client";
import { useSearchParams } from "next/navigation";
// import Image from "next/image";
import { useState, useEffect } from "react";
import CollegeTable from "../components/collegeTable/CollegeTable";
import { CollegeTableLoading } from "../components/loading/CollegeTableLoading";
import { ICollegeDetails } from "../libs/types/types";

const Data = () => {
  const searchParams = useSearchParams();
  const [collegeData, setcollegeData] = useState<any | undefined>(undefined);
  const [showDetailsArray, setShowDetailsArray] = useState<boolean[]>(
    Array(collegeData?.length).fill(false)
  );
  const [isLoading, setIsLoading] = useState(false);

  const userID: any = searchParams.get("user");
  console.log(userID);
  const decryptedUserID = atob(userID);
  console.log(decryptedUserID);

  const handleItemClick = (index:number) => {
    const updatedArray = showDetailsArray.map((value, i) => i === index);
    setShowDetailsArray(updatedArray);
  };

  const fetchCutoffData = async (): Promise<any[]> => {
    try {
      const response = await fetch("/api/userID", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response?.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    // return new Promise<any[]>((resolve) => {
    //   setTimeout(() => {
    //     const response = await fetch("/api/userID", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     resolve(response);
    //   }, 2000)
    // })
  };

  useEffect(() => {
    fetchCutoffData()
      .then((result) => {
        setIsLoading(true);
        setcollegeData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(true);
      });
  }, []);

  return (
    <div className="">
      {isLoading ? (
        collegeData?.map((data: ICollegeDetails, index: any) => (
          <CollegeTable
            key={data?.id}
            data={collegeData}
            showDetails={showDetailsArray[index]}
            onClick={() => handleItemClick(index)}
          />
        ))
      ) : (
        <CollegeTableLoading/>
      )}
    </div>
  );
};

export default Data;
