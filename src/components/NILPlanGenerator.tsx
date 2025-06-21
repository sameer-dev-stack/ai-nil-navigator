import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Loader2, Trophy, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateNILPlan, AthleteProfile, NILPlan } from '@/lib/gemini';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

interface NILPlanGeneratorProps {
  userProfile: {
    firstName: string;
    lastName: string;
    sport: string;
    schoolYear: string;
    state: string;
    goals: string;
  };
  onPlanGenerated: (plan: any) => void;
  onCancel: () => void;
}

export default function NILPlanGenerator({ userProfile, onPlanGenerated, onCancel }: NILPlanGeneratorProps) {
  const { currentUser } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  // Add this check at the beginning
  if (!userProfile || !userProfile.firstName) {
    // This case should ideally be prevented by the parent component (Dashboard.tsx)
    // redirecting to profile setup. This is an additional safeguard.
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">
            Error: User profile is incomplete. Please complete your profile.
          </p>
          <Button onClick={onCancel} className="mt-4">Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 20;
        });
      }, 500);

      const athleteProfile: AthleteProfile = {
        sport: userProfile.sport,
        schoolYear: userProfile.schoolYear,
        state: userProfile.state,
        goals: userProfile.goals,
        name: `${userProfile.firstName} ${userProfile.lastName}`
      };

      const nilPlan = await generateNILPlan(athleteProfile);

      clearInterval(progressInterval);
      setProgress(100);

      // Save to Firestore
      const planDoc = await addDoc(collection(db, 'nilPlans'), {
        ...nilPlan,
        userId: currentUser!.uid,
        createdAt: new Date(),
        athleteProfile
      });

      const savedPlan = {
        id: planDoc.id,
        ...nilPlan,
        createdAt: new Date()
      };

      // Brief delay to show completion
      setTimeout(() => {
        onPlanGenerated(savedPlan);
      }, 1000);

    } catch (error: any) {
      console.error('Error generating NIL plan:', error);
      setError(error.message || 'Failed to generate NIL plan. Please try again.');
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-black text-white py-6">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-elite-lime rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold">NIL Navigator</h1>
                <p className="text-elite-gray-300 text-sm">AI Plan Generator</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              {!isGenerating && (
                <Button
                  variant="ghost"
                  onClick={onCancel}
                  className="text-white hover:text-elite-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {!isGenerating ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-black dark:text-white">
                Generate Your Elite NIL Strategy
              </h2>
              <p className="text-xl text-elite-gray-600 dark:text-elite-gray-300 max-w-2xl mx-auto">
                Our AI will analyze your profile and create a personalized, professional-grade NIL action plan designed specifically for your athletic journey.
              </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-elite-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-heading font-semibold text-black dark:text-white mb-6">
                Your Profile Summary
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400 mb-1">Athlete</p>
                  <p className="font-medium text-black dark:text-white">{userProfile.firstName} {userProfile.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400 mb-1">Sport</p>
                  <p className="font-medium text-black dark:text-white">{userProfile.sport}</p>
                </div>
                <div>
                  <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400 mb-1">School Year</p>
                  <p className="font-medium text-black dark:text-white">{userProfile.schoolYear}</p>
                </div>
                <div>
                  <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400 mb-1">State</p>
                  <p className="font-medium text-black dark:text-white">{userProfile.state}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400 mb-2">Goals</p>
                <p className="text-black dark:text-white leading-relaxed">{userProfile.goals}</p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg max-w-2xl mx-auto dark:bg-red-800 dark:border-red-700 dark:text-red-100"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <Button
                onClick={handleGenerate}
                className="bg-elite-lime text-black hover:bg-elite-lime/90 font-heading font-semibold px-8 py-4 text-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Generate My Elite NIL Plan
              </Button>
              <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400">
                This usually takes 30-60 seconds to create your personalized strategy
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-elite-lime rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-black animate-pulse" />
              </div>

              <h2 className="text-3xl font-heading font-bold text-black dark:text-white">
                Crafting Your Elite Strategy
              </h2>
              <p className="text-xl text-elite-gray-600 dark:text-elite-gray-300 max-w-2xl mx-auto">
                Our AI is analyzing your profile and generating a personalized NIL action plan designed specifically for your success.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-full bg-elite-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-elite-lime h-3 rounded-full"
                />
              </div>
              <p className="text-elite-gray-600 dark:text-elite-gray-300">
                {progress < 30 && "Analyzing your athletic profile..."}
                {progress >= 30 && progress < 60 && "Researching NIL opportunities in your state..."}
                {progress >= 60 && progress < 90 && "Creating your personalized strategy..."}
                {progress >= 90 && "Finalizing your elite NIL plan..."}
              </p>
            </div>

            <div className="bg-elite-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-heading font-semibold text-black dark:text-white mb-4">
                What's Being Created For You:
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-elite-lime rounded-full"></div>
                  <p className="text-elite-gray-700 dark:text-elite-gray-300">Personalized NIL strategy roadmap</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-elite-lime rounded-full"></div>
                  <p className="text-elite-gray-700 dark:text-elite-gray-300">Step-by-step action phases</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-elite-lime rounded-full"></div>
                  <p className="text-elite-gray-700 dark:text-elite-gray-300">Quick wins you can implement today</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-elite-lime rounded-full"></div>
                  <p className="text-elite-gray-700 dark:text-elite-gray-300">Long-term strategic goals</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-elite-lime rounded-full"></div>
                  <p className="text-elite-gray-700 dark:text-elite-gray-300">Sport and location-specific opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
