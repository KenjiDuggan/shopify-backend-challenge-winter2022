require('dotenv').config()
const fs = require('fs')

const { S3 } = require('@aws-sdk/client-s3')

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
const uploadFile = (file, extension) => {
    const fileStream = fs.createReadStream(file.path)
 
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename + extension
    }

    return s3.upload(uploadParams)
}

// Downloads File From S3 Bucket
const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }

    return s3.getObject(downloadParams).createReadStream()
}

// Gets a list of Objects so I can display the URL's on client-side
const getPublicList = (max) => {
    const params = {     
        Bucket: bucketName,
        MaxKeys: max,
    }

    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            console.log(err, err.stack)
            return err // an error occurred
        } else {
            console.log(data)
            return data // successful response
        }
    })
}
 
module.exports = {
    uploadFile,
    getFileStream,
    getPublicList
}