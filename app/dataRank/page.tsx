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
  const [collegeData, setcollegeData] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userID: any = searchParams.get("user");
    // console.log(userID);
    const decryptedUserID = atob(userID);
    // console.log(decryptedUserID);

    const fetchCutoffData = async (): Promise<any[]> => {
      try {
        const response = await fetch("/api/userRankID", {
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
      {isLoading ? (
        <CollegeTable data={collegeData} />
      ) : (
        <CollegeTableLoading />
      )}
    </div>
  );
};
