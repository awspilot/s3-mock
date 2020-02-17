var http = require('http')
async=require('async')
var levelup = require('levelup')
var leveldown = require('leveldown')
Ractive = require('ractive')
Ractive.DEBUG = false;


var listBuckets = require( './listBuckets' );
var createBucket = require( './createBucket' );
var deleteBucket = require( './deleteBucket' );
var getBucketLocation = require('./getBucketLocation')

var storage_dir = process.env.S3_STORAGE_PATH ||  '/efs/storage/';
console.log('[s3] storage dir is', storage_dir )

database = {
	buckets: levelup( leveldown(storage_dir + '/s3/buckets.db') ),
};



async.waterfall([

	function( cb ) {
		const requestHandler = function(request, response) {
			//if (process.env.S3_LOG_REQUESTS)
				console.log( "[s3]", request.method, request.url )

			if (request.headers.origin) {
				response.setHeader('Access-Control-Allow-Origin', '*')

				if (request.method == 'OPTIONS') {
					if (request.headers['access-control-request-headers'])
						response.setHeader('Access-Control-Allow-Headers', request.headers['access-control-request-headers'])

					if (request.headers['access-control-request-method'])
						response.setHeader('Access-Control-Allow-Methods', request.headers['access-control-request-method'])

					response.setHeader('Access-Control-Max-Age', 172800)
					return response.end('')
				}

				response.setHeader('Access-Control-Expose-Headers', 'x-amzn-RequestId,x-amzn-ErrorType,x-amz-request-id,x-amz-id-2,x-amzn-ErrorMessage,Date')
			}

			//console.log(request.headers)

			response.setHeader('Content-Type', 'application/xml')
			response.setHeader('Transfer-Encoding', 'chunked')
			response.setHeader('Server', 'AmazonS3')
			response.setHeader('x-amz-request-id', 'xxxxxxxxxxxxxxxx')
			response.setHeader('x-amz-id-2', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')


			var body = '';
			request.on('data', function(chunk) {
				body += chunk.toString(); // convert Buffer to string
			});
			request.on('end', function() {
				console.log("body=", body )

				var account_id = '000000000000';
				// @todo: extract key from aws4 signature and resolve account_id with iam-mock

				if (request.method === 'DELETE') {
					var bucket = request.url.slice(1)

					if (request.url.indexOf('?') > 0 )
						bucket = bucket.slice(0, bucket.indexOf('?') )

					return deleteBucket({
						account_id: account_id,
						name: bucket,
					}, response )
				}

				if (request.method === 'PUT') {

					var bucket = request.url.slice(1)
					if (request.url.indexOf('?') > 0 )
						bucket = bucket.slice(0, bucket.indexOf('?') )

					var region = ((body.match(/<LocationConstraint>(?<region>[a-zA-Z0-9\-]+)<\/LocationConstraint>/i) || {}).groups || {}).region;

					return createBucket({
						account_id: account_id,
						bucket: bucket,
						region: region,
					}, response )
				}

				if ( (request.method === 'GET') && (request.url.slice(-9) === '?location') ) {
					var bucket = request.url.slice(1,-9)

					return getBucketLocation({
						account_id: account_id,
						bucket: bucket,
					}, response )
				}


				if ( (request.method === 'GET') && (request.url === '/') ) {
					return listBuckets({
						account_id: account_id,
					}, response )
				}

				// method not implemented
				response.statusCode = 404;
				response.end()
			})


		}

		const server = http.createServer(requestHandler)
		server.listen(process.env.PORT || 10003,function(err) {
			if (err) {
				console.log("s3-mock failed listening ", err )
				process.exit()
			}

			console.log("Starting S3 Mock on port ", process.env.PORT || 10003 )

		})
	},


], function(err) {
	if (err) {
		console.log("error" ,err )
		return process.exit()
	}
})
