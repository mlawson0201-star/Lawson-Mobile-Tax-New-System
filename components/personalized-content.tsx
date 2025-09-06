
'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  AlertCircle,
  Heart,
  Star
} from 'lucide-react'
import type { ClientProfile } from '@/lib/client-personalization'

interface PersonalizedClientDashboardProps {
  clientProfile: ClientProfile
}

export function PersonalizedClientDashboard({ clientProfile }: PersonalizedClientDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Welcome back, {clientProfile.firstName}!
          </CardTitle>
          <CardDescription>
            Here's what's happening with your taxes and how we can help you today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Great to see you again! Our certified tax professionals are here to help with all your tax needs and ensure you get the maximum refund possible.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Account Active
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Star className="h-3 w-3 mr-1" />
              Premium Client
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Status Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Tax Year</p>
                <p className="text-2xl font-bold text-gray-900">2025</p>
                <p className="text-xs text-gray-500 mt-1">Filing Status: {clientProfile.filingStatus}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estimated Refund</p>
                <p className="text-2xl font-bold text-green-600">
                  $---
                </p>
                <p className="text-xs text-gray-500 mt-1">Based on current info</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Appointment</p>
                <p className="text-lg font-bold text-gray-900">
                  None scheduled
                </p>
                <p className="text-xs text-gray-500 mt-1">Tax consultation</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Your Tax Return Progress
          </CardTitle>
          <CardDescription>
            Track the progress of your tax return preparation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Initial Consultation</p>
                  <p className="text-sm text-green-700">Completed on {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Complete</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Document Collection</p>
                  <p className="text-sm text-blue-700">Upload your tax documents</p>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-300 text-blue-700">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-600">Tax Preparation</p>
                  <p className="text-sm text-gray-500">Professional review and preparation</p>
                </div>
              </div>
              <Badge variant="outline" className="border-gray-300 text-gray-600">Pending</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-600">Review & Filing</p>
                  <p className="text-sm text-gray-500">Final review and IRS submission</p>
                </div>
              </div>
              <Badge variant="outline" className="border-gray-300 text-gray-600">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and next steps for your tax return
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="font-medium">Upload Documents</span>
              <span className="text-xs text-gray-500">W-2s, 1099s, receipts</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Schedule Meeting</span>
              <span className="text-xs text-gray-500">Book consultation</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              <span className="font-medium">Refund Status</span>
              <span className="text-xs text-gray-500">Track your refund</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tax Professional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Tax Professional Team</CardTitle>
          <CardDescription>
            Our certified experts are ready to help with your tax needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              LMT
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Lawson Mobile Tax Team</h3>
              <p className="text-purple-600 font-medium">Certified Tax Professionals</p>
              <p className="text-sm text-gray-600 mt-1">
                Combined 53+ years of tax expertise
              </p>
              <p className="text-sm text-gray-600">
                Specializes in: Individual Returns, Business Tax, and Strategic Planning
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  Send Message
                </Button>
                <Button size="sm" variant="outline">
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
