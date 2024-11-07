import Image from "next/image";

export default function CatalogDetailsModal({ exercise, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative">
        
        {/* Close button at the top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {exercise?.name}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <Image
            unoptimized={true}
            className="rounded-md"
            src={exercise.gifUrl}
            width={150}
            height={150}
            alt="Gif of workout"
          />
        </div>

        {/* Exercise details */}
        <div className="space-y-2 text-center">
          <p className="text-gray-700">{exercise?.instructions.join(" ")}</p>
          <p className="text-gray-800">
            <strong>Body part:</strong> {exercise?.bodyPart}
          </p>
          <p className="text-gray-800">
            <strong>Equipment:</strong> {exercise?.equipment}
          </p>
          <p className="text-gray-800">
            <strong>Target:</strong> {exercise?.target}
          </p>
          {exercise?.secondaryMuscles && (
            <p className="text-gray-800">
              <strong>Secondary muscles:</strong> {exercise?.secondaryMuscles.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
