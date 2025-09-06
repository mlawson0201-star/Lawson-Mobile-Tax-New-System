
import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand,
  CopyObjectCommand
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createS3Client, getBucketConfig } from './aws-config'

const s3Client = createS3Client()
const { bucketName, folderPrefix } = getBucketConfig()

export async function uploadFile(buffer: Buffer, fileName: string): Promise<string> {
  try {
    const key = `${folderPrefix}uploads/${Date.now()}-${fileName}`
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: getContentType(fileName),
      ServerSideEncryption: 'AES256'
    })

    await s3Client.send(command)
    return key // Return full S3 key as cloud_storage_path
  } catch (error) {
    console.error('S3 upload error:', error)
    throw new Error('File upload failed')
  }
}

export async function downloadFile(key: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    })

    // Generate signed URL for secure download
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    return signedUrl
  } catch (error) {
    console.error('S3 download error:', error)
    throw new Error('File download failed')
  }
}

export async function deleteFile(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key
    })

    await s3Client.send(command)
    return true
  } catch (error) {
    console.error('S3 delete error:', error)
    throw new Error('File deletion failed')
  }
}

export async function renameFile(oldKey: string, newKey: string): Promise<string> {
  try {
    // Copy file to new location
    const copyCommand = new CopyObjectCommand({
      Bucket: bucketName,
      CopySource: `${bucketName}/${oldKey}`,
      Key: newKey
    })
    
    await s3Client.send(copyCommand)
    
    // Delete old file
    await deleteFile(oldKey)
    
    return newKey
  } catch (error) {
    console.error('S3 rename error:', error)
    throw new Error('File rename failed')
  }
}

function getContentType(fileName: string): string {
  const ext = fileName.toLowerCase().split('.').pop()
  const types: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain'
  }
  return types[ext || ''] || 'application/octet-stream'
}
