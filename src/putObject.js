/*
event
	account_id
	bucket
	key
	body
*/

/* fs.mkdirSync needs NodeJS version 10.12.0 */

module.exports = function( event, response ) {
	console.log('[s3] putObject', event.bucket, event.key )

	// 1. get bucket

	// 2.


	var dbpath = event.account_id + '_' + require('crypto').createHash('md5').update( event.bucket.toLowerCase() ).digest("hex").slice(0,8);
	if (!database.bucket.hasOwnProperty(dbpath)) {
		database.bucket[dbpath] = levelup( leveldown( storage_dir + '/s3/' + dbpath + '.db' ) );
	}


	try {
		fs.mkdirSync( storage_dir + '/s3/' + dbpath + '.objects', { recursive: true });
		fs.writeFileSync( storage_dir + '/s3/' + dbpath + '.objects/' + require('crypto').createHash('md5').update( event.key ).digest("hex"), event.body ) // keys are case sensitive, do not lowercase
	} catch (e) {
		response.statusCode = 404;
		return response.end()
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
