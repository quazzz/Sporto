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
  // Capitalizes the first letter of a string
  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {capitalizeFirstLetter(name)}
        </h2>

        <div className="flex justify-center mb-4">
          {gifUrl ? (
            <Image
              unoptimized={true}
              className="rounded-md"
              src={gifUrl}
              width={150}
              height={150}
              alt="Gif of workout"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        <div className="space-y-2 text-center">
          {instructions && (
            <p className="text-gray-700">{instructions.join(" ")}</p>
          )}
          <p className="text-gray-800">
            <strong>Body part:</strong> {capitalizeFirstLetter(bodyPart)}
          </p>
          <p className="text-gray-800">
            <strong>Equipment:</strong> {capitalizeFirstLetter(equipment)}
          </p>
          <p className="text-gray-800">
            <strong>Target:</strong> {capitalizeFirstLetter(target)}
          </p>
          {secondaryMuscles && (
            <p className="text-gray-800">
              <strong>Secondary muscles:</strong> {secondaryMuscles.join(", ")}
            </p>
          )}
          {sets &&
            reps &&
            weight && (
              <>
                <p className="text-gray-800">
                  <strong>Weight:</strong> {capitalizeFirstLetter(weight)} kg
                </p>
                <p className="text-gray-800">
                  <strong>Sets:</strong> {capitalizeFirstLetter(sets)}
                </p>
                <p className="text-gray-800">
                  <strong>Reps:</strong> {capitalizeFirstLetter(reps)}
                </p>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
