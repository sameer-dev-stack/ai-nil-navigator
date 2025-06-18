import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Trophy, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/profile-setup');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const passwordRequirements = [
    { text: 'At least 6 characters', met: formData.password.length >= 6 },
    { text: 'Contains letters and numbers', met: /(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex items-center justify-center p-12"
        >
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-heading font-bold text-white leading-tight">
              Start Your
              <span className="block text-elite-lime">Elite Journey</span>
            </h2>
            <p className="text-xl text-elite-gray-300 max-w-md">
              Join thousands of high school athletes who are maximizing their NIL potential with professional AI guidance.
            </p>

            <div className="space-y-3 text-left max-w-sm mx-auto">
              <div className="flex items-center text-elite-gray-300">
                <Check className="w-5 h-5 text-elite-lime mr-3" />
                Personalized NIL strategies
              </div>
              <div className="flex items-center text-elite-gray-300">
                <Check className="w-5 h-5 text-elite-lime mr-3" />
                Professional brand building
              </div>
              <div className="flex items-center text-elite-gray-300">
                <Check className="w-5 h-5 text-elite-lime mr-3" />
                AI-powered action plans
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-elite-lime/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-black hover:text-elite-gray-700 mb-8 dark:text-white dark:hover:text-elite-gray-300">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>

            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-elite-lime rounded-xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-black" />
              </div>
            </div>

            <h1 className="text-3xl font-heading font-bold text-black dark:text-white">
              Create Your Account
            </h1>
            <p className="mt-2 text-elite-gray-600 dark:text-elite-gray-300">
              Join the elite community of high school athletes
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm dark:bg-red-800 dark:border-red-700 dark:text-red-100"
            >
              {error}
            </motion.div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-black font-medium dark:text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-2 border-elite-gray-300 focus:border-elite-lime focus:ring-elite-lime bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-black font-medium dark:text-white">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-2 border-elite-gray-300 focus:border-elite-lime focus:ring-elite-lime bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-black font-medium dark:text-white">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-2 border-elite-gray-300 focus:border-elite-lime focus:ring-elite-lime bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-black font-medium dark:text-white">
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-elite-gray-300 focus:border-elite-lime focus:ring-elite-lime pr-10 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-elite-gray-500 hover:text-elite-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className={`w-4 h-4 mr-2 ${req.met ? 'text-green-500' : 'text-elite-gray-400'}`} />
                      <span className={req.met ? 'text-green-600' : 'text-elite-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-black font-medium dark:text-white">
                Confirm Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="border-elite-gray-300 focus:border-elite-lime focus:ring-elite-lime pr-10 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-elite-gray-500 hover:text-elite-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-elite-gray-800 font-heading font-semibold py-3"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-elite-gray-600 dark:text-elite-gray-300">Already have an account? </span>
            <Link
              to="/login"
              className="text-elite-lime hover:text-elite-lime/80 font-medium dark:text-elite-lime dark:hover:text-elite-lime/80"
            >
              Sign in here
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
