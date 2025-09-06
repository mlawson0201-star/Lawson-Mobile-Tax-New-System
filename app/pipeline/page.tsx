
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react'

const pipelineStages = [
  {
    name: 'Initial Contact',
    count: 45,
    value: 67500,
    color: 'bg-blue-500'
  },
  {
    name: 'Qualified',
    count: 23,
    value: 42000,
    color: 'bg-yellow-500'
  },
  {
    name: 'Proposal Sent',
    count: 12,
    value: 28500,
    color: 'bg-orange-500'
  },
  {
    name: 'Negotiation',
    count: 8,
    value: 19200,
    color: 'bg-purple-500'
  },
  {
    name: 'Won',
    count: 15,
    value: 32500,
    color: 'bg-green-500'
  }
]

const totalValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0)

export default function PipelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        <p className="text-gray-600 mt-2">
          Track leads through your conversion process and analyze performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-600 mb-2">103</div>
            <p className="text-gray-600 text-sm">Total Leads</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
            <p className="text-gray-600 text-sm">Conversion Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-600 mb-2">{formatCurrency(totalValue)}</div>
            <p className="text-gray-600 text-sm">Pipeline Value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-orange-600 mb-2">15.2%</div>
            <p className="text-gray-600 text-sm">Growth Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
          <CardDescription>
            Visual representation of your sales pipeline stages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pipelineStages.map((stage, index) => {
            const percentage = totalValue > 0 ? (stage.value / totalValue) * 100 : 0
            
            return (
              <div key={stage.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <span className="font-medium text-sm">{stage.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {stage.count} leads
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(stage.value)}
                    </div>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
