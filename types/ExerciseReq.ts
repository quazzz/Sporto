type ExerciseRequest = {
    name: string;
    equipment: string;
    gifUrl: string;
    target: string;
    bodyPart: string;
    instructions: string[];
    secondaryMuscles: string[];
    groupId: string;
    sets: string;
    reps: string;
    kg: string;
  };
export default ExerciseRequest;