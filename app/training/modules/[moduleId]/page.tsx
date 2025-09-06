
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  PlayCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Video,
  FileText,
  Brain,
  Award,
  Lock,
  Users,
  Target,
  AlertCircle
} from 'lucide-react'

interface Lesson {
  id: string
  number: number
  title: string
  type: 'video' | 'text' | 'interactive' | 'document'
  duration: number
  description: string
  isCompleted: boolean
  isLocked: boolean
  keyTopics: string[]
}

interface ModuleData {
  id: string
  number: number
  title: string
  description: string
  estimatedHours: number
  learningObjectives: string[]
  progress: number
  lessons: Lesson[]
  finalAssessment: {
    title: string
    type: string
    duration: number
    passingScore: number
    attempts: number
    maxAttempts: number
    isUnlocked: boolean
  }
}

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const [moduleData, setModuleData] = useState<ModuleData | null>(null)

  useEffect(() => {
    // Mock data - in real app, fetch from database
    const modules: Record<string, ModuleData> = {
      '1': {
        id: '1',
        number: 1,
        title: 'Tax Law Fundamentals & IRS Regulations',
        description: 'Master the foundation of federal tax law and IRS regulations essential for professional tax preparation.',
        estimatedHours: 15,
        learningObjectives: [
          'Understand the structure and hierarchy of the Internal Revenue Code',
          'Navigate IRS publications, procedures, and official guidance',
          'Identify key tax law changes and updates for the current tax year',
          'Comprehend tax preparer responsibilities, ethics, and professional standards'
        ],
        progress: 100,
        lessons: [
          {
            id: 'lesson-1-1',
            number: 1,
            title: 'Introduction to Federal Tax System',
            type: 'video',
            duration: 45,
            description: 'Comprehensive overview of the U.S. federal tax system, including history, structure, and key principles.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Tax history', 'Constitutional authority', 'Types of federal taxes', 'IRS role and authority']
          },
          {
            id: 'lesson-1-2',
            number: 2,
            title: 'IRS Organization and Procedures',
            type: 'video',
            duration: 40,
            description: 'Understanding how the IRS operates, taxpayer rights, examination procedures, and appeals process.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['IRS structure', 'Taxpayer Bill of Rights', 'Audit procedures', 'Appeals process']
          },
          {
            id: 'lesson-1-3',
            number: 3,
            title: 'Tax Year and Accounting Methods',
            type: 'text',
            duration: 30,
            description: 'Deep dive into tax year elections and accounting method requirements for different taxpayer types.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Calendar vs fiscal year', 'Cash vs accrual method', 'Accounting method changes', 'Form 3115']
          },
          {
            id: 'lesson-1-4',
            number: 4,
            title: 'Internal Revenue Code Structure',
            type: 'interactive',
            duration: 50,
            description: 'Interactive exploration of IRC organization, subtitle structure, and how to research tax law.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['IRC subtitles', 'Chapters and sections', 'Research methodology', 'Primary vs secondary sources']
          },
          {
            id: 'lesson-1-5',
            number: 5,
            title: 'Treasury Regulations and Guidance',
            type: 'video',
            duration: 35,
            description: 'Understanding different types of IRS guidance: regulations, rulings, notices, and announcements.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Regulation types', 'Revenue rulings', 'Private letter rulings', 'Guidance hierarchy']
          },
          {
            id: 'lesson-1-6',
            number: 6,
            title: 'Tax Research Methodology', 
            type: 'interactive',
            duration: 55,
            description: 'Hands-on practice with professional tax research using RIA, CCH, and free IRS resources.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Research databases', 'Citation format', 'Authority levels', 'Documentation requirements']
          },
          {
            id: 'lesson-1-7',
            number: 7,
            title: 'Ethics and Professional Standards',
            type: 'video', 
            duration: 60,
            description: 'Critical coverage of Circular 230 requirements, professional ethics, and preparer responsibilities.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Circular 230 overview', 'Due diligence standards', 'Confidentiality rules', 'Disciplinary procedures']
          },
          {
            id: 'lesson-1-8',
            number: 8,
            title: 'Module 1 Review and Practice',
            type: 'interactive',
            duration: 40,
            description: 'Comprehensive review of all Module 1 concepts with practice questions and case studies.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Key concept review', 'Practice problems', 'Case study analysis', 'Exam preparation']
          }
        ],
        finalAssessment: {
          title: 'Tax Law Fundamentals Exam',
          type: 'Comprehensive Exam',
          duration: 75,
          passingScore: 85,
          attempts: 1,
          maxAttempts: 3,
          isUnlocked: true
        }
      },
      '2': {
        id: '2',
        number: 2,
        title: 'Individual Tax Return Preparation',
        description: 'Complete training on Form 1040 preparation, common schedules, and individual tax situations.',
        estimatedHours: 20,
        learningObjectives: [
          'Prepare accurate and complete Form 1040 tax returns',
          'Complete common schedules including A, B, C, D, and E',
          'Calculate correct tax liability and identify available credits',
          'Handle complex individual tax scenarios and special situations'
        ],
        progress: 45,
        lessons: [
          {
            id: 'lesson-2-1',
            number: 1,
            title: 'Form 1040 Overview and Filing Requirements',
            type: 'video',
            duration: 50,
            description: 'Comprehensive walkthrough of Form 1040, filing requirements, and status determinations.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Filing requirements', 'Filing status rules', 'Form 1040 layout', 'Common schedules']
          },
          {
            id: 'lesson-2-2',
            number: 2,
            title: 'Income Reporting - Wages, Interest, Dividends',
            type: 'interactive',
            duration: 60,
            description: 'Detailed coverage of common income types with hands-on practice using tax forms.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['W-2 reporting', '1099-INT/DIV', 'Tax-exempt income', 'Error identification']
          },
          {
            id: 'lesson-2-3',
            number: 3,
            title: 'Schedule C - Business Income and Expenses',
            type: 'video',
            duration: 65,
            description: 'Complete Schedule C preparation including income, expenses, and business deductions.',
            isCompleted: true,
            isLocked: false,
            keyTopics: ['Business income calculation', 'Deductible expenses', 'Home office deduction', 'Vehicle expenses']
          },
          {
            id: 'lesson-2-4',
            number: 4,
            title: 'Itemized Deductions - Schedule A',
            type: 'interactive',
            duration: 55,
            description: 'Comprehensive coverage of itemized deductions with decision-making guidance.',
            isCompleted: false,
            isLocked: false,
            keyTopics: ['Medical expenses', 'State and local taxes', 'Mortgage interest', 'Charitable contributions']
          },
          {
            id: 'lesson-2-5',
            number: 5,
            title: 'Capital Gains and Losses - Schedule D',
            type: 'video',
            duration: 70,
            description: 'Complex topic of capital gains/losses with wash sale rules and netting procedures.',
            isCompleted: false,
            isLocked: false,
            keyTopics: ['Short vs long-term', 'Wash sale rules', 'Capital loss limitations', 'Form 8949']
          },
          {
            id: 'lesson-2-6',
            number: 6,
            title: 'Tax Credits - Child, EITC, Education',
            type: 'interactive',
            duration: 45,
            description: 'Major individual tax credits with eligibility requirements and calculations.',
            isCompleted: false,
            isLocked: false,
            keyTopics: ['Child Tax Credit', 'Earned Income Credit', 'Education credits', 'Credit limitations']
          },
          {
            id: 'lesson-2-7',
            number: 7,
            title: 'Rental Income and Expenses - Schedule E',
            type: 'video',
            duration: 60,
            description: 'Rental property reporting, passive activity rules, and depreciation calculations.',
            isCompleted: false,
            isLocked: true,
            keyTopics: ['Rental income/expenses', 'Passive activity rules', 'Depreciation', 'Real estate professional']
          },
          {
            id: 'lesson-2-8',
            number: 8,
            title: 'Alternative Minimum Tax (AMT)',
            type: 'text',
            duration: 40,
            description: 'Understanding AMT calculation, exemptions, and common preference items.',
            isCompleted: false,
            isLocked: true,
            keyTopics: ['AMT calculation', 'Preference items', 'Exemption amounts', 'Credit limitations']
          },
          {
            id: 'lesson-2-9',
            number: 9,
            title: 'Estimated Tax Payments and Penalties',
            type: 'video',
            duration: 35,
            description: 'Quarterly estimated tax requirements and penalty calculations.',
            isCompleted: false,
            isLocked: true,
            keyTopics: ['Safe harbor rules', 'Penalty calculations', 'Form 2210', 'Payment strategies']
          },
          {
            id: 'lesson-2-10',
            number: 10,
            title: 'Complex Individual Scenarios',
            type: 'interactive',
            duration: 50,
            description: 'Practice with complex individual tax returns combining multiple income sources and deductions.',
            isCompleted: false,
            isLocked: true,
            keyTopics: ['Multi-state returns', 'Complex deductions', 'Credit interactions', 'Review procedures']
          }
        ],
        finalAssessment: {
          title: 'Individual Tax Returns Comprehensive Exam',
          type: 'Practical Exam',
          duration: 120,
          passingScore: 85,
          attempts: 0,
          maxAttempts: 3,
          isUnlocked: false
        }
      }
      // Add more modules as needed
    }

    setModuleData(modules[moduleId] || null)
  }, [moduleId])

  if (!moduleData) {
    return (
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-2xl font-bold mb-2">Module Not Found</h1>
        <p className="text-gray-600 mb-6">The requested training module could not be found.</p>
        <Link href="/training/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    )
  }

  const completedLessons = moduleData.lessons.filter(lesson => lesson.isCompleted).length
  const totalLessons = moduleData.lessons.length

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Module Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {moduleData.number}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{moduleData.title}</h1>
                <p className="text-gray-600">Module {moduleData.number}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{moduleData.description}</p>
            
            {/* Module Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{completedLessons}/{totalLessons}</div>
                <div className="text-sm text-blue-500">Lessons Complete</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{moduleData.estimatedHours}h</div>
                <div className="text-sm text-green-500">Estimated Time</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{moduleData.progress}%</div>
                <div className="text-sm text-purple-500">Progress</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-orange-600">{moduleData.finalAssessment.passingScore}%</div>
                <div className="text-sm text-orange-500">Passing Score</div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mb-4 shadow-xl">
              <span className="text-2xl font-bold">{moduleData.progress}%</span>
            </div>
            <Badge variant={moduleData.progress === 100 ? "default" : "secondary"} className="text-sm">
              {moduleData.progress === 100 ? 'Complete' : 'In Progress'}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>Overall Progress</span>
            <span>{moduleData.progress}%</span>
          </div>
          <Progress value={moduleData.progress} className="h-3" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Objectives */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-green-600" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {moduleData.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Course Lessons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {moduleData.lessons.map((lesson) => (
                <div key={lesson.id} className={`p-4 rounded-xl border transition-all ${
                  lesson.isLocked 
                    ? 'border-gray-200 bg-gray-50' 
                    : lesson.isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:shadow-md cursor-pointer'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      lesson.isLocked 
                        ? 'bg-gray-200 text-gray-400'
                        : lesson.isCompleted
                          ? 'bg-green-100 text-green-600'
                          : lesson.type === 'video'
                            ? 'bg-red-100 text-red-600'
                            : lesson.type === 'interactive'
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-blue-100 text-blue-600'
                    }`}>
                      {lesson.isLocked ? (
                        <Lock className="h-6 w-6" />
                      ) : lesson.isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : lesson.type === 'video' ? (
                        <Video className="h-6 w-6" />
                      ) : lesson.type === 'interactive' ? (
                        <Brain className="h-6 w-6" />
                      ) : (
                        <FileText className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${lesson.isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
                          Lesson {lesson.number}: {lesson.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {lesson.type === 'video' ? 'Video' :
                             lesson.type === 'interactive' ? 'Interactive' :
                             lesson.type === 'text' ? 'Reading' : 'Document'}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lesson.duration}m
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm mb-2 ${lesson.isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lesson.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {lesson.keyTopics.map((topic, index) => (
                          <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                            lesson.isLocked 
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {!lesson.isLocked && (
                      <Link href={`/training/modules/${moduleId}/lessons/${lesson.number}`}>
                        <Button variant={lesson.isCompleted ? "outline" : "default"} size="sm">
                          {lesson.isCompleted ? 'Review' : 'Start'}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Final Assessment */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-purple-600" />
                Final Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{moduleData.finalAssessment.title}</h3>
                  <Badge variant={moduleData.finalAssessment.isUnlocked ? "default" : "secondary"}>
                    {moduleData.finalAssessment.isUnlocked ? 'Available' : 'Locked'}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{moduleData.finalAssessment.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{moduleData.finalAssessment.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing Score:</span>
                    <span className="font-medium">{moduleData.finalAssessment.passingScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attempts Used:</span>
                    <span className="font-medium">
                      {moduleData.finalAssessment.attempts}/{moduleData.finalAssessment.maxAttempts}
                    </span>
                  </div>
                </div>

                {moduleData.finalAssessment.isUnlocked ? (
                  <Link href={`/training/modules/${moduleId}/assessment`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      {moduleData.finalAssessment.attempts === 0 ? 'Take Assessment' : 'Retake Assessment'}
                    </Button>
                  </Link>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Complete all lessons to unlock</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card className="shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-xl font-bold mb-2">Keep Going!</h3>
                <p className="text-indigo-100 mb-4">
                  You're making excellent progress on your tax preparer journey.
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{completedLessons}/{totalLessons}</div>
                  <div className="text-sm text-indigo-100">Lessons Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="shadow-lg border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-800">
                <AlertCircle className="h-6 w-6" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 text-sm mb-4">
                Having trouble with the material? Our instructors are here to help!
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full border-orange-300 text-orange-700 hover:bg-orange-100">
                  Ask Instructor
                </Button>
                <Button variant="outline" size="sm" className="w-full border-orange-300 text-orange-700 hover:bg-orange-100">
                  Study Group
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
