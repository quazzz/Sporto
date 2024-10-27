import Image from "next/image"
export default function ExerciseCardDashboard({ name, gifUrl, bodypart, target, equipment }) {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{name}</h2>
      <Image
        unoptimized={true}
        className="mx-auto"
        src={gifUrl}
        width={100}
        height={100}
        alt="Gif of workout"
      />
      <p className="text-gray-800 text-lg mb-2">Bodypart: {bodypart}</p>
      <p className="text-gray-700 text-base mb-4">Target: {target}</p>
      <p className="text-sm text-gray-500">Equipment: {equipment}</p>
    </div>
  )
}
