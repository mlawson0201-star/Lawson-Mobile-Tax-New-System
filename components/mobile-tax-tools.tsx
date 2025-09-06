
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Target,
  PieChart,
  Calendar,
  CheckSquare,
  Sparkles,
  AlertCircle,
  Clock,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  Heart,
  Banknote,
  FileText,
  Info,
  Bell
} from 'lucide-react'

export function MobileTaxTools() {
  const [activeCalculator, setActiveCalculator] = useState('refund')
  const [calculatorInputs, setCalculatorInputs] = useState({
    income: 75000,
    filingStatus: 'single',
    dependents: 0,
    itemizedDeductions: 0,
    retirementContributions: 0
  })
  const [refundEstimate, setRefundEstimate] = useState(2847)

  const taxDeadlines = [
    {
      date: 'January 15, 2025',
      title: 'Q4 2024 Estimated Tax Payment',
      daysLeft: 25,
      priority: 'high',
      amount: '$1,200',
      description: 'Fourth quarter estimated tax payment for self-employed'
    },
    {
      date: 'January 31, 2025',
      title: 'Employer Tax Forms Deadline',
      daysLeft: 41,
      priority: 'medium',
      amount: null,
      description: 'W-2s and 1099s must be mailed by employers'
    },
    {
      date: 'March 15, 2025',
      title: 'S-Corp/Partnership Returns Due',
      daysLeft: 85,
      priority: 'medium',
      amount: null,
      description: 'Business returns due (with extension available)'
    },
    {
      date: 'April 15, 2025',
      title: 'Individual Tax Returns Due',
      daysLeft: 115,
      priority: 'high',
      amount: null,
      description: 'Main tax filing deadline for individuals'
    },
    {
      date: 'April 15, 2025',
      title: 'IRA Contribution Deadline',
      daysLeft: 115,
      priority: 'medium',
      amount: '$6,500 max',
      description: 'Last day to contribute for 2024 tax year'
    }
  ]

  const deductionChecklist = [
    {
      category: 'Home Office',
      icon: Home,
      items: [
        { name: 'Home office square footage', completed: true, value: '$1,200' },
        { name: 'Utility bills (12 months)', completed: true, value: '$480' },
        { name: 'Rent/mortgage statements', completed: false, value: '$800' }
      ]
    },
    {
      category: 'Vehicle Expenses',
      icon: Car,
      items: [
        { name: 'Business mileage log', completed: false, value: '$1,500' },
        { name: 'Vehicle registration', completed: true, value: '$120' },
        { name: 'Auto insurance statements', completed: true, value: '$340' }
      ]
    },
    {
      category: 'Business Expenses',
      icon: Briefcase,
      items: [
        { name: 'Office supplies receipts', completed: true, value: '$450' },
        { name: 'Professional subscriptions', completed: true, value: '$300' },
        { name: 'Business meals (50%)', completed: false, value: '$600' }
      ]
    },
    {
      category: 'Education',
      icon: GraduationCap,
      items: [
        { name: '1098-T tuition statement', completed: true, value: '$4,000' },
        { name: 'Student loan interest', completed: true, value: '$2,500' },
        { name: 'Educational supplies', completed: false, value: '$200' }
      ]
    },
    {
      category: 'Medical',
      icon: Heart,
      items: [
        { name: 'Medical expenses receipts', completed: false, value: '$1,800' },
        { name: 'Health insurance premiums', completed: true, value: '$3,200' },
        { name: 'HSA contributions', completed: true, value: '$3,650' }
      ]
    },
    {
      category: 'Charitable',
      icon: Heart,
      items: [
        { name: 'Cash donation receipts', completed: true, value: '$800' },
        { name: 'Non-cash donation records', completed: false, value: '$400' },
        { name: 'Volunteer mileage', completed: false, value: '$150' }
      ]
    }
  ]

  const calculateRefund = () => {
    // Simplified tax calculation for demo
    const standardDeduction = calculatorInputs.filingStatus === 'married' ? 29200 : 14600
    const taxableIncome = Math.max(0, calculatorInputs.income - standardDeduction - calculatorInputs.itemizedDeductions - calculatorInputs.retirementContributions)
    
    let tax = 0
    if (taxableIncome > 0) {
      // Simplified tax brackets
      if (taxableIncome <= 11000) tax = taxableIncome * 0.10
      else if (taxableIncome <= 44725) tax = 1100 + (taxableIncome - 11000) * 0.12
      else tax = 5147 + (taxableIncome - 44725) * 0.22
    }
    
    const childTaxCredit = calculatorInputs.dependents * 2000
    const totalTax = Math.max(0, tax - childTaxCredit)
    const withholding = calculatorInputs.income * 0.22 // Estimated withholding
    
    setRefundEstimate(Math.round(withholding - totalTax))
  }

  React.useEffect(() => {
    calculateRefund()
  }, [calculatorInputs])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200'  
      case 'low': return 'bg-green-50 text-green-700 border-green-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Calculator className="h-8 w-8" />
            Mobile Tax Tools
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            Professional tax tools optimized for your mobile device
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="refund" className="text-xs sm:text-sm">
            <Calculator className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Refund Calc</span>
          </TabsTrigger>
          <TabsTrigger value="deadlines" className="text-xs sm:text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Deadlines</span>
          </TabsTrigger>
          <TabsTrigger value="deductions" className="text-xs sm:text-sm">
            <CheckSquare className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Deductions</span>
          </TabsTrigger>
          <TabsTrigger value="tracker" className="text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Tracker</span>
          </TabsTrigger>
        </TabsList>

        {/* Refund Calculator */}
        <TabsContent value="refund">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Tax Refund Calculator
              </CardTitle>
              <CardDescription>
                Get an instant estimate of your 2024 tax refund
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Result Display */}
              <div className="bg-green-50 rounded-lg p-6 text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${refundEstimate.toLocaleString()}
                </div>
                <div className="text-green-700 font-semibold">Estimated Tax Refund</div>
                <div className="text-sm text-green-600 mt-2">
                  Based on current tax law and your inputs
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income
                  </label>
                  <Input
                    type="number"
                    value={calculatorInputs.income}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs, 
                      income: parseInt(e.target.value) || 0
                    })}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filing Status
                  </label>
                  <select
                    value={calculatorInputs.filingStatus}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs, 
                      filingStatus: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md text-lg"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                    <option value="head">Head of Household</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dependents
                    </label>
                    <Input
                      type="number"
                      value={calculatorInputs.dependents}
                      onChange={(e) => setCalculatorInputs({
                        ...calculatorInputs, 
                        dependents: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deductions
                    </label>
                    <Input
                      type="number"
                      value={calculatorInputs.itemizedDeductions}
                      onChange={(e) => setCalculatorInputs({
                        ...calculatorInputs, 
                        itemizedDeductions: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retirement Contributions (IRA, 401k)
                  </label>
                  <Input
                    type="number"
                    value={calculatorInputs.retirementContributions}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs, 
                      retirementContributions: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-semibold mb-1">Estimate Disclaimer</p>
                    <p>This is a simplified calculation for estimation purposes. Actual refund may vary based on additional factors like withholdings, credits, and other income sources.</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.open('/client/onboarding', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              >
                Get Professional Tax Preparation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Deadlines */}
        <TabsContent value="deadlines">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Important Tax Deadlines
              </CardTitle>
              <CardDescription>
                Never miss a critical tax deadline again
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxDeadlines.map((deadline, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${getPriorityColor(deadline.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{deadline.title}</h3>
                        <p className="text-sm opacity-80">{deadline.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {deadline.priority.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{deadline.date}</div>
                        <div className="text-sm opacity-80">
                          {deadline.daysLeft} days left
                        </div>
                      </div>
                      {deadline.amount && (
                        <div className="text-right">
                          <div className="font-bold text-lg">{deadline.amount}</div>
                          <div className="text-sm opacity-80">Estimated</div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-current h-2 rounded-full" 
                            style={{ width: `${Math.max(10, 100 - (deadline.daysLeft / 365) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Smart Reminders</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Get personalized email and text reminders before each deadline.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Set Up Reminders
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deduction Checklist */}
        <TabsContent value="deductions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Deduction Checklist
              </CardTitle>
              <CardDescription>
                Track your deductions and maximize your refund
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deductionChecklist.map((category, index) => {
                  const Icon = category.icon
                  const completedItems = category.items.filter(item => item.completed).length
                  const totalValue = category.items.reduce((sum, item) => {
                    const value = parseInt(item.value.replace(/[$,]/g, '')) || 0
                    return sum + (item.completed ? value : 0)
                  }, 0)
                  
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{category.category}</h3>
                            <div className="text-sm text-gray-600">
                              {completedItems}/{category.items.length} completed
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">${totalValue.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Current Value</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex} 
                            className={`flex items-center justify-between p-3 rounded-md border ${
                              item.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                item.completed 
                                  ? 'bg-green-600 border-green-600' 
                                  : 'border-gray-300'
                              }`}>
                                {item.completed && <CheckSquare className="h-3 w-3 text-white" />}
                              </div>
                              <span className={item.completed ? 'text-green-800' : 'text-gray-700'}>
                                {item.name}
                              </span>
                            </div>
                            <span className={`font-semibold ${
                              item.completed ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-bold text-green-800 mb-2">Total Deductions Found</h4>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${deductionChecklist
                    .flatMap(cat => cat.items)
                    .filter(item => item.completed)
                    .reduce((sum, item) => sum + (parseInt(item.value.replace(/[$,]/g, '')) || 0), 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-green-700">
                  You could save approximately ${Math.round(deductionChecklist
                    .flatMap(cat => cat.items)
                    .filter(item => item.completed)
                    .reduce((sum, item) => sum + (parseInt(item.value.replace(/[$,]/g, '')) || 0), 0) * 0.22)
                    .toLocaleString()} in taxes
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refund Tracker */}
        <TabsContent value="tracker">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Refund Status Tracker
              </CardTitle>
              <CardDescription>
                Track your tax refund in real-time with IRS integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-200">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-blue-600 mb-2">Processing</div>
                <div className="text-blue-700 font-semibold">Your refund is being processed</div>
                <div className="text-sm text-blue-600 mt-2">
                  Expected deposit: March 15, 2025
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Refund Timeline</h4>
                
                {[
                  { step: 'Return Filed', date: 'Feb 28, 2025', status: 'complete', icon: FileText },
                  { step: 'Return Accepted', date: 'Mar 1, 2025', status: 'complete', icon: CheckSquare },
                  { step: 'Refund Processing', date: 'Mar 5, 2025', status: 'current', icon: Clock },
                  { step: 'Refund Approved', date: 'Mar 12, 2025', status: 'pending', icon: Sparkles },
                  { step: 'Refund Sent', date: 'Mar 15, 2025', status: 'pending', icon: Banknote }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === 'complete' ? 'bg-green-600 text-white' :
                        item.status === 'current' ? 'bg-blue-600 text-white animate-pulse' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          item.status === 'complete' ? 'text-green-800' :
                          item.status === 'current' ? 'text-blue-800' :
                          'text-gray-600'
                        }`}>
                          {item.step}
                        </div>
                        <div className="text-sm text-gray-600">{item.date}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Helpful Tips</h4>
                    <div className="text-sm text-yellow-700 mt-1 space-y-1">
                      <p>• Direct deposit typically takes 1-3 business days</p>
                      <p>• Paper checks can take 6-8 weeks to arrive</p>
                      <p>• Check your bank account regularly during the expected timeframe</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://www.irs.gov/refunds', '_blank')}
                >
                  Check IRS Website
                </Button>
                <Button variant="outline" className="flex-1">
                  Update Bank Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
