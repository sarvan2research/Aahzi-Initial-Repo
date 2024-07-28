"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import CollegeTable from "@/app/components/collegeTable/CollegeTable";
import { CollegeTableLoading } from "@/app/components/loading/CollegeTableLoading";

const Data = () => {
  return (
    <Suspense fallback={<CollegeTableLoading />}>
      <DataPage />
    </Suspense>
  );
};

export default Data;

const DataPage = () => {
  const searchParams = useSearchParams();
  const [collegeData, setCollegeData] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const userID: any = searchParams.get("user");
    // Function to validate if the string is a valid base64 string
    const isValidBase64 = (str: string) => {
      const base64Regex =
        /^(?:[A-Za-z\d+\/]{4})*(?:[A-Za-z\d+\/]{2}==|[A-Za-z\d+\/]{3}=)?$/;
      return base64Regex.test(str);
    };

    let decryptedUserID;
    if (isValidBase64(userID)) {
      try {
        decryptedUserID = atob(userID);
      } catch (error) {
        //console.error("Failed to decode base64 string:", error);
        setErrorMessage(
          "The provided user ID is invalid. Please check the link and try again."
        );
        setCollegeData([]);
        setIsLoading(false);
        return;
      }
    } else {
      //console.error("Invalid base64 string");
      setErrorMessage(
        "The provided user ID is invalid. Please check the link and try again."
      );
      setCollegeData([]);
      setIsLoading(false);
      return;
    }

    const fetchRankData = async (): Promise<any[]> => {
      try {
        const response = await fetch("/api/userRankID", {
          method: "POST",
          body: JSON.stringify({ userID: decryptedUserID }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response?.json();
        return result;
      } catch (error) {
        //console.error("Error fetching data:", error);
        throw new Error(
          "There was an error fetching your data. Please try again later."
        );
        throw error;
      }
    };
    fetchRankData()
      .then((result) => {
        setCollegeData(result);
        setIsLoading(false);
      })
      .catch((error) => {
        //console.error("Error fetching data:", error);
        throw new Error(
          "There was an error fetching your data. Please try again later."
        );
        setCollegeData([]);
      });
  }, [searchParams]);

  return (
    <div className="mt-8">
      {isLoading ? (
        <CollegeTableLoading />
      ) : errorMessage ? (
        <div className="text-red-500 text-center">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <CollegeTable data={collegeData} />
      )}
    </div>
  );
};
