
// Phase 3: Multi-location & Franchise Management API
import { NextRequest, NextResponse } from 'next/server';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  manager: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'corporate' | 'franchise' | 'partner';
  openDate: string;
  employees: number;
  clients: number;
  monthlyRevenue: number;
  performanceScore: number;
  services: string[];
  hours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
}

const LOCATIONS: Location[] = [
  {
    id: 'loc_001',
    name: 'LMT Tax - Downtown',
    address: '123 Main Street',
    city: 'Atlanta',
    state: 'GA',
    zip: '30309',
    phone: '(404) 555-0101',
    email: 'downtown@lmttax.com',
    manager: 'Sarah Johnson',
    status: 'active',
    type: 'corporate',
    openDate: '2020-01-15',
    employees: 8,
    clients: 450,
    monthlyRevenue: 85000,
    performanceScore: 94.2,
    services: ['Individual Tax', 'Business Tax', 'Tax Planning', 'Audit Support'],
    hours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '20:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '00:00', close: '00:00', closed: true }
    }
  },
  {
    id: 'loc_002',
    name: 'LMT Tax - Buckhead',
    address: '456 Peachtree Road',
    city: 'Atlanta',
    state: 'GA',
    zip: '30326',
    phone: '(404) 555-0102',
    email: 'buckhead@lmttax.com',
    manager: 'Michael Chen',
    status: 'active',
    type: 'corporate',
    openDate: '2021-03-10',
    employees: 12,
    clients: 680,
    monthlyRevenue: 125000,
    performanceScore: 97.8,
    services: ['Individual Tax', 'Business Tax', 'Tax Planning', 'Audit Support', 'Estate Planning'],
    hours: {
      monday: { open: '08:00', close: '19:00', closed: false },
      tuesday: { open: '08:00', close: '19:00', closed: false },
      wednesday: { open: '08:00', close: '19:00', closed: false },
      thursday: { open: '08:00', close: '20:00', closed: false },
      friday: { open: '08:00', close: '19:00', closed: false },
      saturday: { open: '09:00', close: '17:00', closed: false },
      sunday: { open: '12:00', close: '17:00', closed: false }
    }
  },
  {
    id: 'loc_003',
    name: 'LMT Tax Franchise - Marietta',
    address: '789 Cobb Parkway',
    city: 'Marietta',
    state: 'GA',
    zip: '30062',
    phone: '(770) 555-0103',
    email: 'marietta@lmttax.com',
    manager: 'David Rodriguez',
    status: 'active',
    type: 'franchise',
    openDate: '2022-01-20',
    employees: 6,
    clients: 320,
    monthlyRevenue: 62000,
    performanceScore: 89.5,
    services: ['Individual Tax', 'Business Tax', 'Tax Planning'],
    hours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '19:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '10:00', close: '15:00', closed: false },
      sunday: { open: '00:00', close: '00:00', closed: true }
    }
  }
];

