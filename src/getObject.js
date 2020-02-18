
/*
event
	account_id
	bucket
	key

*/


module.exports = function( event, response ) {
	console.log('[s3] getObject', event.bucket, event.key )

	// 1. get bucket
	// 404
	// <?xml version="1.0" encoding="UTF-8"?>
	// <Error><Code>NoSuchBucket</Code><Message>The specified bucket does not exist</Message><BucketName>bucket-in-paris</BucketName><RequestId>XXXXXXXXXXXXXXXX</RequestId><HostId>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</HostId></Error>



	// 2. get key
	var dbpath = event.account_id + '_' + require('crypto').createHash('md5').update( event.bucket.toLowerCase() ).digest("hex").slice(0,8);
	if (!database.bucket.hasOwnProperty(dbpath)) {
		database.bucket[dbpath] = levelup( leveldown( storage_dir + '/s3/' + dbpath + '.db' ) );
	}


	database.bucket[dbpath].get( event.key , function (err, data ) {
		if (err) {
			response.statusCode = 404;
			return response.end(`<?xml version="1.0" encoding="UTF-8"?>
				<Error>
					<Code>NoSuchKey</Code>
					<Message>The specified key does not exist.</Message>
					<Key>${event.key}</Key>
					<RequestId>XXXXXXXXXXXXXXXX</RequestId>
					<HostId>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</HostId>
				</Error>
				`
			)
		}

		var key_data;


		try {
			key_data = JSON.parse(data);
		} catch (e) {
		}

		console.log("key data", key_data )



		var filepath = storage_dir + '/s3/' + dbpath + '.objects/' + require('crypto').createHash('md5').update( event.key ).digest("hex");

		// I know I hould pipe it to the response
		try {
			var contents = fs.readFileSync(filepath)
		} catch (e) {
			console.log(e)
			response.statusCode = 404;
			return response.end()
		}

		// i have contents
		response.setHeader('Accept-Ranges', 'bytes')
		response.setHeader('Cache-Control', 'no-cache')
		// Content-Length: 1234
		response.setHeader('Content-Type', 'application/octet-stream')
		// Date: Tue, 18 Feb 2020 09:27:11 GMT
		response.setHeader('ETag', "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
		// Last-Modified: Tue, 18 Feb 2020 09:26:54 GMT
		response.setHeader('Server', "AmazonS3")
		// x-amz-id-2: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		// x-amz-request-id: xxxxxxxxxxxxxxxx
		response.end(contents)
	})




}
