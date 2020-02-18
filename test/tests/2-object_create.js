
/*
things to test:
	ACL: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control,
	CacheControl: 'STRING_VALUE',
	ContentDisposition: 'STRING_VALUE',
	ContentEncoding: 'STRING_VALUE',
	ContentLanguage: 'STRING_VALUE',
	ContentLength: 'NUMBER_VALUE',
	ContentMD5: 'STRING_VALUE',
	ContentType: 'STRING_VALUE',
	Expires: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
	GrantFullControl: 'STRING_VALUE',
	GrantRead: 'STRING_VALUE',
	GrantReadACP: 'STRING_VALUE',
	GrantWriteACP: 'STRING_VALUE',
	Metadata: {
		'<MetadataKey>': 'STRING_VALUE',
	},
	ObjectLockLegalHoldStatus: ON | OFF,
	ObjectLockMode: GOVERNANCE | COMPLIANCE,
	ObjectLockRetainUntilDate: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
	RequestPayer: requester,
	SSECustomerAlgorithm: 'STRING_VALUE',
	SSECustomerKey: Buffer.from('...') || 'STRING_VALUE', // Strings will be Base-64 encoded on your behalf
	SSECustomerKeyMD5: 'STRING_VALUE',
	SSEKMSEncryptionContext: 'STRING_VALUE',
	SSEKMSKeyId: 'STRING_VALUE',
	ServerSideEncryption: AES256 | aws:kms,
	StorageClass: STANDARD | REDUCED_REDUNDANCY | STANDARD_IA | ONEZONE_IA | INTELLIGENT_TIERING | GLACIER | DEEP_ARCHIVE,
	Tagging: 'STRING_VALUE',
	WebsiteRedirectLocation: 'STRING_VALUE'

*/


describe('putObject', function () {

	it('putObject', function(done) {
		var bucket_name = 'npm-test-put-object';

		async.waterfall([

			function( cb ) {
				s3.deleteBucket({Bucket: bucket_name}, function(err) {
					if (err)
						return cb(err);

					cb()
				})
			},

			function( cb ) {
				s3.createBucket({ Bucket: bucket_name },function(err,data) {
					if (err)
						return cb(err);

					cb()
				});
			},

			function( cb ) {
				var params = {
					Bucket: bucket_name,
					Key: 'ai-d-plm.txt',
					Body: 'oai',
				}
				s3.putObject(params, function( err, data ) {
					console.log(err)
					cb()
				})

			},


			function( cb ) {
				var params = {
					Bucket: bucket_name,
					Key: 'ai-d-plm.txt',
				}
				s3.deleteObject(params, function( err, data ) {
					console.log(err)
					cb()
				})
			},

		], function(err) {
			if (err)
				throw err;

			done()
		})
	})




})
