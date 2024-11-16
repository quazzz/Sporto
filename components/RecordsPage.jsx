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
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]); 
      }
    };

    fetchRecords();
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-lines p-8 sm:p-20 ">
      <RecordForm />
      <div className="mt-8 w-full flex flex-wrap gap-4 justify-center px-4">
        {records.length > 0 ? (
          records.map((record) => (
            <RecordCard key={record.id} name={record.recordName} record={record.achievement} id={record.id} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-center text-gray-600">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
