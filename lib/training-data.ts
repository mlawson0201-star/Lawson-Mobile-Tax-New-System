
// Training System Data and Content

export interface TrainingProgram {
  id: string
  name: string
  description: string
  durationWeeks: number
  priceCents: number
  certificationName: string
  modules: TrainingModule[]
}

export interface TrainingModule {
  id: string
  moduleNumber: number
  title: string
  description: string
  learningObjectives: string[]
  estimatedHours: number
  lessons: ModuleLesson[]
  assessment: Assessment
  irsReferences: string[]
}

export interface ModuleLesson {
  id: string
  lessonNumber: number
  title: string
  contentType: 'video' | 'text' | 'interactive' | 'document'
  contentUrl?: string
  textContent?: string
  durationMinutes: number
  keyPoints: string[]
  practiceExercises?: PracticeExercise[]
}

export interface Assessment {
  id: string
  title: string
  description: string
  type: 'quiz' | 'exam' | 'practical'
  passingScore: number
  timeLimit: number
  questions: AssessmentQuestion[]
}

export interface AssessmentQuestion {
  id: string
  questionNumber: number
  questionText: string
  type: 'multiple_choice' | 'true_false' | 'short_answer'
  correctAnswer: string
  options?: string[]
  points: number
  explanation: string
  irsReference?: string
}

export interface PracticeExercise {
  id: string
  title: string
  scenario: string
  questions: string[]
  solution: string
}

