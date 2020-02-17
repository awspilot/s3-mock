
/*
event
	account_id
	body
*/

module.exports = function( event, response ) {
	console.log('[s3] listBuckets')
	var buckets_to_return = []
	database.buckets.createReadStream({ gt: event.account_id + ' > ', lt: event.account_id + ' >Z', limit: 50, })
		.on('data', function (data) {

			var bucket_data;

			try {
				bucket_data = JSON.parse(data.value);
			} catch (e) {

			}

			//if (!bucket_data)
			//	database.buckets.del(data.key.toString())

			console.log(data.key.toString(), '=', bucket_data || data.value.toString() )
			buckets_to_return.push({
				name: bucket_data.name,
				created_date: new Date(bucket_data.created_at).toISOString(),
			});
		})
		.on('error', function (err) {
			console.log('Oh my!', err)
		})
		.on('close', function () {
			console.log('Stream closed')
		})
		.on('end', function () {

			var ractive = new Ractive({
				template: `
					<ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
						<Owner>
							<ID>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</ID>
							<DisplayName>XXXXXXX</DisplayName>
						</Owner>
						<Buckets>
							{{#buckets}}
							<Bucket>
								<Name>{{.name}}</Name>
								<CreationDate>{{.created_date}}</CreationDate>
							</Bucket>
							{{/buckets}}
						</Buckets>
					</ListAllMyBucketsResult>
				`,
				data: {
					buckets: buckets_to_return,
				}
			});

			response.end('<?xml version="1.0" encoding="UTF-8"?>'+ractive.toHTML())
		})
}
