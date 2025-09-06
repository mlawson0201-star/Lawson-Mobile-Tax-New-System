
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Star,
  Calendar,
  PlayCircle,
  FileText,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  completedModules: number
  totalModules: number
  certifications: string[]
  currentCourse?: string
  lastActivity: string
  performance: number
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

interface TrainingModule {
  id: string
  title: string
  category: string
  difficulty: string
  duration: number
  completions: number
  avgRating: number
  description: string
  isRequired: boolean
  dueDate?: string
}

export default function TrainingIntegration() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Tax Preparer',
      avatar: '/team/sarah.jpg',
      completedModules: 7,
      totalModules: 8,
      certifications: ['EA', 'Advanced Business Tax'],
      currentCourse: 'Complex Business Returns',
      lastActivity: '2 hours ago',
      performance: 94,
      skillLevel: 'Expert'
    },
    {
      id: '2',
      name: 'Michael Brown',
      role: 'Tax Preparer',
      avatar: '/team/michael.jpg',
      completedModules: 5,
      totalModules: 8,
      certifications: ['CPA'],
      currentCourse: 'Individual Tax Updates',
      lastActivity: '1 day ago',
      performance: 87,
      skillLevel: 'Advanced'
    },
    {
      id: '3',
      name: 'Jennifer Lee',
      role: 'Junior Tax Preparer',
      avatar: '/team/jennifer.jpg',
      completedModules: 3,
      totalModules: 8,
      certifications: ['Tax Prep Fundamentals'],
      currentCourse: 'Federal Tax Basics',
      lastActivity: '3 hours ago',
      performance: 79,
      skillLevel: 'Intermediate'
    }
  ])

  const [requiredTraining, setRequiredTraining] = useState<TrainingModule[]>([
    {
      id: '1',
      title: '2024 Tax Law Updates',
      category: 'Compliance',
      difficulty: 'Intermediate',
      duration: 120,
      completions: 2,
      avgRating: 4.8,
      description: 'Critical updates for 2024 tax season',
      isRequired: true,
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      title: 'Advanced Business Deductions',
      category: 'Business Tax',
      difficulty: 'Advanced',
      duration: 180,
      completions: 1,
      avgRating: 4.9,
      description: 'Maximize business tax savings for clients',
      isRequired: true,
      dueDate: '2024-03-01'
    },
    {
      id: '3',
      title: 'Client Communication Excellence',
      category: 'Soft Skills',
      difficulty: 'Beginner',
      duration: 90,
      completions: 3,
      avgRating: 4.7,
      description: 'Improve client satisfaction and retention',
      isRequired: false
    }
  ])

  const assignTraining = (moduleId: string, memberId: string) => {
    toast.success('Training module assigned successfully!')
    // In real implementation, this would make an API call
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800'
      case 'Advanced': return 'bg-blue-100 text-blue-800'
      case 'Intermediate': return 'bg-green-100 text-green-800'
      case 'Beginner': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Advanced': return 'bg-red-100 text-red-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Beginner': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Team Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round((teamMembers.reduce((sum, member) => sum + member.completedModules, 0) / 
                    (teamMembers.length * 8)) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Certifications</p>
                <p className="text-2xl font-bold">
                  {teamMembers.reduce((sum, member) => sum + member.certifications.length, 0)}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Performance</p>
                <p className="text-2xl font-bold">
                  {Math.round(teamMembers.reduce((sum, member) => sum + member.performance, 0) / teamMembers.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Learners</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Training Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Team Training Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">Last active: {member.lastActivity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getSkillLevelColor(member.skillLevel)}>
                      {member.skillLevel}
                    </Badge>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-semibold">{member.performance}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600">
                        {member.completedModules}/{member.totalModules}
                      </span>
                    </div>
                    <Progress 
                      value={(member.completedModules / member.totalModules) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Current Course</div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{member.currentCourse}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Certifications</div>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    View Progress
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Training
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Required Training Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            Required Training & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requiredTraining.map((module) => (
              <Card key={module.id} className={`p-4 ${
                module.isRequired ? 'border-l-4 border-l-red-500 bg-red-50' : 'bg-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      {module.isRequired && (
                        <Badge className="bg-red-100 text-red-800">Required</Badge>
                      )}
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration} mins
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {module.completions}/{teamMembers.length} completed
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {module.avgRating}/5.0
                      </div>
                      {module.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(module.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Assign to All
                    </Button>
                    <Link href={`/training/modules/${module.id}`}>
                      <Button size="sm" variant="outline" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Module
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Progress bar for completion */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Team Completion</span>
                    <span className="text-sm text-gray-600">
                      {Math.round((module.completions / teamMembers.length) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(module.completions / teamMembers.length) * 100} 
                    className="h-2"
                  />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Training Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-green-500" />
            Training Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/training">
              <Card className="p-4 hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Browse Courses</h3>
                  <p className="text-xs text-gray-600">View all training modules</p>
                </div>
              </Card>
            </Link>

            <Card className="p-4 hover:bg-blue-50 transition-colors cursor-pointer">
              <div className="text-center">
                <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Certificates</h3>
                <p className="text-xs text-gray-600">Manage certifications</p>
              </div>
            </Card>

            <Card className="p-4 hover:bg-green-50 transition-colors cursor-pointer">
              <div className="text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Set Goals</h3>
                <p className="text-xs text-gray-600">Define learning objectives</p>
              </div>
            </Card>

            <Card className="p-4 hover:bg-orange-50 transition-colors cursor-pointer">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Schedule</h3>
                <p className="text-xs text-gray-600">Plan training sessions</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
