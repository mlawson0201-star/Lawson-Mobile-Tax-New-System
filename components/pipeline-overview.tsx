
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/utils'

// Mock pipeline data
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

export function PipelineOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
        <CardDescription>
          Track your leads through the conversion process
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pipeline stages */}
        <div className="space-y-4">
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
        </div>

        {/* Summary */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {pipelineStages.reduce((sum, stage) => sum + stage.count, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Leads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </div>
              <div className="text-sm text-gray-500">Pipeline Value</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
