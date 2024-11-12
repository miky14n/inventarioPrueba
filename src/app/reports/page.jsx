"use client";
import { useState, useEffect } from "react";
import NuxwayTable from "@/components/NuxwayTable"; 

async function fetchReports() {
  try {
    const response = await fetch("https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/binnacle");
    if (!response.ok) {
      throw new Error("Error fetching reports");
    }
    const data = await response.json();
    console.log(data, "Fetched Binnacle Data");
    return data.binnacle; 
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchReports();
      console.log(reportData, "Data fetched for reports"); 
      setReports(reportData);
    };

    fetchData();
  }, []);

  const columns = [
    { name: "Serial Number", uid: "numserial", sortable: true },
    { name: "Date of Entry", uid: "dateofentry", sortable: true },
    { name: "Date of Out", uid: "dateofout", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Date Limit Loan", uid: "datelimitloan", sortable: true },
  ];

  return (
    <div className="bg-white p-4">
      <NuxwayTable 
        resources={reports}  
        columns={columns} 
        searchers={["Status", "Date of Entry"]}
        actions={["View", "Edit", "Delete"]}
      />
    </div>
  );
}

