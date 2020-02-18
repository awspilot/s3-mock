describe('createBucket', function () {

	it('createBucket() - no location', function(done) {

		var bucket_name = "npm-test-no-location";

		async.waterfall([

			// delete bucket if exists
			function( cb ) {
				s3.deleteBucket({Bucket: bucket_name}, function(err) {
					if (err)
						return cb(err);

					cb()
				})
			},

			// create the bucket
			function( cb ) {
				s3.createBucket({ Bucket: bucket_name },function(err,data) {
					if (err)
						return cb(err);

					cb()
				});
			},

			// list the buckets
			function( cb ) {

				s3.listBuckets({},function(err,data) {
					if (err)
						return cb(err)

					var exists = data.Buckets.filter(function(b) { return b.Name === bucket_name }).length
					if (!exists)
						return cb('bucket-does-not-exist-after-create')

					cb()

				});
			},

			// check region
			function( cb ) {

				s3.getBucketLocation({ Bucket: bucket_name },function(err,data) {
					if (err)
						return cb(err)

					if (data.LocationConstraint !== 'us-east-1')
						return cb('bucket-invalid-location')

					cb()

				});
			},

		], function(err) {
			if (err)
				throw err;

			done()
		})
	})


	it('deleteBucket()', function(done) {
		var bucket_name = "npm-test-no-location";
		s3.deleteBucket({Bucket: bucket_name}, function(err) {
			if (err)
				throw err;

			done()
		})
	})







	it('createBucket() - eu-west-3', function(done) {

		var bucket_name = "npm-test-paris";

		async.waterfall([

			// delete bucket if exists
			function( cb ) {
				s3.deleteBucket({Bucket: bucket_name, }, function(err) {
					if (err)
						return cb(err);

					cb()
				})
			},

			// create the bucket
			function( cb ) {
				s3.createBucket({ Bucket: bucket_name, CreateBucketConfiguration: { LocationConstraint: "eu-west-3" } },function(err,data) {
					if (err)
						return cb(err);

					cb()
				});
			},

			// list the buckets
			function( cb ) {

				s3.listBuckets({},function(err,data) {
					if (err)
						return cb(err)

					var exists = data.Buckets.filter(function(b) { return b.Name === bucket_name }).length
					if (!exists)
						return cb('bucket-does-not-exist-after-create')

					cb()

				});
			},

			// check region
			function( cb ) {

				s3.getBucketLocation({ Bucket: bucket_name },function(err,data) {
					if (err)
						return cb(err)

					if (data.LocationConstraint !== 'eu-west-3')
						return cb('bucket-invalid-location')

					cb()

				});
			},

		], function(err) {
			if (err)
				throw err;

			done()
		})
	})
	it('deleteBucket()', function(done) {
		var bucket_name = "npm-test-paris";
		s3.deleteBucket({Bucket: bucket_name}, function(err) {
			if (err)
				throw err;

			done()
		})
	})



})
