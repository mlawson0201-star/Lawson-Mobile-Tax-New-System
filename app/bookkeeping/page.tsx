
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Building2
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function BookkeepingDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load bookkeeping data
    setLoading(false)
  }, [session])

  // Sample bookkeeping data
  const bookkeepingData = {
    monthlyRevenue: 45250,
    monthlyExpenses: 32180,
    netIncome: 13070,
    revenueGrowth: 8.5,
    expenseGrowth: -2.3,
    profitMargin: 28.9,
    outstandingInvoices: 8,
    pendingPayments: 12500,
    overdueInvoices: 2,
    overdueAmount: 3200
  }

  const recentTransactions = [
    { date: '2024-12-15', description: 'Client Payment - ABC Corp', amount: 2500, type: 'income', category: 'Services' },
    { date: '2024-12-14', description: 'Office Supplies', amount: -185, type: 'expense', category: 'Supplies' },
    { date: '2024-12-13', description: 'Software Subscription', amount: -99, type: 'expense', category: 'Software' },
    { date: '2024-12-12', description: 'Client Payment - XYZ LLC', amount: 1800, type: 'income', category: 'Services' },
    { date: '2024-12-11', description: 'Internet Service', amount: -120, type: 'expense', category: 'Utilities' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-medium text-gray-900">Loading your bookkeeping dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Calculator className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bookkeeping Dashboard</h1>
                <p className="text-sm text-green-600">Financial Management & Reporting</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {session?.user?.name || 'Business Owner'}
                </p>
                <p className="text-sm text-gray-600">Professional Bookkeeping</p>
              </div>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Tax Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${bookkeepingData.monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{bookkeepingData.revenueGrowth}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${bookkeepingData.monthlyExpenses.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{bookkeepingData.expenseGrowth}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Net Income</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${bookkeepingData.netIncome.toLocaleString()}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">Profit Margin: {bookkeepingData.profitMargin}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${bookkeepingData.pendingPayments.toLocaleString()}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">{bookkeepingData.outstandingInvoices} invoices</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Profit Trend</CardTitle>
                  <CardDescription>Revenue vs Expenses over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Chart visualization would appear here</p>
                      <p className="text-sm text-gray-500">Revenue: ${bookkeepingData.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Expenses: ${bookkeepingData.monthlyExpenses.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>Monthly expense categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Expense breakdown chart</p>
                      <div className="text-left mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Office Expenses</span>
                          <span className="text-sm font-medium">$8,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Software & Tools</span>
                          <span className="text-sm font-medium">$2,300</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Marketing</span>
                          <span className="text-sm font-medium">$4,200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookkeepingData.overdueInvoices > 0 && (
                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-red-900">Overdue Invoices</h3>
                        <p className="text-sm text-red-700">
                          {bookkeepingData.overdueInvoices} invoices totaling ${bookkeepingData.overdueAmount.toLocaleString()} are overdue
                        </p>
                      </div>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm">
                      Review Overdue Invoices
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Tax Ready Books</h3>
                      <p className="text-sm text-green-700">
                        Your books are up-to-date and tax-ready for this quarter
                      </p>
                    </div>
                  </div>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700" size="sm">
                    Download Tax Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'income' ? 
                            <TrendingUp className="h-5 w-5 text-green-600" /> : 
                            <DollarSign className="h-5 w-5 text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <FileText className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Profit & Loss Statement</h3>
                  <p className="text-sm text-gray-600 mb-4">Monthly P&L with year-over-year comparison</p>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">Cash Flow Statement</h3>
                  <p className="text-sm text-gray-600 mb-4">Track money in and out of your business</p>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Building2 className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">Balance Sheet</h3>
                  <p className="text-sm text-gray-600 mb-4">Assets, liabilities, and equity overview</p>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Management</CardTitle>
                <CardDescription>Create, send, and track your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Invoice Management</h3>
                  <p className="text-gray-600 mb-6">Create professional invoices and track payments</p>
                  <div className="flex gap-4 justify-center">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Create New Invoice
                    </Button>
                    <Button variant="outline">
                      View All Invoices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Bookkeeping Settings</CardTitle>
                <CardDescription>Configure your bookkeeping preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Account Integration</h4>
                  <p className="text-sm text-gray-600 mb-4">Connect your bank accounts and credit cards for automatic transaction import</p>
                  <Button variant="outline">
                    Connect Bank Account
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">QuickBooks Integration</h4>
                  <p className="text-sm text-gray-600 mb-4">Sync your data with QuickBooks Online</p>
                  <Button variant="outline">
                    Connect QuickBooks
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Report Settings</h4>
                  <p className="text-sm text-gray-600 mb-4">Customize your financial reports and automation</p>
                  <Button variant="outline">
                    Configure Reports
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Contact Your Bookkeeper</h4>
                  <p className="text-sm text-gray-600 mb-4">Get help with your bookkeeping needs</p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open(`tel:${COMPANY_CONFIG.contact.phone}`, '_self')}
                  >
                    Call Bookkeeping Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
