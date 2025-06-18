import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Target,
  Zap,
  Calendar,
  CheckCircle,
  Clock,
  ChevronRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

interface NILPlanViewerProps {
  plan: {
    id: string;
    title: string;
    overview: string;
    createdAt: any;
    steps: {
      phase: string;
      title: string;
      description: string;
      timeline: string;
      actions: string[];
    }[];
    quickWins: string[];
    longTermGoals: string[];
  };
  onBack: () => void;
}

export default function NILPlanViewer({ plan, onBack }: NILPlanViewerProps) {
  return (
    <div className="min-h-screen bg-elite-gray-50 dark:bg-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-elite-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-black hover:text-elite-gray-700 dark:text-white dark:hover:text-elite-gray-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>

              <div className="w-8 h-8 bg-elite-lime rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-black dark:text-white">NIL Action Plan</h1>
                <p className="text-elite-gray-600 dark:text-elite-gray-300 text-sm">
                  Generated {plan.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Plan Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-black dark:text-white mb-4">
            {plan.title}
          </h2>
          <p className="text-xl text-elite-gray-600 dark:text-elite-gray-300 max-w-4xl mx-auto leading-relaxed">
            {plan.overview}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Strategic Phases */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-heading font-bold text-black dark:text-white mb-6 flex items-center">
                <Target className="w-6 h-6 text-elite-lime mr-3" />
                Strategic Development Phases
              </h3>

              <div className="space-y-6">
                {plan.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="bg-white dark:bg-gray-800 border-l-4 border-l-elite-lime hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {step.phase}
                            </Badge>
                            <CardTitle className="text-xl font-heading font-bold text-black dark:text-white">
                              {step.title}
                            </CardTitle>
                            <div className="flex items-center mt-2">
                              <Clock className="w-4 h-4 text-elite-gray-500 dark:text-gray-400 mr-2" />
                              <span className="text-sm text-elite-gray-600 dark:text-gray-300">{step.timeline}</span>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-elite-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                          {step.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <h4 className="font-heading font-semibold text-black dark:text-white mb-3">Action Items:</h4>
                        <div className="space-y-2">
                          {step.actions.map((action, actionIndex) => (
                            <div key={actionIndex} className="flex items-start space-x-3 group">
                              <div className="w-5 h-5 rounded-full border-2 border-elite-gray-300 dark:border-gray-600 flex-shrink-0 mt-0.5 group-hover:border-elite-lime transition-colors"></div>
                              <p className="text-elite-gray-700 dark:text-gray-300 leading-relaxed">{action}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Wins */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-elite-lime/10 dark:bg-gray-700 border-elite-lime/20 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-lg font-heading font-bold text-black dark:text-white flex items-center">
                    <Zap className="w-5 h-5 text-elite-lime mr-2" />
                    Quick Wins
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Start implementing these strategies immediately
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plan.quickWins.map((win, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + 0.1 * index }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-elite-lime flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-elite-gray-700 dark:text-gray-300 leading-relaxed">{win}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Long-term Goals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-heading font-bold text-black dark:text-white flex items-center">
                    <Star className="w-5 h-5 text-elite-lime mr-2" />
                    Long-term Vision
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Your ultimate NIL success milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plan.longTermGoals.map((goal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + 0.1 * index }}
                        className="flex items-start space-x-3"
                      >
                        <ChevronRight className="w-5 h-5 text-elite-lime flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-elite-gray-700 dark:text-gray-300 leading-relaxed">{goal}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-heading font-bold text-black dark:text-white">
                    Plan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-elite-gray-600 dark:text-gray-300">Total Phases</span>
                    <span className="font-semibold text-black dark:text-white">{plan.steps.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-elite-gray-600 dark:text-gray-300">Quick Wins</span>
                    <span className="font-semibold text-black dark:text-white">{plan.quickWins.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-elite-gray-600 dark:text-gray-300">Long-term Goals</span>
                    <span className="font-semibold text-black dark:text-white">{plan.longTermGoals.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-elite-gray-600 dark:text-gray-300">Created</span>
                    <span className="font-semibold text-black dark:text-white">
                      {plan.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-black rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-4">
            Ready to Dominate Your NIL Game?
          </h3>
          <p className="text-elite-gray-300 mb-6 max-w-2xl mx-auto">
            Your personalized strategy is ready. Start with the quick wins and build momentum towards your long-term vision.
          </p>
          <Button
            onClick={onBack}
            className="bg-elite-lime text-black hover:bg-elite-lime/90 font-heading font-semibold px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
