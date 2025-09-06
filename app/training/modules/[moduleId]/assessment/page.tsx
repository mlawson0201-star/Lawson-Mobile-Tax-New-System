
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  FileText,
  Target,
  Brain,
  Zap,
  ChevronLeft,
  ChevronRight,
  Timer,
  BookOpen
} from 'lucide-react'

interface AssessmentQuestion {
  id: string
  questionNumber: number
  questionText: string
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'
  options?: string[]
  correctAnswer: string | string[]
  points: number
  explanation: string
  irsReference?: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
}

interface AssessmentData {
  id: string
  moduleId: string
  title: string
  description: string
  type: 'quiz' | 'exam' | 'practical'
  timeLimit: number
  passingScore: number
  maxAttempts: number
  questions: AssessmentQuestion[]
  instructions: string[]
}

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string
  
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState<{
    correct: number
    total: number
    percentage: number
    passed: boolean
    feedback: string[]
  } | null>(null)
  const [attemptNumber, setAttemptNumber] = useState(1)
  const [showInstructions, setShowInstructions] = useState(true)

  useEffect(() => {
    // Mock assessment data - in real app, fetch from database
    const assessments: Record<string, AssessmentData> = {
      '1': {
        id: 'assessment-1',
        moduleId: '1',
        title: 'Tax Law Fundamentals Comprehensive Exam',
        description: 'Test your knowledge of federal tax law, IRS procedures, and professional standards.',
        type: 'exam',
        timeLimit: 75,
        passingScore: 85,
        maxAttempts: 3,
        instructions: [
          'This exam consists of 25 questions covering all Module 1 topics',
          'You have 75 minutes to complete the assessment',
          'A score of 85% or higher is required to pass',
          'You may take this exam up to 3 times',
          'Review all questions before submitting - you cannot change answers after submission',
          'Keep IRS publications and tax code references handy for complex questions'
        ],
        questions: [
          {
            id: 'q1',
            questionNumber: 1,
            questionText: 'Which Constitutional Amendment authorized the federal income tax?',
            type: 'multiple_choice',
            options: ['14th Amendment', '15th Amendment', '16th Amendment', '17th Amendment'],
            correctAnswer: '16th Amendment',
            points: 2,
            explanation: 'The 16th Amendment, ratified in 1913, gave Congress the power to lay and collect taxes on incomes from whatever source derived.',
            irsReference: 'Constitutional Amendment XVI',
            difficulty: 'basic'
          },
          {
            id: 'q2',
            questionNumber: 2,
            questionText: 'In the hierarchy of tax law authority, which source has the highest precedential value?',
            type: 'multiple_choice',
            options: [
              'Treasury Regulations',
              'Internal Revenue Code',
              'Revenue Rulings',
              'Tax Court Decisions'
            ],
            correctAnswer: 'Internal Revenue Code',
            points: 3,
            explanation: 'The Internal Revenue Code, as enacted by Congress, is the actual tax law and has the highest authority in the tax law hierarchy.',
            irsReference: 'IRC Structure',
            difficulty: 'intermediate'
          },
          {
            id: 'q3',
            questionNumber: 3,
            questionText: 'A taxpayer must use the accrual method of accounting if they are a C corporation with average annual gross receipts exceeding $27 million for the prior 3-year period.',
            type: 'true_false',
            correctAnswer: 'true',
            points: 2,
            explanation: 'Under Section 448, C corporations that exceed the $27 million gross receipts test must use the accrual method of accounting.',
            irsReference: 'IRC Section 448',
            difficulty: 'intermediate'
          },
          {
            id: 'q4',
            questionNumber: 4,
            questionText: 'List three key components of the Taxpayer Bill of Rights that tax preparers should understand when representing clients.',
            type: 'short_answer',
            correctAnswer: ['Right to be informed', 'Right to quality service', 'Right to pay no more than the correct amount'],
            points: 4,
            explanation: 'The Taxpayer Bill of Rights includes 10 fundamental rights. Key ones for preparers include the right to be informed, right to quality service, right to pay no more than correct amount, right to challenge IRS position, and right to finality.',
            irsReference: 'IRS Pub 1',
            difficulty: 'advanced'
          },
          {
            id: 'q5',
            questionNumber: 5,
            questionText: 'What form is required to request a change in accounting method, and what are the two main procedures available?',
            type: 'short_answer',
            correctAnswer: ['Form 3115', 'Automatic consent procedure', 'Advance consent procedure'],
            points: 3,
            explanation: 'Form 3115 (Application for Change in Accounting Method) is required. The two procedures are automatic consent (no fee, specific requirements) and advance consent (user fee required, broader changes).',
            irsReference: 'Form 3115 Instructions',
            difficulty: 'advanced'
          },
          {
            id: 'q6',
            questionNumber: 6,
            questionText: 'According to Circular 230, what is the standard of due diligence required for tax return preparers?',
            type: 'multiple_choice',
            options: [
              'Reasonable care and competence',
              'Best efforts standard',
              'Absolute accuracy requirement',
              'Industry standard practices'
            ],
            correctAnswer: 'Reasonable care and competence',
            points: 3,
            explanation: 'Circular 230 requires tax preparers to exercise reasonable care and competence in preparing returns and advising clients.',
            irsReference: 'Circular 230 Section 10.22',
            difficulty: 'intermediate'
          },
          {
            id: 'q7',
            questionNumber: 7,
            questionText: 'The cash method of accounting reports income when received and deductions when paid, regardless of when earned or incurred.',
            type: 'true_false',
            correctAnswer: 'true',
            points: 2,
            explanation: 'The cash method is based on actual receipt of income and actual payment of expenses, not when earned or incurred (which would be accrual method).',
            irsReference: 'IRS Pub 538',
            difficulty: 'basic'
          },
          {
            id: 'q8',
            questionNumber: 8,
            questionText: 'Which IRS operating division primarily handles individual taxpayer issues and examinations?',
            type: 'multiple_choice',
            options: [
              'Small Business/Self-Employed (SB/SE)',
              'Wage and Investment (W&I)',
              'Large Business and International (LB&I)',
              'Tax Exempt and Government Entities (TE/GE)'
            ],
            correctAnswer: 'Wage and Investment (W&I)',
            points: 2,
            explanation: 'The Wage and Investment Division handles individual taxpayers with wage and investment income, including most Form 1040 filers.',
            irsReference: 'IRS Organization Structure',
            difficulty: 'basic'
          },
          {
            id: 'q9',
            questionNumber: 9,
            questionText: 'Explain the concept of "constructive receipt" under the cash method of accounting and provide an example.',
            type: 'essay',
            correctAnswer: ['Income is constructively received when available without restriction', 'Example: paycheck received but not cashed'],
            points: 5,
            explanation: 'Constructive receipt means income is available to the taxpayer without substantial limitations or restrictions, even if not actually received. Example: A paycheck received on Dec 31 but not deposited until January is still taxable in December.',
            irsReference: 'Treas. Reg. 1.451-2',
            difficulty: 'advanced'
          },
          {
            id: 'q10',
            questionNumber: 10,
            questionText: 'What is the primary purpose of Section 481(a) adjustments when changing accounting methods?',
            type: 'multiple_choice',
            options: [
              'To calculate the additional tax due',
              'To prevent omission or duplication of income/expenses',
              'To determine the user fee required',
              'To establish the effective date of change'
            ],
            correctAnswer: 'To prevent omission or duplication of income/expenses',
            points: 3,
            explanation: 'Section 481(a) adjustments ensure that items are not omitted from income or deducted twice when changing accounting methods.',
            irsReference: 'IRC Section 481(a)',
            difficulty: 'advanced'
          }
        ]
      },
      '2': {
        id: 'assessment-2',
        moduleId: '2',
        title: 'Individual Tax Returns Comprehensive Exam',
        description: 'Practical examination of Form 1040 preparation and individual tax scenarios.',
        type: 'practical',
        timeLimit: 120,
        passingScore: 85,
        maxAttempts: 3,
        instructions: [
          'This practical exam tests your ability to prepare individual tax returns',
          'You have 2 hours to complete the assessment',
          'A score of 85% or higher is required to pass',
          'Use tax forms and calculators as needed',
          'Focus on accuracy in calculations and proper form completion'
        ],
        questions: [
          {
            id: 'q2-1',
            questionNumber: 1,
            questionText: 'What is the 2023 standard deduction amount for a married couple filing jointly where both spouses are under age 65?',
            type: 'multiple_choice',
            options: ['$25,900', '$27,700', '$29,200', '$30,700'],
            correctAnswer: '$27,700',
            points: 2,
            explanation: 'For tax year 2023, the standard deduction for married filing jointly is $27,700.',
            irsReference: 'Rev. Proc. 2022-38',
            difficulty: 'basic'
          },
          {
            id: 'q2-2',
            questionNumber: 2,
            questionText: 'A taxpayer received a Form 1099-INT showing $850 in interest income. However, $50 was a penalty for early withdrawal of a CD. How should this be reported on Form 1040?',
            type: 'multiple_choice',
            options: [
              'Report $850 on Schedule B, no deduction',
              'Report $800 as interest income',
              'Report $850 on Schedule B, deduct $50 on Schedule 1',
              'Report $850 as other income'
            ],
            correctAnswer: 'Report $850 on Schedule B, deduct $50 on Schedule 1',
            points: 3,
            explanation: 'Report the full amount of interest shown on 1099-INT, then claim the early withdrawal penalty as an above-the-line deduction on Schedule 1.',
            irsReference: 'Form 1040 Instructions',
            difficulty: 'intermediate'
          }
        ]
      }
    }

    const assessment = assessments[moduleId]
    if (assessment) {
      setAssessmentData(assessment)
      setTimeRemaining(assessment.timeLimit * 60) // Convert minutes to seconds
    }
  }, [moduleId])

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStarted && !isSubmitted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit() // Auto-submit when time runs out
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStarted, isSubmitted, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartAssessment = () => {
    setIsStarted(true)
    setShowInstructions(false)
  }

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const handleSubmit = () => {
    if (!assessmentData) return

    // Calculate score
    let correctAnswers = 0
    const feedback: string[] = []
    let totalPoints = 0
    let earnedPoints = 0

    assessmentData.questions.forEach((question, index) => {
      totalPoints += question.points
      const userAnswer = answers[index]

      if (Array.isArray(question.correctAnswer)) {
        // For short answer/essay questions, simplified checking
        const isCorrect = question.correctAnswer.some(correct => 
          userAnswer?.toLowerCase().includes(correct.toLowerCase())
        )
        if (isCorrect) {
          correctAnswers++
          earnedPoints += question.points
          feedback.push(`Question ${question.questionNumber}: Correct! ${question.explanation}`)
        } else {
          feedback.push(`Question ${question.questionNumber}: Needs improvement. ${question.explanation}`)
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++
          earnedPoints += question.points
          feedback.push(`Question ${question.questionNumber}: Correct! ${question.explanation}`)
        } else {
          feedback.push(`Question ${question.questionNumber}: Incorrect. Correct answer: ${question.correctAnswer}. ${question.explanation}`)
        }
      }
    })

    const percentage = Math.round((earnedPoints / totalPoints) * 100)
    const passed = percentage >= assessmentData.passingScore

    setScore({
      correct: correctAnswers,
      total: assessmentData.questions.length,
      percentage,
      passed,
      feedback
    })
    setIsSubmitted(true)
  }

  const handleRetake = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setIsStarted(false)
    setIsSubmitted(false)
    setScore(null)
    setShowInstructions(true)
    setAttemptNumber(prev => prev + 1)
    if (assessmentData) {
      setTimeRemaining(assessmentData.timeLimit * 60)
    }
  }

  if (!assessmentData) {
    return (
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h1 className="text-2xl font-bold mb-2">Assessment Not Found</h1>
        <p className="text-gray-600 mb-6">The requested assessment could not be found.</p>
        <Link href={`/training/modules/${moduleId}`}>
          <Button>Back to Module</Button>
        </Link>
      </div>
    )
  }

  if (showInstructions && !isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href={`/training/modules/${moduleId}`}>
              <Button variant="ghost" className="mb-4">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Module
              </Button>
            </Link>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{assessmentData.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{assessmentData.description}</p>
            </div>
          </div>

          {/* Assessment Info */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="h-7 w-7 text-purple-600" />
                Assessment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center bg-blue-50 rounded-xl p-4">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">{assessmentData.timeLimit}m</div>
                  <div className="text-sm text-blue-600">Time Limit</div>
                </div>
                <div className="text-center bg-green-50 rounded-xl p-4">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">{assessmentData.passingScore}%</div>
                  <div className="text-sm text-green-600">Passing Score</div>
                </div>
                <div className="text-center bg-orange-50 rounded-xl p-4">
                  <RotateCcw className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-800">{assessmentData.maxAttempts}</div>
                  <div className="text-sm text-orange-600">Max Attempts</div>
                </div>
                <div className="text-center bg-purple-50 rounded-xl p-4">
                  <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-800">{assessmentData.questions.length}</div>
                  <div className="text-sm text-purple-600">Questions</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-bold text-yellow-800">Important Instructions</h3>
                </div>
                <ul className="space-y-2 text-yellow-800">
                  {assessmentData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-800 mb-2">Attempt Information</h3>
                <p className="text-blue-700">
                  This is attempt <strong>{attemptNumber}</strong> of {assessmentData.maxAttempts} maximum attempts.
                </p>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleStartAssessment}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-bold rounded-xl shadow-xl"
                >
                  <Zap className="h-6 w-6 mr-3" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSubmitted && score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              score.passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {score.passed ? (
                <CheckCircle className="h-12 w-12 text-green-600" />
              ) : (
                <XCircle className="h-12 w-12 text-red-600" />
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {score.passed ? 'Congratulations!' : 'Assessment Incomplete'}
            </h1>
            <p className="text-xl text-gray-600">
              {score.passed 
                ? 'You have successfully completed the assessment!' 
                : 'You need to retake the assessment to pass.'}
            </p>
          </div>

          {/* Score Card */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className={`text-6xl font-bold mb-2 ${score.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {score.percentage}%
                  </div>
                  <div className="text-lg font-semibold text-gray-700">Final Score</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {score.correct}/{score.total}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">Correct Answers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {assessmentData.passingScore}%
                  </div>
                  <div className="text-lg font-semibold text-gray-700">Required to Pass</div>
                </div>
              </div>

              <div className="mt-8">
                <Progress 
                  value={score.percentage} 
                  className="h-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0%</span>
                  <span className="font-semibold">Passing: {assessmentData.passingScore}%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {score.feedback.map((feedback, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">{feedback}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {score.passed ? (
                  <>
                    <Link href={`/training/modules/${moduleId}`}>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Continue to Next Module
                      </Button>
                    </Link>
                    <Link href="/training/certificates">
                      <Button variant="outline" size="lg">
                        <Award className="h-5 w-5 mr-2" />
                        View Certificate
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {attemptNumber < assessmentData.maxAttempts ? (
                      <Button onClick={handleRetake} size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Retake Assessment (Attempt {attemptNumber + 1}/{assessmentData.maxAttempts})
                      </Button>
                    ) : (
                      <div className="text-center">
                        <p className="text-red-600 font-semibold mb-4">
                          Maximum attempts reached. Please contact your instructor for assistance.
                        </p>
                        <Button variant="outline">Contact Instructor</Button>
                      </div>
                    )}
                    <Link href={`/training/modules/${moduleId}`}>
                      <Button variant="outline" size="lg">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Review Module Content
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Assessment in progress
  const currentQ = assessmentData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessmentData.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header with timer */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">{assessmentData.title}</h1>
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {assessmentData.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-lg">
                <Timer className={`h-5 w-5 ${timeRemaining < 300 ? 'text-red-500' : 'text-blue-500'}`} />
                <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-500' : 'text-gray-700'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Question {currentQuestion + 1}
                  <Badge variant="outline" className="ml-3">
                    {currentQ.points} point{currentQ.points !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {currentQ.difficulty}
                  </Badge>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-8">
                <p className="text-lg leading-relaxed text-gray-800 mb-6">
                  {currentQ.questionText}
                </p>

                {currentQ.irsReference && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>Reference:</strong> {currentQ.irsReference}
                    </p>
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {currentQ.type === 'multiple_choice' && currentQ.options && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option}
                          checked={answers[currentQuestion] === option}
                          onChange={() => handleAnswer(currentQuestion, option)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQ.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value="true"
                        checked={answers[currentQuestion] === 'true'}
                        onChange={() => handleAnswer(currentQuestion, 'true')}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-xl font-semibold text-green-700">True</span>
                    </label>
                    <label className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value="false"
                        checked={answers[currentQuestion] === 'false'}
                        onChange={() => handleAnswer(currentQuestion, 'false')}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-xl font-semibold text-red-700">False</span>
                    </label>
                  </div>
                )}

                {(currentQ.type === 'short_answer' || currentQ.type === 'essay') && (
                  <textarea
                    value={answers[currentQuestion] || ''}
                    onChange={(e) => handleAnswer(currentQuestion, e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-lg"
                    rows={currentQ.type === 'essay' ? 8 : 4}
                    placeholder={currentQ.type === 'essay' ? 'Provide a detailed explanation...' : 'Enter your answer...'}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentQuestion === assessmentData.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-8"
                    disabled={Object.keys(answers).length !== assessmentData.questions.length}
                  >
                    Submit Assessment
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(prev => Math.min(assessmentData.questions.length - 1, prev + 1))}
                    disabled={!answers[currentQuestion]}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Question Navigation */}
          <Card className="mt-6 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Question Overview</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {assessmentData.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-12 h-12 rounded-lg font-bold text-sm border-2 transition-all ${
                      index === currentQuestion
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : answers[index]
                          ? 'bg-green-100 border-green-300 text-green-700'
                          : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
