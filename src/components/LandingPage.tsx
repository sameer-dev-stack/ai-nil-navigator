import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Trophy, Users, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-elite-lime rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-heading font-bold text-black dark:text-white">NIL Navigator</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <DarkModeToggle />
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
            className="text-black hover:text-elite-gray-700 dark:text-white dark:hover:text-elite-gray-300"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            className="bg-black text-white hover:bg-elite-gray-800"
          >
            Get Started
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-black leading-tight">
                Your Elite
                <span className="block text-elite-lime">NIL Navigator</span>
              </h1>
              
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-elite-gray-600 font-body leading-relaxed">
                Professional AI advisor for high school athletes. Generate personalized NIL action plans, 
                maximize your potential, and build your brand with precision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-elite-lime text-black hover:bg-elite-lime/90 font-heading font-semibold px-8 py-4 text-lg"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/learn-more')}
                  className="border-2 border-black text-black hover:bg-black hover:text-white font-heading font-semibold px-8 py-4 text-lg"
                >
                  See How It Works
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-elite-lime/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-24 bg-elite-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-black mb-4">
              Elite Features for Elite Athletes
            </h2>
            <p className="text-xl text-elite-gray-600 max-w-2xl mx-auto">
              Cutting-edge AI technology meets athletic excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Personalized Strategy",
                description: "AI-generated action plans tailored to your sport, location, and goals"
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get comprehensive NIL strategies in seconds, not weeks"
              },
              {
                icon: Trophy,
                title: "Elite Standards",
                description: "Professional-grade advice that meets the highest athletic standards"
              },
              {
                icon: Users,
                title: "Community Focus",
                description: "Strategies that leverage your local sports community and connections"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-elite-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-elite-lime rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-elite-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-black">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Ready to Dominate Your NIL Game?
            </h2>
            <p className="text-xl text-elite-gray-300 max-w-2xl mx-auto">
              Join elite high school athletes who are already maximizing their potential with AI-powered NIL strategies.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-elite-lime text-black hover:bg-elite-lime/90 font-heading font-semibold px-8 py-4 text-lg"
            >
              Start Your Elite Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
