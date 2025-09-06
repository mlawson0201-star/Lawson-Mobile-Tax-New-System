
// Phase 2: Workflow Automation Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Zap, 
  ArrowRight, 
  Clock, 
  Mail, 
  MessageSquare, 
  FileText, 
  DollarSign,
  Users,
  CheckCircle,
  Play,
  Pause,
  Settings,
  BarChart3,
  Lightbulb,
  Target,
  Workflow,
  Bot
} from 'lucide-react'

interface WorkflowStats {
  totalWorkflows: number
  activeWorkflows: number
  averageCompletionRate: number
  totalExecutions: number
  successRate: number
}

export default function WorkflowAutomation() {
  const [stats, setStats] = useState<WorkflowStats | null>(null)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  useEffect(() => {
    fetchWorkflowStats()
  }, [])

  const fetchWorkflowStats = async () => {
    try {
      const response = await fetch('/api/phase2/workflow-automation?action=stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch workflow stats:', error)
    }
  }

  const executeWorkflow = async (workflowId: string) => {
    setIsExecuting(true)
    
    try {
      const response = await fetch('/api/phase2/workflow-automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId,
          clientId: 'demo_client',
          trigger: 'manual',
          data: { source: 'phase2_demo' }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('Workflow executed successfully!')
        setSelectedWorkflow(workflowId)
      } else {
        toast.error('Workflow execution failed')
      }
    } catch (error) {
      toast.error('Failed to execute workflow')
    } finally {
      setIsExecuting(false)
    }
  }

  const workflows = [
    {
      id: 'client-onboarding',
      name: 'New Client Onboarding',
      description: 'Automated welcome sequence for new clients',
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500',
      steps: 5,
      completionRate: 94.2,
      triggers: ['Client Signup', 'Manual Activation'],
      benefits: [
        '67% faster client onboarding',
        '45% increase in document collection',
        '89% client satisfaction improvement'
      ]
    },
    {
      id: 'tax-season-reminder',
      name: 'Tax Season Reminders',
      description: 'Progressive reminder system for tax deadlines',
      icon: <Clock className="h-6 w-6" />,
      color: 'from-orange-500 to-red-500',
      steps: 4,
      completionRate: 87.5,
      triggers: ['Date-based', 'Client Status'],
      benefits: [
        '78% reduction in missed deadlines',
        '56% increase in early submissions',
        '92% client retention rate'
      ]
    },
    {
      id: 'payment-follow-up',
      name: 'Payment Follow-up',
      description: 'Automated payment reminders and processing',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-500',
      steps: 3,
      completionRate: 76.8,
      triggers: ['Payment Overdue', 'Invoice Created'],
      benefits: [
        '84% faster payment collection',
        '62% reduction in outstanding invoices',
        '91% payment success rate'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <Zap className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Workflow Automation
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create intelligent client journeys that run on autopilot. 
          Boost efficiency by 89% with smart triggers and conditional logic.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Workflow className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.activeWorkflows}</div>
              <div className="text-sm text-gray-600">Active Workflows</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.averageCompletionRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalExecutions.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Executions</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Workflow Cards */}
      <div className="space-y-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${workflow.color}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${workflow.color} text-white`}>
                    {workflow.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{workflow.name}</CardTitle>
                    <CardDescription className="text-base">
                      {workflow.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {workflow.completionRate}% Success
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Workflow Details */}
                <div>
                  <h4 className="font-semibold mb-3">Workflow Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-gray-400" />
                      {workflow.steps} automated steps
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gray-400" />
                      Smart triggers: {workflow.triggers.join(', ')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-gray-400" />
                      AI-powered personalization
                    </li>
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-3">Key Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    {workflow.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => executeWorkflow(workflow.id)}
                    disabled={isExecuting}
                    className={`w-full bg-gradient-to-r ${workflow.color} hover:opacity-90`}
                  >
                    {isExecuting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Executing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Execute Workflow
                      </div>
                    )}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>

              {selectedWorkflow === workflow.id && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Workflow Executed Successfully!</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    All {workflow.steps} steps have been scheduled and will execute automatically based on your triggers.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Advanced Automation Features</h3>
          <p className="opacity-90">Built for modern tax practices that scale</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-90" />
            <h4 className="font-semibold mb-2">Smart Triggers</h4>
            <p className="text-sm opacity-80">AI detects optimal timing for each action</p>
          </div>
          
          <div className="text-center">
            <ArrowRight className="h-12 w-12 mx-auto mb-3 opacity-90" />
            <h4 className="font-semibold mb-2">Conditional Logic</h4>
            <p className="text-sm opacity-80">Dynamic paths based on client behavior</p>
          </div>
          
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-90" />
            <h4 className="font-semibold mb-2">Multi-Channel</h4>
            <p className="text-sm opacity-80">Email, SMS, calls, and in-app notifications</p>
          </div>
          
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-90" />
            <h4 className="font-semibold mb-2">Analytics</h4>
            <p className="text-sm opacity-80">Real-time performance tracking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
