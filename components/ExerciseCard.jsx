import Image from "next/image";
export default function ExerciseCard({ workout, onPlusClick, onViewDetailsClick }) {
  const name0 = workout.name;
  const gifurl0 = workout.gifUrl;
  const bodypart = workout.bodyPart
  const target0 = workout.target;
  const equipment0 = workout.equipment;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const name = capitalizeFirstLetter(name0);
  
  const equipment = capitalizeFirstLetter(equipment0);
  return (
    <div className="h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg animate-fade-in overflow-hidden shadow-xl bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950  p-6 m-4 text-center transform transition-transform duration-300 hover:scale-105 animate-fade-in">
    <h2 className="text-2xl font-bold mb-4 text-white">{name}</h2>
    <Image
      unoptimized={true}
      className="mx-auto rounded-md shadow-md"
      src={gifurl0}
      width={150}
      height={150}
      alt="Gif of workout"
    />
    <p className="text-white text-lg mt-4">
      <strong>Bodypart:</strong> {bodypart}
    </p>
    <p className="text-white text-base my-2">
      <strong>Target:</strong> {target0}
    </p>
    <p className="text-sm text-white mb-4">
      <strong>Equipment:</strong> {equipment}
    </p>
    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={() => onViewDetailsClick(workout)}
        className="transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-white text-white font-bold py-2 px-6 rounded-md shadow-sm"
      >
        View Details
      </button>
      <button
        type="button"
        onClick={onPlusClick}
        className="transition-all bg-gradient-to-r from-blue-500 to-blue-600   hover:bg-white text-white font-bold py-2 px-6 rounded-full shadow-sm"
      >
        +
      </button>
    </div>
  </div>
  

  );
}
