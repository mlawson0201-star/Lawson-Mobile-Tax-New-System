
// Training System Utility Functions

export interface StudentProgress {
  enrollmentId: string
  moduleId: string
  lessonId?: string
  completionStatus: 'not_started' | 'in_progress' | 'completed'
  timeSpentMinutes: number
  lastAccessDate: Date
}

export interface AssessmentResult {
  assessmentId: string
  score: number
  maxScore: number
  passed: boolean
  attemptNumber: number
  completedAt: Date
  answers: Record<string, any>
}

export interface CertificateData {
  id: string
  studentId: string
  programId: string
  moduleId?: string
  certificateType: 'module' | 'program' | 'specialization'
  certificateNumber: string
  issuedDate: Date
  verificationCode: string
  digitalBadgeUrl?: string
}

// Progress Calculation
export const calculateModuleProgress = (lessons: any[], progress: StudentProgress[]): number => {
  if (lessons.length === 0) return 0
  
  const completedLessons = progress.filter(p => p.completionStatus === 'completed').length
  return Math.round((completedLessons / lessons.length) * 100)
}

export const calculateOverallProgress = (modules: any[], allProgress: StudentProgress[]): number => {
  if (modules.length === 0) return 0
  
  const totalLessons = modules.reduce((total, module) => total + (module.lessons?.length || 0), 0)
  const completedLessons = allProgress.filter(p => p.completionStatus === 'completed').length
  
  return Math.round((completedLessons / totalLessons) * 100)
}

// Certificate Generation
export const generateCertificateNumber = (type: string, moduleNumber?: number): string => {
  const prefix = type === 'module' ? 'LMT-MOD' : type === 'program' ? 'LMT-PROG' : 'LMT-SPEC'
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  
  if (moduleNumber) {
    return `${prefix}-${moduleNumber.toString().padStart(2, '0')}-${year}-${random}`
  }
  
  return `${prefix}-${year}-${random}`
}

export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 12).toUpperCase()
}

// Assessment Scoring
export const calculateAssessmentScore = (
  questions: any[],
  answers: Record<string, string>
): { score: number; maxScore: number; percentage: number; details: any[] } => {
  let earnedPoints = 0
  let totalPoints = 0
  const details: any[] = []

  questions.forEach((question, index) => {
    totalPoints += question.points
    const userAnswer = answers[index.toString()]
    let isCorrect = false

    if (Array.isArray(question.correctAnswer)) {
      // For short answer/essay questions
      isCorrect = question.correctAnswer.some((correct: string) =>
        userAnswer?.toLowerCase().includes(correct.toLowerCase())
      )
    } else {
      isCorrect = userAnswer === question.correctAnswer
    }

    if (isCorrect) {
      earnedPoints += question.points
    }

    details.push({
      questionId: question.id,
      correct: isCorrect,
      userAnswer,
      correctAnswer: question.correctAnswer,
      points: isCorrect ? question.points : 0,
      explanation: question.explanation
    })
  })

  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0

  return {
    score: earnedPoints,
    maxScore: totalPoints,
    percentage,
    details
  }
}

// Time Formatting
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${remainingMinutes}m`
}

export const formatStudyTime = (totalMinutes: number): string => {
  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`
  }
  
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  if (hours === 1) {
    return minutes > 0 ? `1 hour ${minutes} minutes` : '1 hour'
  }
  
  return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`
}

// Validation
export const validateAssessmentAnswers = (
  questions: any[],
  answers: Record<string, string>
): { isValid: boolean; missingQuestions: number[] } => {
  const missingQuestions: number[] = []
  
  questions.forEach((_, index) => {
    if (!answers[index.toString()] || answers[index.toString()].trim() === '') {
      missingQuestions.push(index + 1)
    }
  })
  
  return {
    isValid: missingQuestions.length === 0,
    missingQuestions
  }
}

// PTIN Integration Helpers
export const getPTINRequirements = () => {
  return {
    minimumEducation: 'High school diploma or equivalent',
    continuingEducation: '15 hours annually',
    backgroundCheck: 'Required for new applicants',
    testingRequirement: 'None for 2024 (may change)',
    renewalPeriod: 'Calendar year',
    applicationFee: '$50 (subject to change)',
    website: 'https://www.irs.gov/tax-professionals/ptin-requirements-for-tax-return-preparers'
  }
}

export const getIRSComplianceChecklist = () => {
  return [
    'Obtain valid PTIN (Preparer Tax Identification Number)',
    'Complete required continuing education (if applicable)',
    'Maintain client confidentiality per Circular 230',
    'Exercise due diligence in return preparation',
    'Keep records of prepared returns for 3 years',
    'Provide copy of return to taxpayer',
    'Sign returns as preparer',
    'Include PTIN on all prepared returns',
    'Stay current with tax law changes',
    'Maintain professional competence'
  ]
}

// Learning Analytics
export const generateLearningAnalytics = (progress: StudentProgress[]) => {
  const totalTimeSpent = progress.reduce((total, p) => total + p.timeSpentMinutes, 0)
  const completedItems = progress.filter(p => p.completionStatus === 'completed').length
  const averageTimePerItem = completedItems > 0 ? Math.round(totalTimeSpent / completedItems) : 0
  
  return {
    totalTimeSpent,
    completedItems,
    averageTimePerItem,
    studyStreak: calculateStudyStreak(progress),
    mostActiveDay: getMostActiveStudyDay(progress)
  }
}

const calculateStudyStreak = (progress: StudentProgress[]): number => {
  // Simplified streak calculation - in real app, would be more sophisticated
  const uniqueDates = [...new Set(progress.map(p => p.lastAccessDate.toDateString()))]
  return uniqueDates.length
}

const getMostActiveStudyDay = (progress: StudentProgress[]): string => {
  const dayCount: Record<string, number> = {}
  
  progress.forEach(p => {
    const day = p.lastAccessDate.toLocaleDateString('en-US', { weekday: 'long' })
    dayCount[day] = (dayCount[day] || 0) + 1
  })
  
  return Object.keys(dayCount).reduce((a, b) => dayCount[a] > dayCount[b] ? a : b, 'Monday')
}
