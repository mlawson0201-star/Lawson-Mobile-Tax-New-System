#!/bin/bash

# Deployment Fix Script for Lawson Mobile Tax System
echo "🚀 Starting deployment fix for Lawson Mobile Tax System..."

# Set environment variables for Vercel
export NEXTAUTH_SECRET="lawson-mobile-tax-production-secret-key-2025-comprehensive-system"
export NEXTAUTH_URL="https://lawsonmobiletax.com"
export DATABASE_URL="postgresql://lawson_user:lawson_secure_pass_2025@localhost:5432/lawson_mobile_tax_comprehensive_db"

# Stripe Configuration
export STRIPE_SECRET_KEY="sk_live_51234567890abcdef_production_key_lawson_mobile_tax"
export STRIPE_PUBLISHABLE_KEY="pk_live_51234567890abcdef_production_key_lawson_mobile_tax"
export STRIPE_WEBHOOK_SECRET="whsec_production_webhook_secret_lawson_mobile_tax"

# OpenAI Configuration for Melika AI
export OPENAI_API_KEY="sk-proj-production-openai-key-for-melika-ai-comprehensive-system"

# Email Service
export RESEND_API_KEY="re_production_key_for_lawson_mobile_tax_comprehensive"

# AWS Configuration
export AWS_ACCESS_KEY_ID="AKIA_PRODUCTION_ACCESS_KEY_LAWSON"
export AWS_SECRET_ACCESS_KEY="production_secret_access_key_lawson_mobile_tax"
export AWS_REGION="us-east-1"
export AWS_S3_BUCKET="lawson-mobile-tax-documents-production"

# Feature Flags - ALL ENABLED
export MELIKA_AI_ENABLED="true"
export CRM_ENABLED="true"
export PAYMENT_PROCESSING_ENABLED="true"
export TRAINING_MODULES_ENABLED="true"
export ANALYTICS_ENABLED="true"
export PHASE_1_FEATURES_ENABLED="true"
export PHASE_2_FEATURES_ENABLED="true"
export GOHIGHLEVEL_ENABLED="true"
export AUTOMATION_ENABLED="true"
export REAL_TIME_PROCESSING_ENABLED="true"

# GoHighLevel Integration
export GOHIGHLEVEL_API_KEY="production_ghl_api_key_lawson_mobile_tax"
export GOHIGHLEVEL_LOCATION_ID="production_location_id_lawson"
export GOHIGHLEVEL_WEBHOOK_SECRET="production_webhook_secret_ghl_lawson"

# Environment
export NODE_ENV="production"
export VERCEL_ENV="production"

# Additional Production Settings
export ENABLE_BANK_PRODUCTS="true"
export ENABLE_AUDIT_DEFENSE="true"
export ENABLE_WHITE_LABEL="true"
export ENABLE_AUTOMATION="true"

echo "✅ Environment variables set"

# Install dependencies with legacy peer deps to avoid conflicts
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --force

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🏗️ Building application..."
npm run build

echo "🚀 Deployment fix completed!"
echo "🌐 The comprehensive Lawson Mobile Tax system should now be ready for deployment at lawsonmobiletax.com"
