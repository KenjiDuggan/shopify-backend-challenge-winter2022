# shopify-backend-challenge-winter2022
 
## Purpose
An image repository for the Shopify Summer 2021 Intern Challenge. Currently, the backend is in progress and a frontend is more or less in place for a basic demonstration. The idea is that the backend is used to create new users that can add and delete public/private images to their account. This is an open-ended challenge...

## Choice of Image Storage
The options that I have used in the past for media files would include a hosted database(like MongoDB) and S3 Service from Amazon Web Services. I will be using S3 AWS for the provided reason:

- Low Cost: With AWS, you only pay for what you use. Amazon S3 automatically makes sure you have 3 different copies of your uploaded objects(in our case images) on different servers. A database on a server on the other hand start with a base cost and requires maintenance, which usually costs as well
- Availability: Amazon provides 99.99% availability rates, with its robust replica processing software. On a real server, you would have to have made backups somehow otherwise a data loss will result in permanent loss
- Security: Data stored in S3 are secure by default, following the principle of least privilege. By default this means owner and bucket admin have access to the ressources. Your own dedicated server might not follow security measures which can lead to more risk of loss.
- Simple Data Transfer: Built-in options for cloud data migration. If you are to do this manually it would probably be expensive and time-consuming. 

## Endpoints
* POST /user/register: Register a new user
* POST /user/login: Login for existing user 
* GET /user/me: Get basic information on user 

* GET /images/public: Gets list of images from Public/ directory in AWS S3 bucket
* GET .images/private: Gets list of images from <Username>/ directory in AWS S3 bucket
* GET /images/:key: Get image by its key
* POST /images: Posts an image(media) with multer, uploads it to S3 bucket in the right directory
* DELETE /images/{id}: Deletes the image by key
 
## Auth
Currently, authorization is done through middleware wherever needed. User information is stored in a JWT token for the backend to recognize who is currently making a request and allow access accordingly. See `src/middleware/auth.js`.

## Running the backend
1. Make sure that [mongodb](https://docs.mongodb.com/manual/installation/) and [nodejs](https://nodejs.org/en/download/) (needed for npm) is installed on your machine
2. Run MongoDB
3. Run the server using:
```
npm install #install dependencies
npm start #start a mongodb container and a dev container for the api
```
4. Make requests on `http://localhost:3001`

## Running the frontend (IGNORE NOT PROPERLY CONNECTED TO BACKEND YET)
1. Run the server using:
```
npm install #install dependencies
npm run dev #run client
```
2. Make requests on `http://localhost:3000`
