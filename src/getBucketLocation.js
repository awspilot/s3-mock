/*
event
	account_id
	bucket
*/

module.exports = function( event, response ) {
	console.log('[s3] getBucketLocation', event.bucket )
	database.buckets.get( event.account_id + ' > ' + event.bucket.toLowerCase(), function( err, data ) {
		if (err) {
			response.statusCode = 500;
			return response.end()
		}

		var bucket_data;


		try {
			bucket_data = JSON.parse(data);
		} catch (e) {

		}

		response.end(`<?xml version="1.0" encoding="UTF-8"?>
			<LocationConstraint xmlns="http://s3.amazonaws.com/doc/2006-03-01/">${bucket_data.region}</LocationConstraint>
		`)
	})

}
