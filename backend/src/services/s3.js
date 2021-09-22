require('dotenv').config({ path: 'src/.env' }) 
const fs = require('fs')
const bucketName = process.env.AWS_BUCKET_NAME

const { PutObjectCommand, GetObjectCommand, ListObjectsCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { s3Client } = require('./s3Client')

// Uploads an image to S3 bucket
const putImage = async(file, folder) => {
    const fileStream = fs.createReadStream(file.path)
    
    const params = {
        Bucket: bucketName,
        Body: fileStream,
        Key: folder + file.filename + '.' + extension, // folder as prefix to determine if Public or Username directory
    }
 
    try {
        const results = await s3Client.send(new PutObjectCommand(params))
        console.log(req.userData)
         
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
    console.log(fileKey)
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
    console.log(prefix)
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

// Checks if folder name exists in bucket, if not then creates it
const checkIfPrefixExists = async(prefix) => {
    let params = {
            Bucket: bucketName,
            Prefix: prefix // which determines the 'folder'
    }
    let results;
    try {
        results = await s3Client.send(new ListObjectsCommand(params))
    } catch(err) {
        console.log("Error", err)
    }

    const fileStream = fs.createReadStream('src/uploads/placeholder.jpg')
    params = {
        Bucket: bucketName,
        Body: fileStream,
        Key: prefix + 'placeholder.jpg', // folder as prefix to determine if Public or Username directory
    }
    // If the results is zero, there is no folder, so we create one under the username
    if(results.length == 0) {
        try {
            const results = await s3Client.send(new PutObjectCommand(params))
            console.log('here are the results: ' + results)
            return results
        } catch (err) {
            console.log("Error", err)
        }
    } else {
        console.log('folder should exist')
        return 'Folder should already exist'
    }
}

module.exports = {
    putImage,
    getImageByKey,
    getImagesByPrefix,
    deleteImageByKey,
    checkIfPrefixExists
}