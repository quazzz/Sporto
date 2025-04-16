"use client";
import Loading from "@/components/Loading.jsx";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import GroupModalCard from "@/components/GroupCardModal";
import debounce from "lodash/debounce";
import CatalogDetailsModal from "@/components/CatalogDetailsModal";
import Fuse from "fuse.js";

export default function Page() {
  const [exercises, setExercises] = useState([]);
  const [options, setOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [fuse, setFuse] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const cache = useRef(null);
  const gridRef = useRef(null);

  const checkboxOptions = [
    { id: "back", label: "Back" },
    { id: "cardio", label: "Cardio" },
    { id: "chest", label: "Chest" },
    { id: "lower arms", label: "Lower arms" },
    { id: "neck", label: "Neck" },
    { id: "shoulders", label: "Shoulders" },
    { id: "upper arms", label: "Upper arms" },
    { id: "upper legs", label: "Upper legs" },
    { id: "waist", label: "Waist" },
  ];

  const targetOptions = [
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator scapulae",
    "pectorals",
    "quads",
    "serratus anterior",
    "spine",
    "traps",
    "triceps",
    "upper back",
  ];

  const equipmentOptions = [
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller",
  ];

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      if (cache.current) {
        setExercises(cache.current);
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/catalog");
        const data = await res.json();
        cache.current = data;
        setExercises(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      const inst = new Fuse(exercises, {
        keys: ["name", "bodyPart", "target"],
        threshold: 0.3,

        cache: true,
      });
      setFuse(inst);
      setSearchResults(exercises);
    }
  }, [exercises]);

  const getFilteredExercises = useCallback(() => {
    let results = exercises;

    if (search.trim() !== "" && fuse) {
      results = fuse.search(search).map((result) => result.item);
    }

    if (
      options.length === 0 &&
      selectedTargets.length === 0 &&
      selectedEquipment.length === 0
    ) {
      return results;
    }

    return results.filter((exercise) => {
      if (
        options.length > 0 &&
        !options.some((opt) => exercise.bodyPart.includes(opt))
      ) {
        return false;
      }

      if (
        selectedTargets.length > 0 &&
        !selectedTargets.includes(exercise.target)
      ) {
        return false;
      }

      if (
        selectedEquipment.length > 0 &&
        !selectedEquipment.includes(exercise.equipment)
      ) {
        return false;
      }

      return true;
    });
  }, [exercises, search, fuse, options, selectedTargets, selectedEquipment]);

  useEffect(() => {
    const updateResults = () => {
      setSearchResults(getFilteredExercises());
    };

    const handler = setTimeout(updateResults, 300);
    return () => clearTimeout(handler);
  }, [
    search,
    options,
    selectedTargets,
    selectedEquipment,
    getFilteredExercises,
  ]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
    setCurrentPage(1);
    if (gridRef.current) {
      gridRef.current.scrollTo({ scrollTop: 0 });
    }
  };

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
    if (gridRef.current) {
      gridRef.current.scrollTo({ scrollTop: 0 });
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((value) => handleSearch(value), 300),
    [handleSearch]
  );

  const openModal = (exercise) => {
    if (isModalOpen) return;
    setSelectedExercise(exercise);
    setModalOpen(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExercise(null);
    setModalOpen(false);
    setIsModalOpen(false);
  };

  const openDetails = (exercise) => {
    setDetailModalOpen(true);
    setSelectedExercise(exercise);
  };

  const closeDetails = () => {
    setDetailModalOpen(false);
    setSelectedExercise(null);
  };

  const handleTargetChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTargets((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value)
    );
    setCurrentPage(1);
  };

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    setSelectedEquipment((prev) =>
      checked ? [...prev, value] : prev.filter((eq) => eq !== value)
    );
    setCurrentPage(1);
  };

  const paginatedExercises = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return searchResults.slice(startIndex, startIndex + perPage);
  }, [searchResults, currentPage, perPage]);

  const totalPages = Math.ceil(searchResults.length / perPage);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 2 + columnIndex;
    if (index >= paginatedExercises.length) return null;

    const exercise = paginatedExercises[index];

    return (
      <div style={style}>
        <ExerciseCard
          workout={exercise}
          onPlusClick={() => openModal(exercise)}
          onViewDetailsClick={() => openDetails(exercise)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-6 mx-auto text-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="animate-fade-in flex flex-wrap gap-4 justify-center mt-10 shadow-lg bg-gradient-to-r from-gray-950 to-blue-950 p-6 rounded-lg">
          {checkboxOptions.map((option) => (
            <div className="flex items-center" key={option.id}>
              <input
                className="mr-3 cursor-pointer text-white accent-blue-600"
                type="checkbox"
                id={option.id}
                value={option.id}
                checked={options.includes(option.id)}
                name="options"
                onChange={handleCheckboxChange}
              />
              <label
                className="text-lg cursor-pointer hover:text-blue-600 transition-all duration-200 text-white"
                htmlFor={option.id}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {showAdvanced ? "Hide Advanced Filters" : "Show Advanced Filters"}
        </button>

        {showAdvanced && (
          <div className="w-full mt-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6 bg-gray-900 p-6 rounded-lg shadow-lg text-left text-white">
              <div>
                <h3 className="text-lg mb-2 font-semibold text-blue-300">
                  Target Muscles
                </h3>
                <div className="flex flex-wrap gap-3">
                  {targetOptions.map((target) => (
                    <label key={target} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={target}
                        checked={selectedTargets.includes(target)}
                        onChange={handleTargetChange}
                        className="accent-blue-600"
                      />
                      {target}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-2 font-semibold text-blue-300">
                  Equipment
                </h3>
                <div className="flex flex-wrap gap-3">
                  {equipmentOptions.map((eq) => (
                    <label key={eq} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={eq}
                        checked={selectedEquipment.includes(eq)}
                        onChange={handleEquipmentChange}
                        className="accent-blue-600"
                      />
                      {eq}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-md mt-6">
          <input
            onChange={(e) => debouncedSearch(e.target.value)}
            type="text"
            placeholder="Search for workouts"
            className="animate-fade-in w-full border-gray-900 shadow-lg text-white bg-gradient-to-r from-gray-950 to-blue-950 px-4 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {isLoading ? (
          <div className="text-center my-8">
            <Loading />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-8 w-full px-4">
              {paginatedExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  workout={exercise}
                  onPlusClick={() => openModal(exercise)}
                  onViewDetailsClick={() => openDetails(exercise)}
                />
              ))}
            </div>

         
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        {modalOpen && (
          <GroupModalCard
            exercise={selectedExercise}
            key={selectedExercise.id}
            onClose={closeModal}
            modalOpen={modalOpen}
          />
        )}
        {detailModalOpen && (
          <CatalogDetailsModal
            name={selectedExercise.name}
            target={selectedExercise.target}
            bodyPart={selectedExercise.bodyPart}
            secondaryMuscles={selectedExercise.secondaryMuscles}
            gifUrl={selectedExercise.gifUrl}
            equipment={selectedExercise.equipment}
            instructions={selectedExercise.instructions}
            onClose={closeDetails}
          />
        )}
      </div>
    </>
  );
}
