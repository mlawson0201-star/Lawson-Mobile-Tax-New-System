

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Shield, 
  Zap,
  Building2,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  Banknote,
  Wallet,
  Smartphone,
  Globe,
  Lock,
  ArrowRight,
  Receipt
} from 'lucide-react'
import { toast } from 'sonner'

// Service pricing with dynamic adjustments
const SERVICE_PRICING = {
  'individual-basic': { base: 199, complexity: 1, rush: 50 },
  'individual-complex': { base: 349, complexity: 1.5, rush: 75 },
  'business-small': { base: 599, complexity: 2, rush: 150 },
  'business-large': { base: 1299, complexity: 3, rush: 300 },
  'tax-planning': { base: 299, complexity: 1.2, rush: 60 },
  'debt-resolution': { base: 2999, complexity: 2.5, rush: 500 },
  'bookkeeping': { base: 150, complexity: 1, rush: 30 },
  'consultation': { base: 150, complexity: 1, rush: 25 }
}

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: 2.9 },
  { id: 'ach', name: 'Bank Transfer (ACH)', icon: Building2, fee: 0.8 },
  { id: 'crypto', name: 'Cryptocurrency', icon: Wallet, fee: 1.5 },
  { id: 'apple-pay', name: 'Apple Pay', icon: Smartphone, fee: 2.9 },
  { id: 'google-pay', name: 'Google Pay', icon: Globe, fee: 2.9 }
]

const INSTALLMENT_PLANS = [
  { months: 1, fee: 0, discount: 0 },
  { months: 3, fee: 5, discount: 0 },
  { months: 6, fee: 10, discount: 5 },
  { months: 12, fee: 15, discount: 10 }
]

interface PaymentCalculation {
  subtotal: number
  tax: number
  fees: number
  discount: number
  total: number
  installmentAmount?: number
}

