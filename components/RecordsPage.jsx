"use client";
import { useEffect, useState } from "react";
import RecordForm from "./RecordForm";
import { useSession } from "next-auth/react";
import RecordCard from './RecordCard';
import { Activity } from "lucide-react";
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
  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((rec) => rec.id !== id))
  }
  const handleAdd = (newg) => {
    setRecords((prev) => [...prev,newg]);
  }
  return (
 
    <div className="min-h-screen flex flex-col lg:flex-row-reverse bg-gradient-to-br from-blue-900 via-gray-950 to-black items-center justify-center  font-[var(--font-geist-sans)] p-4 sm:p-8 lg:p-12">
      <div className="flex flex-col w-full lg:w-3/5 space-y-10">
      <div className="flex flex-wrap gap-6 justify-center px-4 md:px-8 items-start">
          {records.length > 0 ? (
          records.map((record) => (
            <RecordCard 
              key={record.id} 
              name={record.recordName} 
              record={record.achievement} 
              id={record.id} 
              handleDeleteProp={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full w-full flex items-center justify-center py-16">
            <div className="bg-gradient-to-b to-gray-950 from-blue-950/70  rounded-xl p-10 text-center max-w-md backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-blue-800/30 flex items-center justify-center">
                    <Activity size={42} className="text-blue-300" />
                  </div>
                </div>
              </div>
  
              <h2 className="text-2xl font-bold text-white mb-2">
                No records yet
              </h2>
              <p className="text-blue-300 mb-6">
                Start tracking your records by <a className="underline" href="#form">adding your achievement.</a> 
              </p>
            </div>
          </div>
        )}
      </div>
      
       
      </div>
      <div id="form" className="w-full max-w-md p-8  rounded-lg  mb-10 lg:mb-0 lg:mr-10">
        <RecordForm handleAdd={handleAdd}/>
      </div>
      
    </div>
   
  );
}
