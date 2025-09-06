
import { S3Client } from '@aws-sdk/client-s3'

export function getBucketConfig() {
  return {
    bucketName: process.env.AWS_BUCKET_NAME || 'formality-tax-documents',
    folderPrefix: process.env.AWS_FOLDER_PREFIX || 'production/',
    region: process.env.AWS_REGION || 'us-east-1'
  }
}

export function createS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  })
}

export function validateS3Config() {
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_BUCKET_NAME']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing AWS configuration: ${missing.join(', ')}`)
  }
  
  return true
}
