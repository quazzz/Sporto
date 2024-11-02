import Image from "next/image"
export default function ExerciseCardDashboard({ name, gifUrl, bodypart, target, equipment, reps, sets, id }) {
  const handleDelete = async() => {
    try {
      const req = await fetch('/api/exercises',{
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id})
      })
      const a = req.json()
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="max-w-xs sm:max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center relative">
      <button onClick={handleDelete} className="absolute top-2 right-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
        ✕
      </button>
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{name}</h2>
      <Image
        unoptimized={true}
        className="mx-auto"
        src={gifUrl}
        width={80} 
        height={80} 
        alt="Gif of workout"
      />
      <p className="text-gray-800 text-base mb-1">Bodypart: {bodypart}</p>
      <p className="text-gray-800 text-base mb-1">Sets: {sets}</p>
      <p className="text-gray-800 text-base mb-1">Reps: {reps}</p>
      <p className="text-gray-700 text-sm mb-3">Target: {target}</p>
      <p className="text-xs text-gray-500">Equipment: {equipment}</p>
    </div>
  )
}
