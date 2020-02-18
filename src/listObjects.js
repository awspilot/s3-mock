
module.exports = function( event, response ) {
	console.log('[s3] listObjects', event.bucket )

	var dbpath = event.account_id + '_' + require('crypto').createHash('md5').update( event.bucket.toLowerCase() ).digest("hex").slice(0,8);
	if (!database.bucket.hasOwnProperty(dbpath)) {
		database.bucket[dbpath] = levelup( leveldown( storage_dir + '/s3/' + dbpath + '.db' ) );
	}




	var objects = [];
	database.bucket[dbpath].createReadStream({  })
		.on('data', function (data) {

			var object_data;

			try {
				object_data = JSON.parse(data.value);
			} catch (e) {

			}

			console.log(data.key.toString(), object_data)
			objects.push({
				key: data.key.toString(),
				last_modified: new Date(object_data.modified_at || null ).toISOString(),
			})
		})
		.on('error', function (err) {
			//console.log('Oh my!', err)
		})
		.on('close', function () {
			//console.log('Stream closed')
		})
		.on('end', function () {

			var ractive = new Ractive({
				template: `
					<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
						<Name>{{bucket}}</Name>
						<Prefix></Prefix>
						<Marker></Marker>
						<MaxKeys>1000</MaxKeys>
						<IsTruncated>false</IsTruncated>
						{{#objects}}
						<Contents>
							<Key>{{.key}}</Key>
							<LastModified>{{.last_modified}}</LastModified>
							<ETag>&quot;xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&quot;</ETag>
							<Size>0</Size>
							<Owner>
								<ID>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</ID>
								<DisplayName>xxxxxxx</DisplayName>
							</Owner>
							<StorageClass>STANDARD</StorageClass>
						</Contents>
						{{/objects}}
					</ListBucketResult>
				`,
				data: {
					objects: objects,
					bucket: event.bucket,

				}
			});


			response.end('<?xml version="1.0" encoding="UTF-8"?>'+ractive.toHTML())
		})


}
