"use client";
import { useEffect, useState } from "react";
import RecordForm from "./RecordForm";
import { useSession } from "next-auth/react";
import RecordCard from './RecordCard';

export default function RecordsPage() {
  const { data: session } = useSession();
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    const fetchRecords = async () => {
      if (!session?.user.id) return; 

      try {
        const res = await fetch(`/api/records?userId=${session.user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch records");
        }
        const json = await res.json();
        setRecords(json);
        console.log(json)
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]); 
      }
    };

    fetchRecords();
  }, [session]);

  return (
 
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center  font-[var(--font-geist-sans)] p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md p-8  rounded-lg  mb-10 lg:mb-0 lg:mr-10">
        <RecordForm />
      </div>
      <div className="flex flex-col w-full lg:w-3/5 space-y-10">
      <div className="flex flex-wrap gap-6 justify-center px-4 md:px-8 items-start">
          {records.length > 0 ? (
          records.map((record) => (
            <RecordCard 
              key={record.id} 
              name={record.recordName} 
              record={record.achievement} 
              id={record.id} 
            />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[200px] w-full">
            <p className="text-center text-gray-600">No records found</p>
          </div>
        )}
      </div>
      
       
      </div>
    </div>
   
  );
}
