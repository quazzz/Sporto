"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function GroupModalCard({ exercise, onClose, isOpen }) {
  const { data: session, status } = useSession();
  const [groups, setGroups] = useState([]);

  // Add console log to track component mounting
  useEffect(() => {
    console.log("GroupModalCard mounted");
    return () => console.log("GroupModalCard unmounted");
  }, []);

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
  }, [session?.user.id]);

  const handleClose = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); 
  };
  const handleClick = async(groupId) => {
    console.log(exercise)
    if(status === "authenticated"){
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
          body: JSON.stringify({name,equipment,gifUrl,target,bodyPart,instructions,secondaryMuscles,id,groupId})
        })
        if(req.ok){
          handleClose()
        }
      } catch (error) {
        
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
                  
                   <li key={group.id} className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleClick(group.id)}>{group.name}</li>
          
                 
                   
                ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No groups found</p>
          )}
        </div>
      </div>
    </div>
  );
}