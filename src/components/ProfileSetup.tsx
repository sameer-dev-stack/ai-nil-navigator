import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight, User, MapPin, Calendar, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const SPORTS = [
  'Basketball', 'Football', 'Soccer', 'Baseball', 'Softball', 'Tennis',
  'Golf', 'Swimming', 'Track and Field', 'Cross Country', 'Wrestling',
  'Volleyball', 'Lacrosse', 'Hockey', 'Gymnastics', 'Cheerleading',
  'Other'
];

const SCHOOL_YEARS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior'
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    sport: '',
    schoolYear: '',
    state: '',
    goals: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Update user profile in Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        ...formData,
        hasCompletedProfile: true,
        profileCompletedAt: new Date()
      });

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const isFormValid = formData.sport && formData.schoolYear && formData.state && formData.goals.trim();

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
                <p className="text-elite-gray-300 text-sm">Profile Setup</p>
              </div>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-black dark:text-white mb-4">
            Complete Your Athlete Profile
          </h2>
          <p className="text-xl text-elite-gray-600 dark:text-elite-gray-300 max-w-2xl mx-auto">
            Help us create the perfect NIL strategy tailored specifically to your athletic journey and goals.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm mb-8 max-w-2xl mx-auto dark:bg-red-800 dark:border-red-700 dark:text-red-100"
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sport Selection */}
            <div className="space-y-3">
              <Label className="flex items-center text-lg font-heading font-semibold text-black dark:text-white">
                <User className="w-5 h-5 mr-2 text-elite-lime" />
                What sport do you play?
              </Label>
              <Select onValueChange={(value) => handleInputChange('sport', value)}>
                <SelectTrigger className="h-12 border-2 border-elite-gray-300 focus:border-elite-lime bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Select your primary sport" />
                </SelectTrigger>
                <SelectContent>
                  {SPORTS.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* School Year */}
            <div className="space-y-3">
              <Label className="flex items-center text-lg font-heading font-semibold text-black dark:text-white">
                <Calendar className="w-5 h-5 mr-2 text-elite-lime" />
                What year are you in high school?
              </Label>
              <Select onValueChange={(value) => handleInputChange('schoolYear', value)}>
                <SelectTrigger className="h-12 border-2 border-elite-gray-300 focus:border-elite-lime bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Select your current school year" />
                </SelectTrigger>
                <SelectContent>
                  {SCHOOL_YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div className="space-y-3">
              <Label className="flex items-center text-lg font-heading font-semibold text-black dark:text-white">
                <MapPin className="w-5 h-5 mr-2 text-elite-lime" />
                Which state do you live in?
              </Label>
              <Select onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="h-12 border-2 border-elite-gray-300 focus:border-elite-lime bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Goals */}
            <div className="space-y-3">
              <Label className="flex items-center text-lg font-heading font-semibold text-black dark:text-white">
                <Target className="w-5 h-5 mr-2 text-elite-lime" />
                What are your athletic and NIL goals?
              </Label>
              <Textarea
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                placeholder="Describe your goals... (e.g., 'I want to get a college scholarship, build my social media following, and eventually pursue professional athletics. I'm also interested in partnering with local businesses and building my personal brand.')"
                className="min-h-32 border-2 border-elite-gray-300 focus:border-elite-lime focus:ring-elite-lime resize-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
              <p className="text-sm text-elite-gray-500 dark:text-elite-gray-400">
                Be specific about your aspirations - this helps us create a more personalized strategy.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full bg-black text-white hover:bg-elite-gray-800 font-heading font-semibold py-4 text-lg"
              >
                {isLoading ? (
                  'Creating Your Profile...'
                ) : (
                  <>
                    Generate My NIL Strategy
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
