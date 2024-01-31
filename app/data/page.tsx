"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import CollegeTable from "../components/collegeTable/CollegeTable";
import { CollegeTableLoading } from "../components/loading/CollegeTableLoading";

const Data = () => {
  const searchParams = useSearchParams();
  const [collegeData, setcollegeData] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userID: any = searchParams.get("user");
    // console.log(userID);
    const decryptedUserID = atob(userID);
    // console.log(decryptedUserID);

    const fetchCutoffData = async (): Promise<any[]> => {
      try {
        const response = await fetch("/api/userID", {
          method: "POST",
          body: JSON.stringify({ userID: decryptedUserID }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response?.json();
        console.log(result);
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchCutoffData()
      .then((result) => {
        setcollegeData(result);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchParams]);

  return (
    <div className="mt-8">
      <Suspense fallback={<CollegeTableLoading/>}>
        {isLoading ? (
          <CollegeTable data={collegeData} />
        ) : (
          <CollegeTableLoading />
        )}
      </Suspense>
    </div>
  );
};

export default Data;
