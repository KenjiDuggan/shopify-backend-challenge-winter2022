require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
 
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
 
// AWS S3 Bucket Access
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// Uploads File to S3 Bucket
const uploadFile = (file) => {
    console.log(file.path);
    const fileStream = fs.createReadStream(file.path)

    console.log(file.filename)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename + ".jpg"
    }

    return s3.upload(uploadParams).promise()
}

// Downloads File From S3 Bucket
const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }

    return s3.getObject(downloadParams).createReadStream()
}
 
module.exports = {
    uploadFile,
    getFileStream
}