// Complete Tax Preparer Training Program
export const TAX_PREPARER_PROGRAM: TrainingProgram = {
  id: "tax-prep-foundation",
  name: "Complete Tax Preparer & Business Mastery Program",
  description: "Comprehensive IRS-compliant training with advanced digital marketing and client acquisition strategies",
  durationWeeks: 16,
  priceCents: 49900,
  certificationName: "Certified Tax Preparer & Business Developer (CTP-BD)",
  modules: [
    {
      id: "module-1",
      moduleNumber: 1,
      title: "Tax Law Fundamentals & IRS Regulations",
      description: "Master the foundation of federal tax law and IRS regulations",
      learningObjectives: [
        "Understand the structure of the Internal Revenue Code",
        "Navigate IRS publications and procedures",
        "Identify key tax law changes for current year",
        "Comprehend preparer responsibilities and ethics"
      ],
      estimatedHours: 15,
      irsReferences: ["IRC Section 1", "IRS Pub 17", "IRS Circular 230"],
      lessons: [
        {
          id: "lesson-1-1",
          lessonNumber: 1,
          title: "Introduction to Federal Tax System",
          contentType: "video",
          contentUrl: "/training/videos/module1-lesson1.mp4",
          durationMinutes: 45,
          keyPoints: [
            "History and purpose of federal income tax",
            "Tax law hierarchy: Constitution, IRC, Regulations, Rulings",
            "Major types of federal taxes",
            "Role of IRS in tax administration"
          ],
          practiceExercises: [
            {
              id: "exercise-1-1-1",
              title: "Tax Law Sources",
              scenario: "You need to research a specific tax issue for a client. Identify the best primary and secondary sources.",
              questions: [
                "What is the difference between a Revenue Ruling and a Private Letter Ruling?",
                "Which source has more authority: IRS Publication or Treasury Regulation?"
              ],
              solution: "Revenue Rulings are public guidance applicable to all taxpayers, while PLRs are specific to one taxpayer. Treasury Regulations have more authority than IRS Publications."
            }
          ]
        },
        {
          id: "lesson-1-2", 
          lessonNumber: 2,
          title: "IRS Organization and Procedures",
          contentType: "video",
          contentUrl: "/training/videos/module1-lesson2.mp4",
          durationMinutes: 40,
          keyPoints: [
            "IRS organizational structure",
            "Taxpayer rights and responsibilities",
            "IRS examination and collection procedures",
            "Appeals process and taxpayer advocacy"
          ]
        },
        {
          id: "lesson-1-3",
          lessonNumber: 3,
          title: "Tax Year and Accounting Methods",
          contentType: "text",
          textContent: `
# Tax Year and Accounting Methods

## Tax Year Basics
A tax year is the annual accounting period for reporting income and deductions. Most individual taxpayers use the calendar year (January 1 - December 31).

### Types of Tax Years:
- **Calendar Year**: January 1 - December 31
- **Fiscal Year**: Any 12-month period ending on the last day of any month except December
- **52-53 Week Year**: Used by some businesses for convenience

## Accounting Methods
The accounting method determines when income and deductions are reported.

### Cash Method:
- Income reported when received
- Deductions claimed when paid
- Most common for individuals and small businesses
- Limitations for businesses with gross receipts > $27M

### Accrual Method:
- Income reported when earned
- Deductions claimed when incurred
- Required for C corporations and partnerships with C corp partners
- Required for businesses with inventory (with exceptions)

### Hybrid Method:
- Combination of cash and accrual
- Must be consistent and clearly reflect income

## Key Rules:
1. **Consistency**: Must use same method each year unless IRS permission to change
2. **Clear Reflection**: Method must clearly reflect income
3. **Uniform Application**: Same method for all items in same class

## IRS Form 3115
Used to request change in accounting method. Automatic consent procedures available for many changes.
          `,
          durationMinutes: 30,
          keyPoints: [
            "Calendar vs fiscal year elections",
            "Cash vs accrual accounting methods", 
            "When accounting method changes are required",
            "Form 3115 application procedures"
          ]
        }
      ],
      assessment: {
        id: "assessment-1",
        title: "Module 1: Tax Law Fundamentals Quiz",
        description: "Test your knowledge of basic tax law and IRS procedures",
        type: "quiz",
        passingScore: 80,
        timeLimit: 45,
        questions: [
          {
            id: "q1-1",
            questionNumber: 1,
            questionText: "Which of the following has the highest authority in tax law?",
            type: "multiple_choice",
            options: [
              "IRS Publication",
              "Treasury Regulation", 
              "Internal Revenue Code",
              "Revenue Ruling"
            ],
            correctAnswer: "Internal Revenue Code",
            points: 2,
            explanation: "The Internal Revenue Code is the actual tax law passed by Congress and has the highest authority.",
            irsReference: "IRC Section 1"
          },
          {
            id: "q1-2", 
            questionNumber: 2,
            questionText: "A sole proprietor with $25 million in gross receipts must use the accrual method of accounting.",
            type: "true_false",
            correctAnswer: "false",
            points: 2,
            explanation: "The $27 million gross receipts test applies to C corporations and partnerships with C corp partners, not sole proprietors."
          },
          {
            id: "q1-3",
            questionNumber: 3, 
            questionText: "What form is used to request a change in accounting method?",
            type: "short_answer",
            correctAnswer: "Form 3115",
            points: 1,
            explanation: "Form 3115 (Application for Change in Accounting Method) is used to request changes in accounting method."
          }
        ]
      }
    },
    {
      id: "module-2",
      moduleNumber: 2,
      title: "Individual Tax Return Preparation",
      description: "Complete preparation of Form 1040 and related schedules",
      learningObjectives: [
        "Prepare accurate Form 1040 returns",
        "Complete common schedules and forms",
        "Calculate tax liability and refunds",
        "Identify and apply tax credits and deductions"
      ],
      estimatedHours: 20,
      irsReferences: ["IRS Pub 17", "Form 1040", "Instructions for Form 1040"],
      lessons: [
        {
          id: "lesson-2-1",
          lessonNumber: 1,
          title: "Form 1040 Overview and Filing Requirements",
          contentType: "video",
          contentUrl: "/training/videos/module2-lesson1.mp4",
          durationMinutes: 50,
          keyPoints: [
            "Who must file a tax return",
            "Filing status determination",
            "Standard vs itemized deductions",
            "Form 1040 line-by-line walkthrough"
          ]
        },
        {
          id: "lesson-2-2",
          lessonNumber: 2, 
          title: "Income Reporting - Wages, Interest, Dividends",
          contentType: "interactive",
          durationMinutes: 60,
          keyPoints: [
            "W-2 wage reporting and verification",
            "1099-INT interest income",
            "1099-DIV dividend reporting",
            "Tax-exempt vs taxable income"
          ],
          practiceExercises: [
            {
              id: "exercise-2-2-1",
              title: "W-2 Analysis",
              scenario: "Client provides W-2 showing $45,000 wages, $2,800 federal withholding, $2,790 Social Security wages.",
              questions: [
                "What amount goes on Form 1040 line 1a?",
                "Is there a discrepancy in the Social Security wages?",
                "What should you do about the discrepancy?"
              ],
              solution: "$45,000 goes on line 1a. Yes, SS wages should equal total wages unless over the wage base. Contact employer for corrected W-2."
            }
          ]
        }
      ],
      assessment: {
        id: "assessment-2",
        title: "Module 2: Individual Returns Exam",
        description: "Comprehensive test on Form 1040 preparation",
        type: "exam",
        passingScore: 85,
        timeLimit: 90,
        questions: [
          {
            id: "q2-1",
            questionNumber: 1,
            questionText: "A married couple's combined income is $50,000. What is their standard deduction for 2023?",
            type: "multiple_choice",
            options: ["$13,850", "$27,700", "$20,800", "$25,900"],
            correctAnswer: "$27,700",
            points: 3,
            explanation: "The 2023 standard deduction for married filing jointly is $27,700."
          }
        ]
      }
    },
    {
      id: "module-3",
      moduleNumber: 3,
      title: "Business Tax Returns & Entity Types",
      description: "Preparation of business returns for various entity types",
      learningObjectives: [
        "Distinguish between business entity types",
        "Prepare Schedule C for sole proprietors", 
        "Complete partnership and S-corp returns",
        "Calculate business deductions and depreciation"
      ],
      estimatedHours: 25,
      irsReferences: ["IRS Pub 334", "Schedule C", "Form 1120S", "Form 1065"],
      lessons: [
        {
          id: "lesson-3-1",
          lessonNumber: 1,
          title: "Business Entity Types and Tax Treatment",
          contentType: "video",
          contentUrl: "/training/videos/module3-lesson1.mp4", 
          durationMinutes: 55,
          keyPoints: [
            "Sole proprietorship tax reporting",
            "Partnership tax characteristics",
            "S-corporation election and requirements",
            "C-corporation double taxation"
          ]
        }
      ],
      assessment: {
        id: "assessment-3",
        title: "Module 3: Business Tax Quiz",
        description: "Test your knowledge of business entity taxation",
        type: "quiz",
        passingScore: 80,
        timeLimit: 60,
        questions: []
      }
    },
    // Continue with remaining modules...
    {
      id: "module-4", 
      moduleNumber: 4,
      title: "Advanced Deductions & Credits",
      description: "Complex deductions, credits, and tax planning strategies",
      learningObjectives: [
        "Calculate itemized deductions",
        "Apply tax credits accurately",
        "Identify advanced deduction opportunities",
        "Plan strategies for tax optimization"
      ],
      estimatedHours: 18,
      irsReferences: ["IRS Pub 502", "IRS Pub 526", "Schedule A"],
      lessons: [],
      assessment: {
        id: "assessment-4",
        title: "Module 4: Deductions & Credits Exam", 
        description: "Advanced test on deductions and credits",
        type: "exam",
        passingScore: 85,
        timeLimit: 75,
        questions: []
      }
    },
    {
      id: "module-5",
      moduleNumber: 5, 
      title: "Tax Software Mastery",
      description: "Professional tax software operation and best practices",
      learningObjectives: [
        "Navigate professional tax software",
        "Import and verify client data",
        "Generate professional tax returns", 
        "Perform quality review procedures"
      ],
      estimatedHours: 16,
      irsReferences: ["IRS e-file requirements", "IRS Pub 1345"],
      lessons: [],
      assessment: {
        id: "assessment-5",
        title: "Module 5: Software Practical Exam",
        description: "Hands-on software demonstration",
        type: "practical",
        passingScore: 90,
        timeLimit: 120,
        questions: []
      }
    },
    {
      id: "module-6",
      moduleNumber: 6,
      title: "Client Acquisition & Digital Marketing", 
      description: "Master digital marketing, social media, and online client acquisition strategies for tax preparers",
      learningObjectives: [
        "Build a professional online presence and brand identity",
        "Create engaging social media content that attracts clients",
        "Implement digital marketing campaigns with measurable ROI",
        "Master online client acquisition and conversion strategies",
        "Develop effective client communication and retention systems"
      ],
      estimatedHours: 24,
      irsReferences: ["IRS Circular 230", "FTC Advertising Guidelines"],
      lessons: [
        {
          id: "lesson-6-1",
          lessonNumber: 1,
          title: "Building Your Professional Brand & Online Presence",
          contentType: "video",
          contentUrl: "/training/videos/module6-lesson1.mp4",
          durationMinutes: 60,
          keyPoints: [
            "Creating a memorable brand identity for your tax practice",
            "Professional website development and optimization",
            "Setting up Google My Business and local SEO",
            "Professional photography and visual branding"
          ],
          practiceExercises: [
            {
              id: "exercise-6-1-1",
              title: "Brand Identity Workshop",
              scenario: "Create a complete brand identity for your tax practice including logo concepts, color scheme, and messaging.",
              questions: [
                "What makes your tax practice unique from competitors?",
                "Who is your ideal client avatar?",
                "What are your core brand values and promises?"
              ],
              solution: "Focus on specific niche (e.g., small business owners), emphasize personal service, and highlight expertise areas like maximizing deductions."
            }
          ]
        },
        {
          id: "lesson-6-2",
          lessonNumber: 2,
          title: "Social Media Marketing Mastery for Tax Preparers",
          contentType: "interactive",
          durationMinutes: 75,
          keyPoints: [
            "Platform-specific strategies: Facebook, Instagram, LinkedIn, TikTok",
            "Content calendar creation and scheduling tools",
            "Tax season posting strategies and evergreen content",
            "Compliance and ethical considerations for tax preparer social media"
          ],
          practiceExercises: [
            {
              id: "exercise-6-2-1",
              title: "30-Day Content Calendar Creation",
              scenario: "Build a complete social media content calendar for tax season with daily posts across multiple platforms.",
              questions: [
                "What types of content perform best for tax preparers?",
                "How do you balance educational content with promotional posts?",
                "What compliance rules must be followed?"
              ],
              solution: "70% educational content (tax tips, deadlines), 20% behind-the-scenes/personal, 10% direct promotion. Always include disclaimers."
            }
          ]
        },
        {
          id: "lesson-6-3",
          lessonNumber: 3,
          title: "Content Creation & Video Marketing",
          contentType: "video",
          contentUrl: "/training/videos/module6-lesson3.mp4",
          durationMinutes: 65,
          keyPoints: [
            "Creating engaging tax education videos and reels",
            "Live streaming strategies for client engagement",
            "Content repurposing across multiple platforms",
            "Using storytelling to make tax topics interesting"
          ]
        },
        {
          id: "lesson-6-4",
          lessonNumber: 4,
          title: "Google Ads & Facebook Advertising for Tax Practices",
          contentType: "interactive",
          durationMinutes: 80,
          keyPoints: [
            "Setting up and optimizing Google Ads campaigns",
            "Facebook and Instagram advertising strategies",
            "Local advertising and geo-targeting techniques",
            "Budget management and ROI tracking"
          ]
        },
        {
          id: "lesson-6-5",
          lessonNumber: 5,
          title: "Client Acquisition Funnels & Lead Generation",
          contentType: "video",
          contentUrl: "/training/videos/module6-lesson5.mp4",
          durationMinutes: 70,
          keyPoints: [
            "Building automated client acquisition funnels",
            "Lead magnets and free tax resources",
            "Email marketing automation for tax preparers",
            "Referral program development and management"
          ]
        },
        {
          id: "lesson-6-6",
          lessonNumber: 6,
          title: "Online Client Onboarding & Virtual Consultations",
          contentType: "video",
          contentUrl: "/training/videos/module6-lesson6.mp4",
          durationMinutes: 55,
          keyPoints: [
            "Virtual client meeting best practices",
            "Digital document collection and security",
            "Online consultation sales techniques",
            "Client portal setup and management"
          ]
        },
        {
          id: "lesson-6-7",
          lessonNumber: 7,
          title: "Networking & Community Building",
          contentType: "interactive",
          durationMinutes: 50,
          keyPoints: [
            "Building relationships with local businesses",
            "Professional networking strategies",
            "Community involvement and sponsorship opportunities",
            "Creating and joining tax preparer mastermind groups"
          ]
        },
        {
          id: "lesson-6-8",
          lessonNumber: 8,
          title: "Client Retention & Upselling Strategies",
          contentType: "video",
          contentUrl: "/training/videos/module6-lesson8.mp4",
          durationMinutes: 45,
          keyPoints: [
            "Year-round client communication strategies",
            "Additional service offerings and upselling",
            "Client satisfaction surveys and feedback systems",
            "Building long-term client relationships"
          ]
        }
      ],
      assessment: {
        id: "assessment-6",
        title: "Module 6: Digital Marketing & Client Acquisition Mastery",
        description: "Comprehensive practical assessment of marketing and client acquisition skills",
        type: "practical",
        passingScore: 85, 
        timeLimit: 120,
        questions: []
      }
    },
    {
      id: "module-7",
      moduleNumber: 7,
      title: "Ethics, PTIN Requirements & IRS Enrollment",
      description: "Professional ethics and IRS registration requirements", 
      learningObjectives: [
        "Understand preparer ethics requirements",
        "Complete PTIN registration process",
        "Learn IRS enrolled agent pathway",
        "Maintain professional standards"
      ],
      estimatedHours: 14,
      irsReferences: ["IRS Circular 230", "PTIN Requirements"],
      lessons: [],
      assessment: {
        id: "assessment-7",
        title: "Module 7: Ethics & Professional Standards",
        description: "Professional ethics examination",
        type: "exam", 
        passingScore: 90,
        timeLimit: 60,
        questions: []
      }
    },
    {
      id: "module-8",
      moduleNumber: 8,
      title: "Online Tax Business Mastery & Advanced Marketing",
      description: "Build and scale a profitable online tax preparation business with advanced marketing and technology strategies",
      learningObjectives: [
        "Launch and operate a fully online tax preparation business",
        "Implement advanced marketing automation and client acquisition systems", 
        "Master pricing strategies and profit optimization techniques",
        "Build scalable business systems and hire virtual assistants",
        "Create multiple revenue streams and passive income opportunities"
      ],
      estimatedHours: 28,
      irsReferences: ["Business best practices", "IRS e-file requirements", "Data security standards"],
      lessons: [
        {
          id: "lesson-8-1",
          lessonNumber: 1,
          title: "Setting Up Your Online Tax Business Infrastructure",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson1.mp4",
          durationMinutes: 75,
          keyPoints: [
            "Business entity selection and registration",
            "Essential business licenses and permits",
            "Professional liability insurance and bonding",
            "Banking, accounting, and financial management setup"
          ],
          practiceExercises: [
            {
              id: "exercise-8-1-1",
              title: "Business Launch Checklist",
              scenario: "Complete a comprehensive business setup checklist for launching your online tax practice.",
              questions: [
                "What business entity type offers the best tax advantages for tax preparers?",
                "Which professional licenses are required in your state?",
                "What insurance coverage is essential for tax preparers?"
              ],
              solution: "LLC for flexibility and tax benefits, PTIN and state preparer licenses, E&O insurance minimum $1M coverage."
            }
          ]
        },
        {
          id: "lesson-8-2",
          lessonNumber: 2,
          title: "Technology Stack for Online Tax Preparers",
          contentType: "interactive",
          durationMinutes: 90,
          keyPoints: [
            "Cloud-based tax software comparison and selection",
            "Client relationship management (CRM) systems",
            "Secure document management and client portals",
            "Video conferencing and virtual meeting tools"
          ],
          practiceExercises: [
            {
              id: "exercise-8-2-1",
              title: "Technology Setup Workshop",
              scenario: "Build a complete technology stack for remote tax preparation including software selection and integration.",
              questions: [
                "Which tax software offers the best features for online preparers?",
                "How do you ensure client data security in remote operations?",
                "What tools are essential for virtual client meetings?"
              ],
              solution: "Drake/Lacerte for professional features, encrypted cloud storage, Zoom Pro with password protection."
            }
          ]
        },
        {
          id: "lesson-8-3",
          lessonNumber: 3,
          title: "Advanced Social Media Marketing & Content Strategy",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson3.mp4",
          durationMinutes: 85,
          keyPoints: [
            "Advanced Facebook and Instagram advertising techniques",
            "TikTok and YouTube marketing for tax preparers",
            "Influencer marketing and partnership strategies",
            "Content marketing that converts prospects to clients"
          ]
        },
        {
          id: "lesson-8-4",
          lessonNumber: 4,
          title: "Email Marketing Automation & Lead Nurturing",
          contentType: "interactive",
          durationMinutes: 70,
          keyPoints: [
            "Building email lists and lead magnets",
            "Automated email sequences for client acquisition",
            "Newsletter strategies for year-round engagement",
            "Email marketing compliance and best practices"
          ]
        },
        {
          id: "lesson-8-5",
          lessonNumber: 5,
          title: "Pricing Strategies & Profit Optimization",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson5.mp4",
          durationMinutes: 65,
          keyPoints: [
            "Value-based pricing vs. hourly billing",
            "Creating service packages and upsells",
            "Seasonal pricing strategies for tax season",
            "Profit margin analysis and optimization"
          ]
        },
        {
          id: "lesson-8-6",
          lessonNumber: 6,
          title: "Online Advertising Mastery: Google, Facebook & Beyond",
          contentType: "interactive",
          durationMinutes: 95,
          keyPoints: [
            "Google Ads mastery for tax preparers",
            "Facebook and Instagram advertising optimization",
            "LinkedIn advertising for business clients",
            "Retargeting campaigns and conversion optimization"
          ]
        },
        {
          id: "lesson-8-7",
          lessonNumber: 7,
          title: "Building Multiple Revenue Streams",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson7.mp4",
          durationMinutes: 60,
          keyPoints: [
            "Year-round services: bookkeeping, payroll, business consulting",
            "Creating and selling tax education courses",
            "Affiliate marketing and partnership opportunities",
            "Passive income strategies for tax professionals"
          ]
        },
        {
          id: "lesson-8-8",
          lessonNumber: 8,
          title: "Scaling Your Business: Systems & Team Building",
          contentType: "interactive",
          durationMinutes: 80,
          keyPoints: [
            "Creating standard operating procedures (SOPs)",
            "Hiring and training virtual assistants",
            "Client management systems and workflows",
            "Performance tracking and KPI management"
          ]
        },
        {
          id: "lesson-8-9",
          lessonNumber: 9,
          title: "Advanced Client Communication & Sales Techniques",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson9.mp4",
          durationMinutes: 75,
          keyPoints: [
            "Consultative selling for tax services",
            "Handling price objections and closing techniques",
            "Virtual presentation skills and screen sharing",
            "Building trust and credibility online"
          ]
        },
        {
          id: "lesson-8-10",
          lessonNumber: 10,
          title: "Analytics, Tracking & Business Growth Optimization",
          contentType: "interactive",
          durationMinutes: 55,
          keyPoints: [
            "Google Analytics and conversion tracking",
            "Social media analytics and ROI measurement",
            "Client lifetime value calculations",
            "Business forecasting and growth planning"
          ]
        },
        {
          id: "lesson-8-11",
          lessonNumber: 11,
          title: "Content Marketing & Thought Leadership",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson11.mp4",
          durationMinutes: 50,
          keyPoints: [
            "Blogging strategies for tax professionals",
            "Podcast guesting and hosting opportunities",
            "Speaking engagements and webinar hosting",
            "Building authority in your local market"
          ]
        },
        {
          id: "lesson-8-12",
          lessonNumber: 12,
          title: "Crisis Management & Business Continuity",
          contentType: "video",
          contentUrl: "/training/videos/module8-lesson12.mp4",
          durationMinutes: 45,
          keyPoints: [
            "Managing tax season overload and capacity",
            "Handling client complaints and negative reviews",
            "Business continuity planning and disaster recovery",
            "Legal compliance and risk management"
          ]
        }
      ],
      assessment: {
        id: "assessment-8",
        title: "Module 8: Online Tax Business Mastery Final Exam",
        description: "Comprehensive practical assessment of online business development and advanced marketing skills", 
        type: "practical",
        passingScore: 90,
        timeLimit: 150,
        questions: []
      }
    }
  ]
}

// Student Progress Tracking
export interface StudentEnrollment {
  id: string
  userId: string
  programId: string
  enrollmentDate: Date
  status: 'active' | 'completed' | 'dropped' | 'suspended'
  progressPercentage: number
  certificateIssued: boolean
  certificateNumber?: string
}

export interface StudentProgress {
  id: string
  enrollmentId: string
  moduleId: string
  lessonId?: string
  completionStatus: 'not_started' | 'in_progress' | 'completed'
  completionDate?: Date
  timeSpentMinutes: number
}

export interface AssessmentAttempt {
  id: string
  enrollmentId: string
  assessmentId: string
  attemptNumber: number
  score: number
  maxScore: number
  passed: boolean
  startedAt: Date
  completedAt?: Date
  answers: Record<string, any>
}
