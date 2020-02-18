/*
event
	account_id
	bucket
	key
	body
*/


module.exports = function( event, response ) {
	console.log('[s3] putObject', event.bucket, event.key )

	// 1. get bucket

	// 2.


	var dbpath = event.account_id + '_' + require('crypto').createHash('md5').update( event.bucket ).digest("hex").slice(0,8);
	if (!database.bucket.hasOwnProperty(dbpath)) {
		database.bucket[dbpath] = levelup( leveldown( storage_dir + '/s3/' + dbpath ) );
	}


	database.bucket[dbpath].put( event.key , JSON.stringify({
		created_at: new Date().getTime(),
		modified_at: new Date().getTime(),
		// Size
		// StorageClass
	}), function (err) {
		if (err) {
			response.statusCode = 404;
			return response.end()
		}

		response.end()
	})

}
