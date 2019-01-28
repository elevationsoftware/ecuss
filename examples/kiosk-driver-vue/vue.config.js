const RemoveStrictPlugin = require('remove-strict-webpack-plugin');

// Webpack plugin to strip out "strict mode" from JS files that was preventing this
//  from running on Chrome/Chromium 27-29
module.exports = {
  configureWebpack: {
		plugins: [
			new RemoveStrictPlugin()
		]
	}
}