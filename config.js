'use-strict';
exports.EMAIL = process.env.EMAIL;
exports.PASSWORD = process.env.PASSWORD;
exports.DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://localhost/craigslist-crawler';
 exports.CLIENT_ORIGIN = 
	process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.PORT = process.env.PORT || 8080;
