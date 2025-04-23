import Image from "next/image";

export default function CatalogDetailsModal({
  name,
  bodyPart,
  target,
  gifUrl,
  instructions,
  secondaryMuscles,
  onClose,
  equipment,
  weight,
  reps,
  sets,
}) {
  
  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  return (
<div onClick={onClose} className="fixed animate-fade-in inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center bg-opacity-50 z-50">
  <div className="bg-gradient-to-b from-blue-950 to-gray-950  p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative transform transition-transform duration-300 ">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-300"
    >
      ✕
    </button>

    <h2 className="text-2xl font-bold text-white text-center mb-4">
      {capitalizeFirstLetter(name)}
    </h2>

    <div className="flex justify-center mb-4">
      {gifUrl ? (
        <Image
          unoptimized={true}
          className="rounded-md shadow-lg"
          src={gifUrl}
          width={150}
          height={150}
          alt="Gif of workout"
        />
      ) : (
        <p className="text-white">No image available</p>
      )}
    </div>

    <div className="space-y-3 text-center">
      {instructions && (
        <p className="text-white leading-relaxed">
          {instructions.join(" ")}
        </p>
      )}
      <p className="text-white">
        <strong>Body part:</strong> {capitalizeFirstLetter(bodyPart)}
      </p>
      <p className="text-white">
        <strong>Equipment:</strong> {capitalizeFirstLetter(equipment)}
      </p>
      <p className="text-white">
        <strong>Target:</strong> {capitalizeFirstLetter(target)}
      </p>
      {secondaryMuscles && (
        <p className="text-white">
          <strong>Secondary muscles:</strong> {secondaryMuscles.join(", ")}
        </p>
      )}
      {sets && reps && weight && (
        <div className="text-white space-y-2">
          <p>
            <strong>Weight:</strong> {capitalizeFirstLetter(weight)} kg
          </p>
          <p>
            <strong>Sets:</strong> {capitalizeFirstLetter(sets)}
          </p>
          <p>
            <strong>Reps:</strong> {capitalizeFirstLetter(reps)}
          </p>
        </div>
      )}
    </div>
  </div>
</div>

  );
}
