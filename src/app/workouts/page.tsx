'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const workouts = [
  {
    id: 1,
    name: 'Full Body Strength',
    description: 'A complete workout targeting all major muscle groups',
    duration: '45 min',
    level: 'intermediate',
    category: 'strength',
  },
  {
    id: 2,
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    duration: '30 min',
    level: 'advanced',
    category: 'cardio',
  },
  {
    id: 3,
    name: 'Core Power',
    description: 'Focus on building core strength and stability',
    duration: '20 min',
    level: 'beginner',
    category: 'core',
  },
  {
    id: 4,
    name: 'Upper Body Focus',
    description: 'Target arms, chest, and back with this strength routine',
    duration: '40 min',
    level: 'intermediate',
    category: 'strength',
  },
  {
    id: 5,
    name: 'Lower Body Burn',
    description: 'Build leg strength and improve stability',
    duration: '35 min',
    level: 'intermediate',
    category: 'strength',
  },
  {
    id: 6,
    name: 'Flexibility Flow',
    description: 'Improve mobility and reduce muscle tension',
    duration: '25 min',
    level: 'beginner',
    category: 'flexibility',
  },
];

export default function WorkoutsPage() {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Workouts
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Choose from our collection of professionally designed workouts tailored to your fitness level.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Filter Workouts
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <motion.div
              key={workout.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    {workout.level}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {workout.duration}
                  </span>
                </div>
                
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{workout.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{workout.description}</p>
                
                <div className="mt-6">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Start Workout
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 