//baseUrl
import siteinfo from '../../siteinfo.js'

//uni-app request
let http = function(url, params, method) {
	return new Promise(function(resolve, reject) {
		if(method){
			method = method.toUpperCase()
		}
		uni.request({
			url: siteinfo.baseUrl+url,
			data:JSON.stringify(params),
			header: {
				'content-type': 'application/json'
			},
			method: method,
			success: (result) => {
				if (result.statusCode !== 200 || typeof result.data != "object") {
					throw new Error("Network request error")
					return false;
				}
				resolve(result)
			},
			fail: (error) => {
				reject(error)
				throw new Error("http request is error")
			}
		});
	})
}
module.exports =http;