export default function AdvancedPaymentSystem() {
  const [selectedService, setSelectedService] = useState('individual-basic')
  const [isRush, setIsRush] = useState(false)
  const [isComplex, setIsComplex] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [installmentPlan, setInstallmentPlan] = useState(1)
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0)
  const [calculation, setCalculation] = useState<PaymentCalculation | null>(null)
  const [processing, setProcessing] = useState(false)

  // Calculate pricing dynamically
  useEffect(() => {
    const service = SERVICE_PRICING[selectedService as keyof typeof SERVICE_PRICING]
    if (!service) return

    let subtotal = service.base
    
    // Apply complexity multiplier
    if (isComplex) {
      subtotal *= service.complexity
    }
    
    // Add rush fee
    if (isRush) {
      subtotal += service.rush
    }
    
    // Calculate tax (8.25% for example)
    const tax = subtotal * 0.0825
    
    // Calculate payment processing fee
    const selectedMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod)
    const fees = (subtotal + tax) * (selectedMethod?.fee || 2.9) / 100
    
    // Apply loyalty discount
    const discount = subtotal * (loyaltyDiscount / 100)
    
    // Calculate total
    const total = subtotal + tax + fees - discount
    
    // Calculate installment amount
    const plan = INSTALLMENT_PLANS.find(p => p.months === installmentPlan)
    const installmentFee = plan ? total * (plan.fee / 100) : 0
    const planDiscount = plan ? total * (plan.discount / 100) : 0
    const adjustedTotal = total + installmentFee - planDiscount
    const installmentAmount = adjustedTotal / installmentPlan

    setCalculation({
      subtotal,
      tax,
      fees,
      discount: discount + planDiscount,
      total: adjustedTotal,
      installmentAmount
    })
  }, [selectedService, isRush, isComplex, paymentMethod, installmentPlan, loyaltyDiscount])

  const processPayment = async () => {
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Payment processed successfully!')
    setProcessing(false)
  }

  const scheduleConsultation = () => {
    toast.success('Consultation scheduled! Calendar invitation sent.')
  }

  const downloadInvoice = () => {
    toast.success('Invoice downloaded successfully!')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <DollarSign className="h-8 w-8" />
            Advanced Payment System
          </CardTitle>
          <CardDescription className="text-green-100">
            Dynamic pricing, multiple payment methods, and flexible installment plans
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Payment Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Service Configuration</CardTitle>
            <CardDescription>Choose your service and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Type */}
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual-basic">Individual Tax Return (Basic)</SelectItem>
                  <SelectItem value="individual-complex">Individual Tax Return (Complex)</SelectItem>
                  <SelectItem value="business-small">Small Business Tax</SelectItem>
                  <SelectItem value="business-large">Large Business Tax</SelectItem>
                  <SelectItem value="tax-planning">Tax Planning Session</SelectItem>
                  <SelectItem value="debt-resolution">Debt Resolution</SelectItem>
                  <SelectItem value="bookkeeping">Bookkeeping Service</SelectItem>
                  <SelectItem value="consultation">Tax Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rush Service (24-48 hours)</Label>
                  <p className="text-sm text-gray-600">Expedited processing</p>
                </div>
                <Switch checked={isRush} onCheckedChange={setIsRush} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Complex Situation</Label>
                  <p className="text-sm text-gray-600">Multiple income sources, investments</p>
                </div>
                <Switch checked={isComplex} onCheckedChange={setIsComplex} />
              </div>
            </div>

            {/* Loyalty Discount */}
            <div className="space-y-2">
              <Label>Loyalty Discount (%)</Label>
              <Select value={loyaltyDiscount.toString()} onValueChange={(v) => setLoyaltyDiscount(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Discount</SelectItem>
                  <SelectItem value="5">New Client (5%)</SelectItem>
                  <SelectItem value="10">Returning Client (10%)</SelectItem>
                  <SelectItem value="15">VIP Client (15%)</SelectItem>
                  <SelectItem value="20">Referral Bonus (20%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Options</CardTitle>
            <CardDescription>Choose your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Methods */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <method.icon className="h-5 w-5" />
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <Badge variant="outline">{method.fee}% fee</Badge>
                </div>
              ))}
            </div>

            {/* Installment Plans */}
            <div className="space-y-2">
              <Label>Installment Plan</Label>
              <Select value={installmentPlan.toString()} onValueChange={(v) => setInstallmentPlan(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INSTALLMENT_PLANS.map((plan) => (
                    <SelectItem key={plan.months} value={plan.months.toString()}>
                      {plan.months === 1 ? 'Pay in Full' : `${plan.months} Monthly Payments`}
                      {plan.discount > 0 && ` (${plan.discount}% discount)`}
                      {plan.fee > 0 && ` (+${plan.fee}% fee)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      {calculation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Payment Summary
              <Button variant="outline" onClick={downloadInvoice} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${calculation.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.25%)</span>
                    <span>${calculation.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>${calculation.fees.toFixed(2)}</span>
                  </div>
                  {calculation.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${calculation.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculation.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Plan</h4>
                  {installmentPlan === 1 ? (
                    <p className="text-lg font-bold text-blue-600">
                      Pay ${calculation.total.toFixed(2)} today
                    </p>
                  ) : (
                    <div>
                      <p className="text-lg font-bold text-blue-600">
                        ${calculation.installmentAmount?.toFixed(2)} × {installmentPlan} months
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        First payment due today
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={processPayment} 
                  disabled={processing}
                  className="flex-1"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Secure Payment
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={scheduleConsultation}
                  className="flex-1"
                  size="lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Security */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <h3 className="font-semibold">256-bit SSL Encryption</h3>
          <p className="text-sm text-gray-600">Bank-level security</p>
        </Card>
        
        <Card className="text-center p-4">
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <h3 className="font-semibold">PCI DSS Compliant</h3>
          <p className="text-sm text-gray-600">Secure payment processing</p>
        </Card>
        
        <Card className="text-center p-4">
          <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <h3 className="font-semibold">Instant Processing</h3>
          <p className="text-sm text-gray-600">Real-time payment confirmation</p>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Payment history and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'TX-001', client: 'John Smith', service: 'Individual Tax Return', amount: 299, status: 'completed', date: '2024-01-15' },
              { id: 'TX-002', client: 'Sarah Johnson', service: 'Business Tax', amount: 899, status: 'pending', date: '2024-01-14' },
              { id: 'TX-003', client: 'Mike Davis', service: 'Tax Planning', amount: 399, status: 'completed', date: '2024-01-13' },
              { id: 'TX-004', client: 'Lisa Wilson', service: 'Debt Resolution', amount: 2999, status: 'installment', date: '2024-01-12' }
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Receipt className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{transaction.client}</p>
                    <p className="text-sm text-gray-600">{transaction.service}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount}</p>
                  <Badge 
                    variant={
                      transaction.status === 'completed' ? 'default' : 
                      transaction.status === 'pending' ? 'secondary' : 'outline'
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Your payment information is secure and encrypted</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              SSL Secured
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              PCI Compliant
            </span>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
