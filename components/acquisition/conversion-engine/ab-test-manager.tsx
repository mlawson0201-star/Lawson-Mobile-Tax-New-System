
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Play, Pause, Square as Stop, TrendingUp, Users, MousePointer, 
  Eye, Target, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ABTest, LandingPageVariant } from '@/lib/types/client-acquisition';

interface ABTestManagerProps {
  tests: ABTest[];
  onCreateTest: (test: Partial<ABTest>) => void;
  onUpdateTest: (testId: string, updates: Partial<ABTest>) => void;
  onDeleteTest: (testId: string) => void;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const CONFIDENCE_LEVELS = [
  { level: 95, color: 'text-green-600', label: 'High Confidence' },
  { level: 90, color: 'text-blue-600', label: 'Good Confidence' },
  { level: 80, color: 'text-yellow-600', label: 'Moderate Confidence' },
  { level: 0, color: 'text-red-600', label: 'Low Confidence' }
];

export default function ABTestManager({ tests, onCreateTest, onUpdateTest, onDeleteTest }: ABTestManagerProps) {
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getConfidenceColor = (confidence: number) => {
    for (const level of CONFIDENCE_LEVELS) {
      if (confidence >= level.level) {
        return level.color;
      }
    }
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    for (const level of CONFIDENCE_LEVELS) {
      if (confidence >= level.level) {
        return level.label;
      }
    }
    return 'Low Confidence';
  };

  const calculateWinner = (test: ABTest) => {
    if (test.variants.length < 2) return null;
    
    const sortedVariants = [...test.variants].sort((a, b) => b.conversionRate - a.conversionRate);
    const winner = sortedVariants[0];
    const runnerUp = sortedVariants[1];
    
    const improvement = ((winner.conversionRate - runnerUp.conversionRate) / runnerUp.conversionRate) * 100;
    
    return {
      variant: winner,
      improvement: improvement.toFixed(1),
      isSignificant: test.metrics.confidenceLevel >= 95
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDuration = (startDate: Date, endDate?: Date) => {
    const end = endDate || new Date();
    const diffTime = Math.abs(end.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">A/B Test Manager</h2>
          <p className="text-gray-600 mt-2">
            Optimize conversion rates with data-driven testing
          </p>
        </div>
        <Button onClick={() => onCreateTest({})}>
          Create New Test
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="running">Running Tests</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tests</p>
                    <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Running</p>
                    <p className="text-2xl font-bold text-green-600">
                      {tests.filter(t => t.status === 'running').length}
                    </p>
                  </div>
                  <Play className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {tests.filter(t => t.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Lift</p>
                    <p className="text-2xl font-bold text-purple-600">+12.3%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
              <CardDescription>
                Latest A/B tests and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tests.slice(0, 5).map((test) => {
                  const winner = calculateWinner(test);
                  return (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedTest(test)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(test.status)}`} />
                        <div>
                          <h4 className="font-medium text-gray-900">{test.name}</h4>
                          <p className="text-sm text-gray-600">{test.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">
                            {test.metrics.visitors.toLocaleString()}
                          </p>
                          <p className="text-gray-600">Visitors</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">
                            {(test.metrics.conversionRate * 100).toFixed(1)}%
                          </p>
                          <p className="text-gray-600">Conv. Rate</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-medium ${getConfidenceColor(test.metrics.confidenceLevel)}`}>
                            {test.metrics.confidenceLevel}%
                          </p>
                          <p className="text-gray-600">Confidence</p>
                        </div>
                        {winner && (
                          <div className="text-center">
                            <p className="font-medium text-green-600">
                              +{winner.improvement}%
                            </p>
                            <p className="text-gray-600">Lift</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="running" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tests.filter(t => t.status === 'running').map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Running
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{formatDuration(test.startDate, test.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Visitors</p>
                      <p className="font-medium">{test.metrics.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-medium">{test.metrics.conversions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Confidence</p>
                      <p className={`font-medium ${getConfidenceColor(test.metrics.confidenceLevel)}`}>
                        {test.metrics.confidenceLevel}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.min(100, (test.metrics.visitors / 1000) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={Math.min(100, (test.metrics.visitors / 1000) * 100)} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Variants Performance</p>
                    {test.variants.map((variant, index) => (
                      <div key={variant.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{variant.name}</span>
                        </div>
                        <span className="font-medium">
                          {(variant.conversionRate * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateTest(test.id, { status: 'paused' })}
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateTest(test.id, { status: 'completed' })}
                    >
                      <Stop className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedTest(test)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tests.filter(t => t.status === 'completed').map((test) => {
              const winner = calculateWinner(test);
              return (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {winner && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Winner Identified</span>
                        </div>
                        <p className="text-sm text-green-700">
                          <strong>{winner.variant.name}</strong> won with a{' '}
                          <strong>{winner.improvement}% improvement</strong> in conversion rate
                        </p>
                        {winner.isSignificant && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Statistically significant at 95% confidence
                          </p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total Visitors</p>
                        <p className="font-medium text-lg">{test.metrics.visitors.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Conversions</p>
                        <p className="font-medium text-lg">{test.metrics.conversions.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Final Results</p>
                      {test.variants.map((variant, index) => (
                        <div key={variant.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span>{variant.name}</span>
                            {winner?.variant.id === variant.id && (
                              <Badge variant="secondary" className="text-xs">Winner</Badge>
                            )}
                          </div>
                          <span className="font-medium">
                            {(variant.conversionRate * 100).toFixed(2)}%
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedTest(test)}
                        className="w-full"
                      >
                        View Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Rate Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Trends</CardTitle>
                <CardDescription>
                  Historical conversion rates across all tests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={tests.map(test => ({
                    name: test.name.substring(0, 10) + '...',
                    rate: test.metrics.conversionRate * 100
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                    <Line type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Test Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Test Status Distribution</CardTitle>
                <CardDescription>
                  Current status of all A/B tests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Running', value: tests.filter(t => t.status === 'running').length },
                        { name: 'Completed', value: tests.filter(t => t.status === 'completed').length },
                        { name: 'Paused', value: tests.filter(t => t.status === 'paused').length },
                        { name: 'Draft', value: tests.filter(t => t.status === 'draft').length }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Comparison */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Test Performance Comparison</CardTitle>
                <CardDescription>
                  Compare conversion rates across different tests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={tests.map(test => ({
                    name: test.name,
                    visitors: test.metrics.visitors,
                    conversions: test.metrics.conversions,
                    rate: test.metrics.conversionRate * 100
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="visitors" fill="#3B82F6" name="Visitors" />
                    <Bar yAxisId="left" dataKey="conversions" fill="#10B981" name="Conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Test Details Modal */}
      <AnimatePresence>
        {selectedTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTest(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedTest.name}</h3>
                    <p className="text-gray-600 mt-1">{selectedTest.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTest(null)}
                  >
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedTest.metrics.visitors.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Visitors</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <MousePointer className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">
                      {selectedTest.metrics.conversions.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Conversions</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">
                      {(selectedTest.metrics.conversionRate * 100).toFixed(2)}%
                    </p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Variant Performance</h4>
                    <div className="space-y-3">
                      {selectedTest.variants.map((variant, index) => (
                        <div key={variant.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                              <h5 className="font-medium">{variant.name}</h5>
                            </div>
                            <Badge variant="outline">
                              {(variant.conversionRate * 100).toFixed(2)}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{variant.headline}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Traffic Split</p>
                              <p className="font-medium">
                                {selectedTest.trafficSplit[index] || 50}%
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Visitors</p>
                              <p className="font-medium">
                                {Math.round(selectedTest.metrics.visitors * (selectedTest.trafficSplit[index] || 50) / 100).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Conversions</p>
                              <p className="font-medium">
                                {Math.round(selectedTest.metrics.conversions * variant.conversionRate / selectedTest.metrics.conversionRate).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTest(null)}
                    >
                      Close
                    </Button>
                    {selectedTest.status === 'running' && (
                      <Button
                        onClick={() => {
                          onUpdateTest(selectedTest.id, { status: 'completed' });
                          setSelectedTest(null);
                        }}
                      >
                        End Test
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
