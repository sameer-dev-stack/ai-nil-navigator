import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Plus,
  LogOut,
  User,
  Zap,
  Target,
  Clock,
  ChevronRight,
  Calendar,
  MapPin
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NILPlanGenerator from './NILPlanGenerator';
import NILPlanViewer from './NILPlanViewer';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

interface UserProfile {
  firstName: string;
  lastName: string;
  sport: string;
  schoolYear: string;
  state: string;
  goals: string;
  hasCompletedProfile: boolean;
}

interface NILPlan {
  id: string;
  title: string;
  overview: string;
  createdAt: any;
  steps: any[];
  quickWins: string[];
  longTermGoals: string[];
}

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [nilPlans, setNilPlans] = useState<NILPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<NILPlan | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    try {
      // Load user profile
      const userDoc = await getDoc(doc(db, 'users', currentUser!.uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data();
        const profile: UserProfile = {
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          sport: profileData.sport || '',
          schoolYear: profileData.schoolYear || '',
          state: profileData.state || '',
          goals: profileData.goals || '',
          hasCompletedProfile: profileData.hasCompletedProfile || false,
        };
        setUserProfile(profile);

        // If profile is incomplete OR critical info like firstName is missing, redirect.
        if (!profile.hasCompletedProfile || !profile.firstName) {
          navigate('/profile-setup');
          return;
        }
      } else {
        // If no user document exists at all, redirect to profile setup.
        navigate('/profile-setup');
        return;
      }

      // Load NIL plans
      const plansQuery = query(
        collection(db, 'nilPlans'),
        where('userId', '==', currentUser!.uid),
        orderBy('createdAt', 'desc')
      );
      const plansSnapshot = await getDocs(plansQuery);
      const plans = plansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NILPlan[];

      setNilPlans(plans);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handlePlanGenerated = (newPlan: NILPlan) => {
    setNilPlans([newPlan, ...nilPlans]);
    setSelectedPlan(newPlan);
    setShowGenerator(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-elite-lime rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Trophy className="w-7 h-7 text-black animate-pulse" />
          </div>
          <p className="text-elite-gray-600 dark:text-elite-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (showGenerator) {
    return (
      <NILPlanGenerator
        userProfile={userProfile!}
        onPlanGenerated={handlePlanGenerated}
        onCancel={() => setShowGenerator(false)}
      />
    );
  }

  if (selectedPlan) {
    return (
      <NILPlanViewer
        plan={selectedPlan}
        onBack={() => setSelectedPlan(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-elite-gray-50 dark:bg-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-elite-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-elite-lime rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-black dark:text-white">NIL Navigator</h1>
                <p className="text-elite-gray-600 dark:text-elite-gray-300 text-sm">Your Elite Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="text-black hover:text-elite-gray-700 dark:text-white dark:hover:text-elite-gray-300"
              >
                <User className="w-4 h-4 mr-2" />
                {userProfile?.firstName}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-black hover:text-elite-gray-700 dark:text-white dark:hover:text-elite-gray-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-heading font-bold text-black dark:text-white mb-2">
            Welcome back, {userProfile?.firstName}!
          </h2>
          <p className="text-elite-gray-600 dark:text-elite-gray-300 text-lg">
            Ready to dominate your NIL game? Let's build your next strategic advantage.
          </p>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 border border-elite-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-heading font-semibold text-black dark:text-white mb-4">Your Profile</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-elite-lime" />
              <div>
                <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400">Sport</p>
                <p className="font-medium text-black dark:text-white">{userProfile?.sport}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-elite-lime" />
              <div>
                <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400">School Year</p>
                <p className="font-medium text-black dark:text-white">{userProfile?.schoolYear}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-elite-lime" />
              <div>
                <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400">State</p>
                <p className="font-medium text-black dark:text-white">{userProfile?.state}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-heading font-bold text-black dark:text-white">Your NIL Plans</h3>
              <Button
                onClick={() => {
                  if (userProfile?.firstName) {
                    setShowGenerator(true);
                  } else {
                    console.error("User profile is incomplete. Cannot generate plan.");
                    navigate('/profile-setup');
                  }
                }}
                className="bg-elite-lime text-black hover:bg-elite-lime/90 font-heading font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Generate New Plan
              </Button>
            </div>

            {nilPlans.length === 0 ? (
              <Card className="border-2 border-dashed border-elite-gray-300 bg-elite-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <CardContent className="py-12 text-center">
                  <Target className="w-12 h-12 text-elite-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-elite-gray-600 dark:text-gray-300 mb-2">
                    No NIL Plans Yet
                  </CardTitle>
                  <CardDescription className="text-elite-gray-500 dark:text-gray-400 mb-6">
                    Generate your first personalized NIL strategy to start dominating your game.
                  </CardDescription>
                  <Button
                    onClick={() => {
                      if (userProfile?.firstName) {
                        setShowGenerator(true);
                      } else {
                        console.error("User profile is incomplete. Cannot create first plan.");
                        navigate('/profile-setup');
                      }
                    }}
                    className="bg-black text-white hover:bg-elite-gray-800"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Create Your First Plan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {nilPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedPlan(plan)}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-elite-gray-200 dark:border-gray-700 hover:border-elite-lime hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-heading font-semibold text-black dark:text-white mb-2 group-hover:text-elite-lime transition-colors">
                          {plan.title}
                        </h4>
                        <p className="text-elite-gray-600 dark:text-elite-gray-300 text-sm mb-3 line-clamp-2">
                          {plan.overview}
                        </p>
                        <div className="flex items-center text-xs text-elite-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {plan.createdAt?.toDate().toLocaleDateString()}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-elite-gray-400 dark:text-gray-500 group-hover:text-elite-lime transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-gray-800 border-elite-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-black dark:text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-elite-gray-600 dark:text-elite-gray-300">NIL Plans Created</span>
                  <span className="text-2xl font-heading font-bold text-black dark:text-white">{nilPlans.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-elite-gray-600 dark:text-elite-gray-300">Profile Completion</span>
                  <span className="text-2xl font-heading font-bold text-elite-lime">100%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-elite-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-black dark:text-white">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-elite-lime rounded-full mt-2"></div>
                    <p className="text-sm text-elite-gray-600 dark:text-elite-gray-300">
                      Generate your personalized NIL action plan
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-elite-gray-300 dark:bg-gray-600 rounded-full mt-2"></div>
                    <p className="text-sm text-elite-gray-600 dark:text-elite-gray-300">
                      Implement your quick wins strategy
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-elite-gray-300 dark:bg-gray-600 rounded-full mt-2"></div>
                    <p className="text-sm text-elite-gray-600 dark:text-elite-gray-300">
                      Track your progress and results
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
