
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action, domain } = await request.json()
    
    // This would integrate with DNS APIs in production
    // For now, we'll provide instructions and status
    
    if (action === 'check_dns') {
      // Mock DNS check - in production, this would query actual DNS
      const dnsStatus = {
        domain: domain || 'lawsonmobiletax.com',
        nameservers: [
          'vera.ns.cloudflare.com',
          'walt.ns.cloudflare.com'
        ],
        provider: 'cloudflare',
        emailRecords: {
          mx: { exists: false, value: 'Missing' },
          txt_spf: { exists: false, value: 'Missing' },
          txt_verification: { exists: false, value: 'Missing' },
          cname_autodiscover: { exists: false, value: 'Missing' },
          cname_email: { exists: false, value: 'Missing' }
        },
        issue: 'Microsoft 365 DNS records missing from Cloudflare',
        solution: 'Add missing DNS records or move nameservers back to GoDaddy'
      }
      
      return NextResponse.json({ success: true, status: dnsStatus })
    }
    
    if (action === 'get_fix_instructions') {
      const instructions = {
        easy_fix: {
          title: 'Move DNS Back to GoDaddy (Recommended)',
          steps: [
            'Go to https://godaddy.com and sign in',
            'Navigate to My Products → All Products',
            'Find lawsonmobiletax.com and click DNS',
            'Click "Change" next to Nameservers',
            'Select "I\'ll use my own nameservers"',
            'Choose "Default (GoDaddy)" nameservers',
            'Click Save',
            'Wait 24-48 hours for changes to propagate',
            'Your email will work automatically!'
          ],
          time: '5 minutes + 24-48 hours propagation',
          difficulty: 'Easy'
        },
        advanced_fix: {
          title: 'Add DNS Records to Cloudflare',
          steps: [
            'Go to https://dash.cloudflare.com',
            'Find lawsonmobiletax.com domain',
            'Click DNS tab',
            'Add MX record: @ → lawsonmobiletax-com.mail.protection.outlook.com (Priority: 0)',
            'Add TXT record: @ → NETORGFT9926740.onmicrosoft.com',
            'Add TXT record: @ → v=spf1 include:secureserver.net -all',
            'Add CNAME record: autodiscover → autodiscover.outlook.com',
            'Add CNAME record: email → emaildot.godaddy.com',
            'Save all records',
            'Wait 24-48 hours for propagation'
          ],
          time: '15 minutes + 24-48 hours propagation',
          difficulty: 'Advanced'
        }
      }
      
      return NextResponse.json({ success: true, instructions })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('DNS fix API error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function GET() {
  // Provide current DNS status
  const status = {
    domain: 'lawsonmobiletax.com',
    email_working: false,
    issue: 'DNS records missing for Microsoft 365',
    last_checked: new Date().toISOString(),
    fix_urls: {
      godaddy: 'https://godaddy.com',
      cloudflare: 'https://dash.cloudflare.com',
      diagnostic_tool: '/email-diagnostic'
    }
  }
  
  return NextResponse.json(status)
}
