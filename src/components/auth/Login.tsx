import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Trophy, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
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
              Welcome Back
            </h1>
            <p className="mt-2 text-elite-gray-600 dark:text-elite-gray-300">
              Sign in to continue your elite NIL journey
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-elite-lime hover:text-elite-lime/80 font-medium dark:text-elite-lime dark:hover:text-elite-lime/80"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-elite-gray-800 font-heading font-semibold py-3"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="text-center text-sm">
            <span className="text-elite-gray-600 dark:text-elite-gray-300">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-elite-lime hover:text-elite-lime/80 font-medium dark:text-elite-lime dark:hover:text-elite-lime/80"
            >
              Sign up here
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex items-center justify-center p-12"
        >
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-heading font-bold text-white leading-tight">
              Elite Athletes
              <span className="block text-elite-lime">Choose Excellence</span>
            </h2>
            <p className="text-xl text-elite-gray-300 max-w-md">
              Join the elite community of high school athletes maximizing their NIL potential with AI precision.
            </p>
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-elite-lime/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
