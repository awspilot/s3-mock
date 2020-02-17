
/*
event
	account_id
	name
*/

module.exports = function( event, response ) {
	console.log('[s3] deleteBucket', event.name )
	database.buckets.del( event.account_id + ' > ' + event.name.toLowerCase() )
	response.end()
}
