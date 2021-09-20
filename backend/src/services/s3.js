require('dotenv').config({ path: 'src/.env' }) 
const fs = require('fs')
const bucketName = process.env.AWS_BUCKET_NAME

const { PutObjectCommand, GetObjectCommand, ListObjectsCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require('./s3Client')

// Uploads an image to S3 bucket
const putImage = async(file, folder, extension) => {
    const fileStream = fs.createReadStream(file.path)
    
    const params = {
        Bucket: bucketName,
        Body: fileStream,
        Key: folder + file.filename + '.' + extension, // folder as prefix to determine if Public or Username directory
    }
 
    try {
        const results = await s3Client.send(new PutObjectCommand(params))
        return results
    } catch (err) {
        console.log("Error", err)
    }
}

// Get Image Object By Key
const getImageByKey = async(fileKey) => {
    const params = {
        Key: fileKey,
        Bucket: bucketName,
    }

    try {
        const results = await s3Client.send(new GetObjectCommand(params))
        return results
    } catch (err) {
        console.log("Error", err)
    }
}

// Delete Image Object By Key
const deleteImageByKey = async(fileKey) => {
    const params = {
        Key: fileKey,
        Bucket: bucketName,
    }

    try {
        const results = await s3Client.send(new DeleteObjectCommand(params))
        return results
    } catch (err) {
        console.log("Error", err)
    }
}

// Gets a list of Objects so I can display the URL's on client-side
const getImagesByPrefix = async(prefix) => {
    const params = {
        Bucket: bucketName,
        Prefix: prefix // which determines the 'folder'
    }
 
    try {
        const results = await s3Client.send(new ListObjectsCommand(params))
        return results
    } catch (err) {
        console.log("Error", err)
    }
}

module.exports = {
    putImage,
    getImageByKey,
    getImagesByPrefix,
    deleteImageByKey
}