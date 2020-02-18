
/*
event
	account_id
	name
*/

function removeFolder(path, cb) {
	fs.readdir(path, function (err, files) {
		async.each(files, function (file, cb) {
			file = path + '/' + file
			fs.stat(file, function (err, stat) {
				if (err)
					return cb(err);

				if (stat.isDirectory())
					return removeFolder(file, cb);

				fs.unlink(file, function (err) {
					if (err)
						return cb(err);

					cb();
				})

			})
		}, function (err) {
			if (err)
				return cb(err)

			fs.rmdir(path, function (err) {
				cb(err)
			})
		})
	})
}

module.exports = function( event, response ) {
	console.log('[s3] deleteBucket', event.name )
	database.buckets.del( event.account_id + ' > ' + event.name.toLowerCase(), function(err) {

		// also remove leveldb folder
		var dbpath = event.account_id + '_' + require('crypto').createHash('md5').update( event.name.toLowerCase() ).digest("hex").slice(0,8);
		var levelpath = storage_dir + '/s3/' + dbpath + '.db'


		removeFolder(levelpath, function(err) {
			console.log(err)
			response.end()
		})
	} )

}
