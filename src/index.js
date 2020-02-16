var http = require('http')
async=require('async')



async.waterfall([

	function( cb ) {
		const requestHandler = function(request, response) {
		}

		const server = http.createServer(requestHandler)
		server.listen(process.env.PORT || 10003,function(err) {
			if (err) {
				console.log("s3-mock failed listening ", err )
				process.exit()
			}

			console.log("Starting S3 Mock on port ", process.env.PORT || 10003 )

		})
	},


], function(err) {
	if (err) {
		console.log("error" ,err )
		return process.exit()
	}
})