const FRANCHISE_METRICS = {
  totalLocations: LOCATIONS.length,
  corporateOwned: LOCATIONS.filter(l => l.type === 'corporate').length,
  franchised: LOCATIONS.filter(l => l.type === 'franchise').length,
  partnerLocations: LOCATIONS.filter(l => l.type === 'partner').length,
  totalEmployees: LOCATIONS.reduce((sum, l) => sum + l.employees, 0),
  totalClients: LOCATIONS.reduce((sum, l) => sum + l.clients, 0),
  totalMonthlyRevenue: LOCATIONS.reduce((sum, l) => sum + l.monthlyRevenue, 0),
  averagePerformanceScore: LOCATIONS.reduce((sum, l) => sum + l.performanceScore, 0) / LOCATIONS.length
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get('locationId');
  const action = searchParams.get('action');
  const type = searchParams.get('type');

  if (locationId) {
    const location = LOCATIONS.find(l => l.id === locationId);
    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      location,
      recentActivity: [
        { type: 'client_added', message: 'New client registered', timestamp: '2025-08-26T10:30:00Z' },
        { type: 'revenue_milestone', message: 'Monthly revenue goal reached', timestamp: '2025-08-25T16:45:00Z' },
        { type: 'staff_update', message: 'New tax preparer hired', timestamp: '2025-08-24T09:15:00Z' }
      ]
    });
  }

  if (action === 'metrics') {
    return NextResponse.json({
      overview: FRANCHISE_METRICS,
      growth: {
        monthlyGrowth: 12.3,
        yearlyGrowth: 28.7,
        newLocationsThisYear: 2,
        expansionPipeline: 5
      },
      performance: {
        topPerformer: LOCATIONS.reduce((prev, current) => 
          (prev.performanceScore > current.performanceScore) ? prev : current
        ),
        improvementNeeded: LOCATIONS.filter(l => l.performanceScore < 90)
      }
    });
  }

  if (action === 'franchise-opportunities') {
    return NextResponse.json({
      opportunities: [
        {
          territory: 'North Atlanta',
          estimatedROI: '18-25%',
          investmentRange: '$75,000 - $125,000',
          populationDensity: 'High',
          competitorAnalysis: 'Low competition',
          status: 'Available'
        },
        {
          territory: 'Sandy Springs',
          estimatedROI: '20-28%',
          investmentRange: '$85,000 - $140,000',
          populationDensity: 'Very High',
          competitorAnalysis: 'Medium competition',
          status: 'Under Review'
        }
      ],
      franchiseSupport: [
        'Complete training program (6 weeks)',
        'Marketing materials and campaigns',
        'Technology platform access',
        'Ongoing operational support',
        'Territory protection',
        'Brand guidelines and standards'
      ]
    });
  }

  if (type) {
    const filteredLocations = LOCATIONS.filter(l => l.type === type);
    return NextResponse.json({ locations: filteredLocations });
  }

  return NextResponse.json({ 
    locations: LOCATIONS,
    metrics: FRANCHISE_METRICS,
    features: [
      'Centralized location management',
      'Performance tracking across all locations',
      'Franchise opportunity analysis',
      'Standardized operations and procedures',
      'Real-time reporting and analytics',
      'Territory management',
      'Multi-location scheduling',
      'Brand compliance monitoring'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const { action, locationData, managementAction } = await request.json();

    switch (action) {
      case 'add-location':
        const newLocation: Location = {
          id: `loc_${Date.now()}`,
          ...locationData,
          status: 'pending',
          openDate: new Date().toISOString(),
          performanceScore: 0,
          clients: 0,
          monthlyRevenue: 0
        };

        return NextResponse.json({
          success: true,
          location: newLocation,
          message: 'New location added successfully',
          nextSteps: [
            'Complete location setup',
            'Hire and train staff',
            'Launch marketing campaign',
            'Begin client acquisition'
          ]
        });

      case 'update-performance':
        return NextResponse.json({
          success: true,
          message: 'Performance metrics updated',
          newScore: Math.random() * 10 + 90,
          improvements: [
            'Client satisfaction increased by 5%',
            'Processing time reduced by 12%',
            'Revenue targets exceeded by 8%'
          ]
        });

      case 'franchise-application':
        return NextResponse.json({
          success: true,
          applicationId: `app_${Date.now()}`,
          message: 'Franchise application submitted successfully',
          status: 'Under Review',
          nextSteps: [
            'Background check and verification',
            'Financial qualification review',
            'Market analysis for proposed territory',
            'Interview with franchise team'
          ],
          timeline: '3-4 weeks for approval process'
        });

      case 'bulk-update':
        return NextResponse.json({
          success: true,
          message: `Updated ${locationData.locationIds.length} locations`,
          affectedLocations: locationData.locationIds.length
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Multi-location operation failed' 
    }, { status: 500 });
  }
}
