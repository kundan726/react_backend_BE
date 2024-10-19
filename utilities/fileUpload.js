const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey : process.env.AWS_SECRET_KEY,
    region : process.env.AWS_REGION
});

const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl : 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            console.log("file",file)
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = Date.now().toString() + path.extname(file.originalname); 
            cb(null, fileName); 
        }
    })
})

module.exports = upload;