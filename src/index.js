var http = require('http')
async=require('async')



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




			return response.end(`<?xml version="1.0" encoding="UTF-8"?>
				<ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
					<Owner>
						<ID>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</ID>
						<DisplayName>XXXXXXX</DisplayName>
					</Owner>
					<Buckets>
						<Bucket>
							<Name>Bucket-1</Name>
							<CreationDate>2015-10-25T00:05:10.000Z</CreationDate>
						</Bucket>
						<Bucket>
							<Name>Bucket-2</Name>
							<CreationDate>2018-02-22T08:11:19.000Z</CreationDate>
						</Bucket>
						<Bucket>
							<Name>Bucket-3</Name>
							<CreationDate>2018-02-22T08:03:22.000Z</CreationDate>
						</Bucket>
						<Bucket>
							<Name>Bucket-4</Name>
							<CreationDate>2018-02-22T08:00:19.000Z</CreationDate>
						</Bucket>
					</Buckets>
				</ListAllMyBucketsResult>
			`)


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
