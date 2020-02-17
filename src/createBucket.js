
/*
event
	account_id
	bucket
	region
*/

module.exports = function( event, response ) {
	console.log('[s3] createBucket', event.account_id, event.bucket, event.region )


	// scan all buckets, keys only

	var bucket_exists = false;
	database.buckets.createReadStream({ values: false, })
		.on('data', function (data) {

			var bucket = data.toString().split(' > ')[1]

			//console.log(bucket)

			if ( bucket.toLowerCase() === event.bucket.toLowerCase() ) {
				bucket_exists = true;
			}

		})
		.on('error', function (err) {
			//console.log('Oh my!', err)
		})
		.on('close', function () {
			//console.log('Stream closed')
		})
		.on('end', function () {

			if (bucket_exists) {

				response.statusCode = 409;
				response.end()
				return;
			}


			// doesnt exist, continue with create

			var bucket_db_key = event.account_id + ' > ' + event.bucket.toLowerCase();
			database.buckets.put(bucket_db_key, JSON.stringify({
				account_id: event.account_id,
				name: event.bucket,
				region: event.region,
				created_at: new Date().getTime(),
			}), function (err) {
				console.log(err)
				response.end()
			})
		})
}
