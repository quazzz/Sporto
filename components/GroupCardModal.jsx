"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GroupModalCard({ exercise, onClose }) {
  const { data: session, status } = useSession();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [sets,setSets] = useState()
  const [reps,setReps] = useState()
  
  useEffect(() => {
    const fetchGroups = async () => {
     if(status === 'authenticated'){
        try {
          console.log('trying')
          const res = await fetch(`/api/group?userId=${session?.user.id}`);
          const json = await res.json();
          setGroups(json);
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
     }
    };

    fetchGroups();
  }, []);

  const handleClose = (e) => {
    onClose();
    e.stopPropagation()
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); 
  };
  const handleClick = async(groupId) => {
    console.log(exercise)
    if(status === "authenticated" && sets && reps){
      try {
        let name = exercise?.name;
        let equipment = exercise?.equipment;
        let gifUrl = exercise?.gifUrl;
        let target = exercise?.target;
        let bodyPart = exercise?.bodyPart;
        let instructions = exercise?.instructions
        let secondaryMuscles = exercise?.secondaryMuscles
        let id = exercise?.id
        const req = await fetch(`/api/catalog`,{
          headers: {'Content-Type' : 'application/json'},
          method: 'POST',
          body: JSON.stringify({name,equipment,gifUrl,target,bodyPart,instructions,secondaryMuscles,id,groupId,sets,reps})
        })
        console.log(req)
        
          setSelectedGroup(null)
          handleClose()
        
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4"
        onClick={handleModalClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Select group for {exercise?.name}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          {groups?.length > 0 ? (
            <ul className="space-y-2">
                {groups.map((group) => (
                  <>
                    <li key={group.id} onClick={() => setSelectedGroup(group.id)} className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors">{group.name}</li>
                    {selectedGroup === group.id &&
                    <>
                    <input className="border p-1 rounded text-l  text-gray-900 mb-4" value={sets} onChange={(e) => setSets(e.target.value)} type="text" placeholder="Sets" />
                    <input className="border p-1 rounded text-l  text-gray-900 mb-4" value={reps} onChange={(e) => setReps(e.target.value)} type="text" placeholder="Reps" />
                    <button className="ml-5 transition-all duration-300 ease-in-out py-2 px-5 bg-black text-white text-lg  rounded shadow-lg hover:bg-gray-800 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2" onClick={() => handleClick(group.id)}>Add</button>
                    </>
                    }
                  </>
                 
                ))}
                <div className="text-center">
                <p className="text-center">Or</p>
                <Link href="/dashboard" className="underline text-center">Create new group</Link>
                </div>
              

            </ul>
          ) : (
            <>
             <p className="text-gray-600 text-center">No groups found</p>
            
            </>
           
          )}
        </div>
      </div>
    </div>
  );
}