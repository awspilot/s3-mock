async = require('async')
AWS = require('aws-sdk')

s3 = new AWS.S3({
	endpoint: 'http://localhost:10003/',
	region: 'us-east-1',
	credentials: {
		accessKeyId: 'myKeyId',
		secretAccessKey: 'secret',
	},
	s3ForcePathStyle: true, // location wont work othewise, for local
});
