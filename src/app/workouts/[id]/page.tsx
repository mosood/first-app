'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

// This would typically come from an API or database
const workouts = {
  '1': {
    name: 'Full Body Strength',
    description: 'A complete workout targeting all major muscle groups',
    duration: '45 min',
    level: 'intermediate',
    category: 'strength',
    exercises: [
      {
        name: 'Push-ups',
        sets: 3,
        reps: 12,
        restTime: 60,
        description: 'Keep your core tight and lower your chest to the ground',
        duration: 180,
      },
      {
        name: 'Squats',
        sets: 4,
        reps: 15,
        restTime: 90,
        description: 'Keep your back straight and lower until your thighs are parallel to the ground',
        duration: 240,
      },
      {
        name: 'Dumbbell Rows',
        sets: 3,
        reps: 12,
        restTime: 60,
        description: 'Pull the weight towards your hip while keeping your back straight',
        duration: 180,
      },
      {
        name: 'Plank',
        sets: 3,
        duration: 60,
        restTime: 45,
        description: 'Maintain a straight line from head to heels',
        isTimeBased: true,
      },
    ],
  },
  // Add more workouts as needed
};

export default function WorkoutPage() {
  const router = useRouter();
  const params = useParams();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const workoutId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null;
  const workout = workoutId ? workouts[workoutId as keyof typeof workouts] : null;

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Workout not found</h2>
          <p className="mt-2 text-gray-600">The workout you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/workouts')}
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
          >
            Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  const currentExerciseData = workout.exercises[currentExercise];

  const startExercise = () => {
    // Implementation for starting the exercise timer
    console.log('Starting exercise:', currentExerciseData.name);
  };

  const nextExercise = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setIsResting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/workouts')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Workouts
          </button>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{workout.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
              {workout.level}
            </span>
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              {workout.duration}
            </span>
          </div>
          <p className="mt-4 text-gray-600">{workout.description}</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentExercise}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {currentExerciseData.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{currentExerciseData.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Sets</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{currentExerciseData.sets}</p>
                  </div>
                  {!currentExerciseData.isTimeBased && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm font-medium text-gray-500">Reps</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">{currentExerciseData.reps}</p>
                    </div>
                  )}
                  {currentExerciseData.isTimeBased && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">{currentExerciseData.duration}s</p>
                    </div>
                  )}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Rest</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{currentExerciseData.restTime}s</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={startExercise}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Start Exercise
                  </button>
                  {currentExercise < workout.exercises.length - 1 && (
                    <button
                      onClick={nextExercise}
                      className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Next Exercise →
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Exercise {currentExercise + 1} of {workout.exercises.length}</span>
              <div className="w-full max-w-xs mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${((currentExercise + 1) / workout.exercises.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 