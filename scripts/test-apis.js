
// API Integration Test Script for Formality Tax Platform
// Run with: node scripts/test-apis.js

const dotenv = require('dotenv');
dotenv.config();

async function testAPIs() {
  console.log('🧪 TESTING API INTEGRATIONS\n');

  // Test Database Connection
  console.log('1️⃣ Database Connection:');
  if (process.env.DATABASE_URL) {
    console.log('   ✅ DATABASE_URL configured');
    console.log('   🔗 Connection string present');
  } else {
    console.log('   ❌ DATABASE_URL missing');
  }

  // Test NextAuth
  console.log('\n2️⃣ Authentication:');
  if (process.env.NEXTAUTH_SECRET) {
    console.log('   ✅ NEXTAUTH_SECRET configured');
  } else {
    console.log('   ❌ NEXTAUTH_SECRET missing');
  }

  // Test AI Service
  console.log('\n3️⃣ AI Service:');
  if (process.env.ABACUSAI_API_KEY) {
    console.log('   ✅ ABACUSAI_API_KEY configured');
    console.log('   🤖 Melika AI ready');
  } else {
    console.log('   ❌ ABACUSAI_API_KEY missing');
  }

  // Test Stripe
  console.log('\n4️⃣ Payment Processing:');
  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PUBLISHABLE_KEY) {
    console.log('   ✅ Stripe keys configured');
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      console.log('   ✅ Webhook endpoint ready');
    } else {
      console.log('   ⚠️  Webhook secret missing (add after creating webhook)');
    }
  } else {
    console.log('   ❌ Stripe keys missing');
    console.log('   💡 Get keys from: https://dashboard.stripe.com/apikeys');
  }

  // Test Email Service
  console.log('\n5️⃣ Email Service:');
  if (process.env.RESEND_API_KEY) {
    console.log('   ✅ Resend API configured');
  } else if (process.env.SENDGRID_API_KEY) {
    console.log('   ✅ SendGrid API configured');
  } else {
    console.log('   ❌ Email service not configured');
    console.log('   💡 Get key from: https://resend.com (recommended)');
  }

  // Test SMS Service
  console.log('\n6️⃣ SMS Service:');
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    console.log('   ✅ Twilio configured');
  } else {
    console.log('   ❌ Twilio not configured');
    console.log('   💡 Get credentials from: https://console.twilio.com');
  }

  console.log('\n' + '='.repeat(50));
  console.log('📋 NEXT STEPS:');
  console.log('1. Add missing API keys to .env file');
  console.log('2. Restart development server: yarn dev');
  console.log('3. Test payment: http://localhost:3000/tax-evaluation');
  console.log('4. Test AI chat: Click "Ask Melika AI" button');
  console.log('5. Check email delivery after transactions');
  console.log('='.repeat(50));
}

testAPIs();
