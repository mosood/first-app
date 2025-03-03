'use client';

import { motion } from 'framer-motion';

interface WorkoutHistory {
  id: number;
  date: string;
  workout: string;
  duration: number;
  caloriesBurned: number;
  completed: boolean;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  total?: number;
}

// Mock data - this would come from your backend
const workoutHistory: WorkoutHistory[] = [
  {
    id: 1,
    date: '2024-03-01',
    workout: 'Full Body Strength',
    duration: 45,
    caloriesBurned: 320,
    completed: true,
  },
  {
    id: 2,
    date: '2024-02-29',
    workout: 'HIIT Cardio Blast',
    duration: 30,
    caloriesBurned: 280,
    completed: true,
  },
  {
    id: 3,
    date: '2024-02-28',
    workout: 'Core Power',
    duration: 20,
    caloriesBurned: 150,
    completed: true,
  },
];

const achievements: Achievement[] = [
  {
    id: 1,
    name: 'First Workout',
    description: 'Completed your first workout',
    icon: '🎯',
    earned: true,
    earnedDate: '2024-02-28',
  },
  {
    id: 2,
    name: '3-Day Streak',
    description: 'Completed workouts three days in a row',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-03-01',
  },
  {
    id: 3,
    name: 'Strength Master',
    description: 'Complete 10 strength workouts',
    icon: '💪',
    earned: false,
    progress: 3,
    total: 10,
  },
];

const stats = {
  totalWorkouts: 15,
  totalMinutes: 420,
  totalCalories: 3150,
  currentStreak: 3,
};

export default function ProgressPage() {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Progress</h1>
        
        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Total Workouts', value: stats.totalWorkouts, icon: '🏋️' },
            { name: 'Minutes Exercised', value: stats.totalMinutes, icon: '⏱️' },
            { name: 'Calories Burned', value: stats.totalCalories, icon: '🔥' },
            { name: 'Current Streak', value: stats.currentStreak, icon: '📅' },
          ].map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt>
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </div>

        {/* Recent Workouts */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
          <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
              {workoutHistory.map((workout, index) => (
                <motion.li
                  key={workout.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{workout.workout}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(workout.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {workout.duration} min • {workout.caloriesBurned} cal
                      </div>
                      {workout.completed && (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-lg border p-4 ${
                  achievement.earned ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
                {achievement.earned && achievement.earnedDate ? (
                  <div className="mt-3 text-sm text-green-600">
                    Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                ) : (
                  achievement.progress !== undefined && achievement.total !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Progress</span>
                        <span>{achievement.progress} / {achievement.total}</span>
                      </div>
                      <div className="mt-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{
                            width: `${(achievement.progress / achievement.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 