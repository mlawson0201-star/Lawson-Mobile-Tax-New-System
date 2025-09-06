
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import VideoPlayer from '../../../../video-player'
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  PauseCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Target,
  Lightbulb,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'

interface LessonContent {
  id: string
  moduleId: string
  lessonNumber: number
  title: string
  type: 'video' | 'text' | 'interactive' | 'document'
  duration: number
  description: string
  videoUrl?: string
  textContent?: string
  interactiveElements?: any[]
  keyTakeaways: string[]
  practiceQuestions: {
    question: string
    options?: string[]
    correctAnswer: string
    explanation: string
  }[]
  resources: {
    title: string
    type: 'pdf' | 'link' | 'form'
    url: string
  }[]
  nextLesson?: {
    moduleId: string
    lessonId: string
    title: string
  }
  previousLesson?: {
    moduleId: string
    lessonId: string
    title: string
  }
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string
  const lessonId = params.lessonId as string

  const [lessonData, setLessonData] = useState<LessonContent | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showPracticeQuestions, setShowPracticeQuestions] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isLessonComplete, setIsLessonComplete] = useState(false)

  useEffect(() => {
    // Mock lesson data - in real app, fetch from database
    const lessons: Record<string, Record<string, LessonContent>> = {
      '1': {
        '1': {
          id: 'lesson-1-1',
          moduleId: '1',
          lessonNumber: 1,
          title: 'Introduction to Federal Tax System',
          type: 'video',
          duration: 45,
          description: 'Comprehensive overview of the U.S. federal tax system, including history, structure, and key principles.',
          videoUrl: '/training/videos/module1-lesson1.mp4',
          keyTakeaways: [
            'Federal income tax is authorized by the 16th Amendment to the Constitution',
            'The Internal Revenue Code is organized into subtitles, chapters, and sections',
            'The IRS has the authority to interpret and enforce federal tax laws',
            'Tax preparers must understand the hierarchy of tax law authority'
          ],
          practiceQuestions: [
            {
              question: 'Which Amendment to the Constitution authorized the federal income tax?',
              options: ['14th Amendment', '15th Amendment', '16th Amendment', '17th Amendment'],
              correctAnswer: '16th Amendment',
              explanation: 'The 16th Amendment, ratified in 1913, gave Congress the power to lay and collect taxes on incomes.'
            },
            {
              question: 'What is the highest authority in federal tax law?',
              options: ['IRS Regulations', 'Internal Revenue Code', 'Revenue Rulings', 'Tax Court Cases'],
              correctAnswer: 'Internal Revenue Code',
              explanation: 'The Internal Revenue Code, as passed by Congress, is the highest authority in federal tax law.'
            }
          ],
          resources: [
            {
              title: 'IRS Publication 1 - Your Rights as a Taxpayer',
              type: 'pdf',
              url: '/training/resources/pub1.pdf'
            },
            {
              title: 'Constitutional Amendment XVI',
              type: 'link', 
              url: 'https://www.archives.gov/founding-docs/amendments-11-27#toc-amendment-xvi--16'
            },
            {
              title: 'Internal Revenue Code Structure Guide',
              type: 'pdf',
              url: '/training/resources/irc-structure.pdf'
            }
          ],
          nextLesson: {
            moduleId: '1',
            lessonId: '2',
            title: 'IRS Organization and Procedures'
          }
        },
        '2': {
          id: 'lesson-1-2',
          moduleId: '1',
          lessonNumber: 2,
          title: 'IRS Organization and Procedures',
          type: 'video',
          duration: 40,
          description: 'Understanding how the IRS operates, taxpayer rights, examination procedures, and appeals process.',
          videoUrl: '/training/videos/module1-lesson2.mp4',
          keyTakeaways: [
            'The IRS is organized into operating divisions serving different taxpayer segments',
            'Taxpayers have specific rights outlined in the Taxpayer Bill of Rights',
            'IRS examinations follow established procedures with specific timelines',
            'Taxpayers have the right to appeal IRS decisions through the Office of Appeals'
          ],
          practiceQuestions: [
            {
              question: 'How many rights are included in the Taxpayer Bill of Rights?',
              options: ['8 rights', '10 rights', '12 rights', '15 rights'],
              correctAnswer: '10 rights',
              explanation: 'The Taxpayer Bill of Rights includes 10 fundamental rights that every taxpayer has when dealing with the IRS.'
            }
          ],
          resources: [
            {
              title: 'Taxpayer Bill of Rights',
              type: 'pdf',
              url: '/training/resources/taxpayer-bill-rights.pdf'
            },
            {
              title: 'IRS Organization Chart',
              type: 'pdf',
              url: '/training/resources/irs-org-chart.pdf'
            }
          ],
          previousLesson: {
            moduleId: '1',
            lessonId: '1',
            title: 'Introduction to Federal Tax System'
          },
          nextLesson: {
            moduleId: '1',
            lessonId: '3',
            title: 'Tax Year and Accounting Methods'
          }
        },
        '3': {
          id: 'lesson-1-3',
          moduleId: '1',
          lessonNumber: 3,
          title: 'Tax Year and Accounting Methods',
          type: 'text',
          duration: 30,
          description: 'Deep dive into tax year elections and accounting method requirements for different taxpayer types.',
          textContent: `
# Tax Year and Accounting Methods

## Understanding Tax Years

A **tax year** is the annual accounting period for keeping records and reporting income and expenses. Understanding tax year rules is crucial for proper tax preparation.

### Types of Tax Years

#### Calendar Year
- Runs from January 1 through December 31
- Most common for individual taxpayers
- Required for individuals unless they keep books and records on a fiscal year basis

#### Fiscal Year
- Any 12-month period ending on the last day of any month except December
- Must be consistently used
- Common for businesses to align with their operational cycle

#### 52-53 Week Year
- Special tax year that varies between 52 and 53 weeks
- Always ends on the same day of the week
- Used by some businesses for operational convenience

## Accounting Methods

The accounting method determines **when** you report income and deductions. This is fundamental to accurate tax preparation.

### Cash Method
The cash method is the most straightforward:

- **Income**: Reported when actually or constructively received
- **Deductions**: Claimed when actually paid
- **Who Can Use It**: 
  - Most individuals
  - Businesses with average annual gross receipts of $27 million or less (for prior 3 years)
  - Personal service corporations

**Example**: If you receive a paycheck dated December 31, 2023, but don't cash it until January 2, 2024, it's still 2023 income because it was constructively received.

### Accrual Method
The accrual method matches income and expenses:

- **Income**: Reported when earned, regardless of when payment is received
- **Expenses**: Deducted when incurred, regardless of when payment is made
- **Who Must Use It**: 
  - C corporations with average annual gross receipts over $27 million
  - Partnerships with C corporation partners (gross receipts test)
  - Tax shelters

**Example**: You complete work in December 2023 and bill the client, but don't receive payment until February 2024. Under accrual method, this is 2023 income.

### Hybrid Method
- Combination of cash and accrual methods
- Must be used consistently 
- Must clearly reflect income
- Different methods can be used for different activities

## Key Rules and Considerations

### Consistency Requirement
- Must use the same method from year to year
- Changes require IRS permission (Form 3115)
- Method must clearly reflect income

### Special Rules for Inventory
- Businesses with inventory generally must use accrual method
- Exception: Small businesses under $27 million gross receipts test
- Can treat inventory as non-incidental materials and supplies

### Section 448 Limitations
Certain entities cannot use the cash method:
- C corporations (with exceptions)
- Partnerships with C corporation partners
- Tax shelters

## Form 3115 - Application for Change in Accounting Method

When a taxpayer needs to change accounting methods:

### Automatic Consent Procedures
- Many changes qualify for automatic consent
- No user fee required
- File with current year return
- Must meet specific requirements

### Advance Consent Procedures  
- Required for changes not covered by automatic procedures
- User fee required ($1,500 for most taxpayers)
- File before the tax year of change
- More complex approval process

### Section 481(a) Adjustment
- Prevents income/expense omission or duplication
- Can be positive (increase income) or negative (decrease income)
- May be spread over 4 years if positive and over $3,000

## Practical Applications

### Tax Preparer Considerations

When preparing returns, always:
1. **Identify the taxpayer's tax year** - Don't assume calendar year
2. **Determine the correct accounting method** - Check prior returns and business records
3. **Apply the method consistently** - Flag potential method changes
4. **Consider the gross receipts test** - May affect method requirements
5. **Document unusual situations** - Support your position with proper authorities

### Common Mistakes to Avoid

❌ **Assuming all taxpayers use calendar year**
❌ **Mixing accounting methods incorrectly**
❌ **Failing to recognize required method changes**
❌ **Ignoring the gross receipts test**
❌ **Not considering Section 481(a) adjustments**

✅ **Verify tax year on prior returns**
✅ **Confirm accounting method consistency**
✅ **Apply gross receipts test when relevant**
✅ **Properly handle method changes**
✅ **Maintain detailed workpapers**

## Summary

Tax year and accounting method rules form the foundation of tax compliance. As a tax preparer, you must understand these concepts thoroughly to ensure accurate return preparation and avoid costly mistakes for your clients.

**Key Takeaway**: The timing of income and deduction recognition can significantly impact tax liability, making proper understanding of these rules essential for professional tax preparation.
          `,
          keyTakeaways: [
            'Most individuals use the calendar year, but businesses may choose fiscal years',
            'Cash method reports income when received and deductions when paid',
            'Accrual method matches income and expenses to the period they relate to',
            'The $27 million gross receipts test determines which accounting methods are available',
            'Form 3115 is required to change accounting methods'
          ],
          practiceQuestions: [
            {
              question: 'A sole proprietor has gross receipts of $30 million. Can they use the cash method?',
              options: ['Yes, always', 'No, must use accrual', 'Yes, if they meet the 3-year average test', 'Only with IRS permission'],
              correctAnswer: 'Yes, if they meet the 3-year average test',
              explanation: 'The gross receipts test looks at the average for the prior 3 years. If the 3-year average is $27 million or less, cash method can be used.'
            },
            {
              question: 'What form is used to request a change in accounting method?',
              options: ['Form 2848', 'Form 3115', 'Form 4868', 'Form 8275'],
              correctAnswer: 'Form 3115',
              explanation: 'Form 3115 (Application for Change in Accounting Method) is used to request changes in accounting method.'
            }
          ],
          resources: [
            {
              title: 'Form 3115 Instructions',
              type: 'pdf',
              url: '/training/resources/f3115-instructions.pdf'
            },
            {
              title: 'Rev. Proc. 2023-24 (Automatic Consent)',
              type: 'pdf', 
              url: '/training/resources/revproc-2023-24.pdf'
            },
            {
              title: 'Section 448 Overview',
              type: 'pdf',
              url: '/training/resources/section-448.pdf'
            }
          ],
          previousLesson: {
            moduleId: '1',
            lessonId: '2',
            title: 'IRS Organization and Procedures'
          },
          nextLesson: {
            moduleId: '1',
            lessonId: '4',
            title: 'Internal Revenue Code Structure'
          }
        }
      },
      '2': {
        '1': {
          id: 'lesson-2-1',
          moduleId: '2',
          lessonNumber: 1,
          title: 'Form 1040 Overview and Filing Requirements',
          type: 'video',
          duration: 50,
          description: 'Comprehensive walkthrough of Form 1040, filing requirements, and status determinations.',
          videoUrl: '/training/videos/module2-lesson1.mp4',
          keyTakeaways: [
            'Filing requirements depend on income level, age, and filing status',
            'Filing status affects standard deduction amounts and tax brackets',
            'Form 1040 is the main form for individual income tax returns',
            'Proper filing status determination is crucial for accurate tax calculation'
          ],
          practiceQuestions: [
            {
              question: 'What is the 2023 standard deduction for a married couple filing jointly?',
              options: ['$25,900', '$27,700', '$29,200', '$30,700'],
              correctAnswer: '$27,700',
              explanation: 'For 2023, the standard deduction for married filing jointly is $27,700.'
            }
          ],
          resources: [
            {
              title: '2023 Form 1040 Instructions',
              type: 'pdf',
              url: '/training/resources/f1040-instructions-2023.pdf'
            },
            {
              title: 'Filing Requirements Chart',
              type: 'pdf',
              url: '/training/resources/filing-requirements-2023.pdf'
            }
          ],
          nextLesson: {
            moduleId: '2',
            lessonId: '2',
            title: 'Income Reporting - Wages, Interest, Dividends'
          }
        }
      }
    }

    const lesson = lessons[moduleId]?.[lessonId]
    setLessonData(lesson || null)
  }, [moduleId, lessonId])

  const handleLessonComplete = async () => {
    // Mark lesson as complete in database
    setIsLessonComplete(true)
    // Could redirect to next lesson or back to module overview
  }

  const handlePracticeQuestion = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const checkPracticeAnswers = () => {
    setShowResults(true)
  }

  if (!lessonData) {
    return (
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
        <p className="text-gray-600 mb-6">The requested lesson could not be found.</p>
        <Link href={`/training/modules/${moduleId}`}>
          <Button>Back to Module</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/training/modules/${moduleId}`}>
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Module
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Lesson {lessonData.lessonNumber}: {lessonData.title}
                </h1>
                <p className="text-sm text-gray-500">Module {moduleId}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lessonData.duration}m
              </Badge>
              {isLessonComplete && (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg mb-8">
              {/* Video Content */}
              {lessonData.type === 'video' && (
                <div className="mb-6">
                  {lessonData.videoUrl ? (
                    <VideoPlayer
                      videoUrl={lessonData.videoUrl}
                      title={lessonData.title}
                      duration={lessonData.duration}
                      onProgress={(progress) => {
                        // Update lesson progress
                        if (progress > 80 && !isLessonComplete) {
                          setIsLessonComplete(true)
                          toast.success('Lesson completed! Well done!')
                        }
                      }}
                      onComplete={() => {
                        setIsLessonComplete(true)
                        toast.success('Lesson completed! You can now move to the next lesson.')
                      }}
                    />
                  ) : (
                    /* Fallback for missing video */
                    <div className="w-full h-96 bg-gray-900 rounded-lg relative overflow-hidden flex items-center justify-center">
                      <div className="text-center text-white">
                        <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-semibold">{lessonData.title}</p>
                        <p className="text-sm opacity-80">{lessonData.duration} minutes</p>
                        <p className="text-xs opacity-60 mt-2">Video content will be available soon</p>
                        <Button
                          className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                          onClick={() => {
                            setIsLessonComplete(true)
                            toast.success('Lesson marked as complete!')
                          }}
                        >
                          Mark as Complete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text Content */}
              {lessonData.type === 'text' && lessonData.textContent && (
                <CardContent className="p-8">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: lessonData.textContent
                        .replace(/\n/g, '<br>')
                        .replace(/# (.*)/g, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h1>')
                        .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-gray-800 mt-6 mb-3">$2</h2>')
                        .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-gray-700 mt-4 mb-2">$3</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                        .replace(/❌ \*\*(.*?)\*\*/g, '<div class="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded mb-2">❌ <strong>$1</strong></div>')
                        .replace(/✅ \*\*(.*?)\*\*/g, '<div class="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded mb-2">✅ <strong>$1</strong></div>')
                    }}
                  />
                </CardContent>
              )}

              {/* Interactive Content */}
              {lessonData.type === 'interactive' && (
                <CardContent className="p-8">
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Interactive Exercise</h3>
                    <p className="text-gray-600 mb-6">
                      This lesson includes hands-on interactive exercises and simulations.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Launch Interactive Content
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Key Takeaways */}
            <Card className="shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {lessonData.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Practice Questions */}
            {lessonData.practiceQuestions.length > 0 && (
              <Card className="shadow-lg mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-blue-500" />
                      Practice Questions
                    </CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setShowPracticeQuestions(!showPracticeQuestions)}
                    >
                      {showPracticeQuestions ? 'Hide' : 'Show'} Questions
                    </Button>
                  </div>
                </CardHeader>
                
                {showPracticeQuestions && (
                  <CardContent>
                    <div className="space-y-6">
                      {lessonData.practiceQuestions.map((question, questionIndex) => (
                        <div key={questionIndex} className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-4">
                            Question {questionIndex + 1}: {question.question}
                          </h3>
                          
                          {question.options && (
                            <div className="space-y-2 mb-4">
                              {question.options.map((option, optionIndex) => (
                                <label key={optionIndex} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                  <input
                                    type="radio"
                                    name={`question-${questionIndex}`}
                                    value={option}
                                    checked={selectedAnswers[questionIndex] === option}
                                    onChange={() => handlePracticeQuestion(questionIndex, option)}
                                    className="w-4 h-4"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          
                          {showResults && selectedAnswers[questionIndex] && (
                            <div className={`mt-4 p-3 rounded-lg ${
                              selectedAnswers[questionIndex] === question.correctAnswer
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className={`h-5 w-5 ${
                                  selectedAnswers[questionIndex] === question.correctAnswer
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`} />
                                <span className={`font-semibold ${
                                  selectedAnswers[questionIndex] === question.correctAnswer
                                    ? 'text-green-800'
                                    : 'text-red-800'
                                }`}>
                                  {selectedAnswers[questionIndex] === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {!showResults && Object.keys(selectedAnswers).length === lessonData.practiceQuestions.length && (
                        <Button onClick={checkPracticeAnswers} className="w-full">
                          Check Answers
                        </Button>
                      )}
                      
                      {showResults && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSelectedAnswers({})
                            setShowResults(false)
                          }}
                          className="w-full"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Try Again
                        </Button>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {/* Navigation */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    {lessonData.previousLesson ? (
                      <Link href={`/training/modules/${lessonData.previousLesson.moduleId}/lessons/${lessonData.previousLesson.lessonId}`}>
                        <Button variant="outline">
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Previous: {lessonData.previousLesson.title}
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/training/modules/${moduleId}`}>
                        <Button variant="outline">
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Back to Module
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleLessonComplete}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isLessonComplete}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isLessonComplete ? 'Completed' : 'Mark Complete'}
                    </Button>
                    
                    {lessonData.nextLesson ? (
                      <Link href={`/training/modules/${lessonData.nextLesson.moduleId}/lessons/${lessonData.nextLesson.lessonId}`}>
                        <Button>
                          Next: {lessonData.nextLesson.title}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/training/modules/${moduleId}/assessment`}>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Take Module Assessment
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Lesson Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <Badge variant="outline">
                    {lessonData.type === 'video' ? 'Video' :
                     lessonData.type === 'interactive' ? 'Interactive' :
                     lessonData.type === 'text' ? 'Reading' : 'Document'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{lessonData.duration} minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={isLessonComplete ? "default" : "secondary"}>
                    {isLessonComplete ? 'Complete' : 'In Progress'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lessonData.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                    >
                      {resource.type === 'pdf' ? (
                        <Download className="h-4 w-4 text-red-500" />
                      ) : (
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{resource.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-lg font-bold mb-2">Great Progress!</h3>
                  <p className="text-blue-100 text-sm">
                    You're building expertise that will serve your clients well.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
