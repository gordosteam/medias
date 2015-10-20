module.exports = function (AuthProvider) {
	var keys;
	try {
		keys = Object.keys(data)
	} catch (e) {
		if (typeof data === 'string') {
			data = JSON.parse(data);
			keys = Object.keys(data);
		}
	}
};
