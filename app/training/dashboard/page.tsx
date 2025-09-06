
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  PlayCircle,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Video,
  FileText,
  Brain,
  Zap
} from 'lucide-react'

export default function TrainingDashboard() {
  const [studentStats] = useState({
    overallProgress: 18,
    currentModule: 2,
    currentLesson: 'Income Reporting - Wages, Interest, Dividends',
    lessonsCompleted: 12,
    totalLessons: 64,
    hoursStudied: 28,
    targetHours: 160,
    lastActive: '2 hours ago',
    upcomingDeadlines: [
      { module: 'Module 2', task: 'Individual Returns Exam', dueDate: 'Dec 15, 2024', priority: 'high' },
      { module: 'Module 3', task: 'Business Entity Quiz', dueDate: 'Dec 22, 2024', priority: 'medium' }
    ],
    recentAchievements: [
      { title: 'Module 1 Complete', icon: CheckCircle, date: '3 days ago', color: 'green' },
      { title: 'First Perfect Quiz', icon: Target, date: '1 week ago', color: 'blue' },
      { title: 'Study Streak: 7 Days', icon: TrendingUp, date: '1 week ago', color: 'purple' }
    ],
    nextSteps: [
      { 
        module: 2, 
        lesson: 3, 
        title: 'Schedule C Business Income',
        type: 'video',
        duration: '45 min',
        href: '/training/modules/2/lessons/3'
      },
      {
        module: 2,
        lesson: 4, 
        title: 'Itemized Deductions Deep Dive',
        type: 'interactive',
        duration: '60 min', 
        href: '/training/modules/2/lessons/4'
      },
      {
        module: 2,
        lesson: 'assessment',
        title: 'Module 2 Practice Exam', 
        type: 'assessment',
        duration: '90 min',
        href: '/training/modules/2/assessment'
      }
    ]
  })

  const moduleProgress = [
    { number: 1, title: 'Tax Law Fundamentals', progress: 100, status: 'completed', lessons: 8, timeSpent: 12 },
    { number: 2, title: 'Individual Tax Returns', progress: 45, status: 'current', lessons: 10, timeSpent: 16 },
    { number: 3, title: 'Business Tax Returns', progress: 0, status: 'locked', lessons: 12, timeSpent: 0 },
    { number: 4, title: 'Advanced Deductions', progress: 0, status: 'locked', lessons: 8, timeSpent: 0 },
    { number: 5, title: 'Tax Software Mastery', progress: 0, status: 'locked', lessons: 6, timeSpent: 0 },
    { number: 6, title: 'Client Communication', progress: 0, status: 'locked', lessons: 5, timeSpent: 0 },
    { number: 7, title: 'Ethics & PTIN', progress: 0, status: 'locked', lessons: 7, timeSpent: 0 },
    { number: 8, title: 'Practice Management', progress: 0, status: 'locked', lessons: 8, timeSpent: 0 }
  ]

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-xl text-gray-600 mt-2">Ready to continue your tax preparer journey?</p>
          </div>
          <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="text-3xl font-bold">{studentStats.overallProgress}%</div>
            <div className="text-sm opacity-90">Complete</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-green-50 rounded-xl p-4 border border-green-100">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">{studentStats.lessonsCompleted}</div>
            <div className="text-sm text-green-600">Lessons Complete</div>
          </div>
          <div className="text-center bg-blue-50 rounded-xl p-4 border border-blue-100">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{studentStats.hoursStudied}h</div>
            <div className="text-sm text-blue-600">Hours Studied</div>
          </div>
          <div className="text-center bg-purple-50 rounded-xl p-4 border border-purple-100">
            <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">Module {studentStats.currentModule}</div>
            <div className="text-sm text-purple-600">Current Focus</div>
          </div>
          <div className="text-center bg-orange-50 rounded-xl p-4 border border-orange-100">
            <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-800">3</div>
            <div className="text-sm text-orange-600">Achievements</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <PlayCircle className="h-12 w-12 text-white" />
                  <div>
                    <h2 className="text-2xl font-bold">Continue Learning</h2>
                    <p className="text-indigo-100">Pick up where you left off</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <p className="text-sm font-semibold mb-1">Current Lesson:</p>
                  <p className="text-lg">{studentStats.currentLesson}</p>
                </div>
                <Link href={`/training/modules/${studentStats.currentModule}`}>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl">
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Module Progress */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <GraduationCap className="h-7 w-7 text-blue-600" />
                Training Modules Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {moduleProgress.map((module) => (
                <div key={module.number} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        module.status === 'completed' ? 'bg-green-100 text-green-700' :
                        module.status === 'current' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {module.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          module.number
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500">
                          {module.lessons} lessons • {module.timeSpent}h studied
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        module.status === 'completed' ? 'default' :
                        module.status === 'current' ? 'secondary' :
                        'outline'
                      }>
                        {module.status === 'completed' ? 'Complete' :
                         module.status === 'current' ? 'In Progress' :
                         'Locked'}
                      </Badge>
                      <span className="text-sm font-semibold text-gray-600">{module.progress}%</span>
                    </div>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-7 w-7 text-green-600" />
                Your Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentStats.nextSteps.map((step, index) => (
                <Link key={index} href={step.href}>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      step.type === 'video' ? 'bg-red-100 text-red-600' :
                      step.type === 'interactive' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {step.type === 'video' ? <Video className="h-6 w-6" /> :
                       step.type === 'interactive' ? <Brain className="h-6 w-6" /> :
                       <FileText className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{step.title}</h3>
                      <p className="text-sm text-gray-500">Module {step.module} • {step.duration}</p>
                    </div>
                    <Badge variant="outline" className="group-hover:border-blue-300">
                      {step.type === 'assessment' ? 'Test' : 'Lesson'}
                    </Badge>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Study Streak */}
          <Card className="shadow-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-white" />
              <div className="text-3xl font-bold mb-2">7</div>
              <div className="text-green-100">Day Study Streak!</div>
              <p className="text-sm text-green-100 mt-2">
                Keep it going! You're building great habits.
              </p>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-yellow-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentStats.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.color === 'green' ? 'bg-green-100 text-green-600' :
                    achievement.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{achievement.title}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentStats.upcomingDeadlines.map((deadline, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  deadline.priority === 'high' ? 'bg-red-50 border-red-400' :
                  'bg-yellow-50 border-yellow-400'
                }`}>
                  <p className="font-semibold text-gray-900 text-sm">{deadline.task}</p>
                  <p className="text-xs text-gray-600">{deadline.module}</p>
                  <p className="text-xs text-gray-500 mt-1">{deadline.dueDate}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Today's Study Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 text-sm leading-relaxed">
                When learning tax law, always connect new concepts to real-world examples. 
                Try to think of how each rule would apply to different client situations you might encounter.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
