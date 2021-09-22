require('dotenv').config({ path: 'src/.env' }) 
const { S3Client } = require('@aws-sdk/client-s3')

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.ADMIN_AWS_ACCESS_KEY
const secretAccessKey = process.env.ADMIN_AWS_SECRET_KEY

// Create an Amazon S3 service client object
// AWS S3 Bucket Access
const s3Client = new S3Client({
    region: region, 
    credentials:{ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey }
})

module.exports = {
    s3Client
}