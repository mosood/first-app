'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  fitnessLevel: 'beginner' | 'intermediate' | 'expert';
  focusAreas: string[];
  weight?: number;
  height?: number;
  age?: number;
};

// Replace this with your actual validation
const schema = yup.object().shape({
  // Example rules
  // fitnessLevel: yup.string().required("Select your fitness level"),
  // focusAreas: yup.array().of(yup.string()).min(1, "Select at least one focus area"),
  // weight: yup.number().positive("Must be a positive number").nullable(),
  // height: yup.number().positive("Must be a positive number").nullable(),
  // age: yup.number().positive("Must be a positive number").nullable(),
});

export default function ProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      focusAreas: [],
    },
  });

  // Called when user clicks "Complete Profile" on Step 3
  const onSubmit = (data: FormData) => {
    console.log('Profile data submitted:', data);

    // Navigate to another page
    router.push('/workouts'); 
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* (Optional) Progress bar / step indicators */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className={step >= 1 ? 'text-indigo-600' : 'text-gray-400'}>Fitness Level</span>
          <span className={step >= 2 ? 'text-indigo-600' : 'text-gray-400'}>Focus Areas</span>
          <span className={step >= 3 ? 'text-indigo-600' : 'text-gray-400'}>Additional Info</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded">
          <div
            className="h-2 bg-indigo-600 rounded"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* The multi-step form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Step 1: Fitness Level</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
                <select
                  {...register('fitnessLevel')}
                  className="mt-1 block w-full rounded-md border-gray-300"
                >
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
                {errors.fitnessLevel && (
                  <p className="text-red-500 text-sm">{errors.fitnessLevel.message}</p>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Step 2: Focus Areas</h2>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="arms"
                    {...register('focusAreas')}
                    className="mr-2"
                  />
                  Arms
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="legs"
                    {...register('focusAreas')}
                    className="mr-2"
                  />
                  Legs
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="core"
                    {...register('focusAreas')}
                    className="mr-2"
                  />
                  Core
                </label>
              </div>
              {errors.focusAreas && (
                <p className="text-red-500 text-sm">{errors.focusAreas.message}</p>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Step 3: Additional Info</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
                <input
                  type="number"
                  {...register('weight')}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height (ft)</label>
                <input
                  type="number"
                  {...register('height')}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  {...register('age')}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Back
                </button>
                {/* Submitting triggers onSubmit -> logs data, then router.push("/workouts") */}
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Complete Profile
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
