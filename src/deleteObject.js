/*
event
	account_id
	bucket
	key

*/


module.exports = function( event, response ) {
	console.log('[s3] deleteObject', event.bucket, event.key )

	// 1. get bucket

	// 2.


	var dbpath = event.account_id + '_' + require('crypto').createHash('md5').update( event.bucket.toLowerCase() ).digest("hex").slice(0,8);
	if (!database.bucket.hasOwnProperty(dbpath)) {
		database.bucket[dbpath] = levelup( leveldown( storage_dir + '/s3/' + dbpath + '.db' ) );
	}


	database.bucket[dbpath].del( event.key , function (err) {
		if (err) {
			response.statusCode = 404;
			return response.end()
		}

		response.end()
	})




}
