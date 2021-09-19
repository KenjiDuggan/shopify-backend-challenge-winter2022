require('dotenv').config({ path: 'src/.env' }) 

const { IAMClient , CreateUserCommand, AddClientIDToOpenIDConnectProviderCommand } = require('@aws-sdk/client-iam');

const region = process.env.AWS_BUCKET_REGION

/**
 * Create IAM service client
 */
const iamClient = new IAMClient({ region: region })

const createRole = async (name) => {
  console.log('this is the name getting used' + name)
  var params = {
    UserName: name
   };
   const command = new CreateUserCommand(params, function(err, data) {
    if (err) {
     console.log(err, err.stack); // an error occurred
     return err
    } else {
     console.log(data);           // successful response
     return data
    } 
  })
  const response = await iamClient.send(command)
  console.log(response)
  return response
}

/**
 * IAM policy for public directory access - Group Policy
 */
const publicGalleryPolicy = {
    Version: "2021-09-16",
    Statement: [
      {
        Effect: "Allow",
        Action: [
            "s3:PutObject",
            "s3:GetObject",
            "s3:GetObjectVersion",
            "s3:DeleteObject",
            "s3:DeleteObjectVersion"
        ],
        Resource: "arn:aws:s3:::shopify-backend-challenge-winter2022-public",  
      },
    ],
}

/**
 * IAM policy for granting private directory access - Private Policy
 */
// Set the parameters
// const myManagedPolicy = {
//     Version: "2012-10-17",
//     Statement: [
//       {
//         Effect: "Allow",
//         Action: "logs:CreateLogGroup",
//         Resource: "RESOURCE_ARN", // RESOURCE_ARN
//       },
//       {
//         Effect: "Allow",
//         Action: [
//           "dynamodb:DeleteItem",
//           "dynamodb:GetItem",
//           "dynamodb:PutItem",
//           "dynamodb:Scan",
//           "dynamodb:UpdateItem",
//         ],
//         Resource: "DYNAMODB_POLICY_NAME", // DYNAMODB_POLICY_NAME; e.g., "myDynamoDBName"
//       },
//     ],
//   };

// a client can be shared by different commands.
 
const params = {
  /** input parameters */
};
const command = new AddClientIDToOpenIDConnectProviderCommand(params);

module.exports = {
  createRole
}