'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const searchRouter = require('./searchRouter');

app.use(express.static('public'));
app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use('/searches', searchRouter);
app.use('*', function(req, res) {
	res.status(404).json({ message: 'Not Found' });
});

let server;
function runServer(databaseUrl, port = PORT) {
 	return new Promise((resolve, reject) => {
    	mongoose.connect(
      		databaseUrl,
      		err => {
        		if (err) {
          		return reject(err);
        	}
	        server = app
	       		.listen(port, () => {
	            	console.log(`Your app is listening on port ${port}`);
	            	resolve();
	          	})
	            .on('error', err => {
	            	mongoose.disconnect();
	            	reject(err);
	          	});
      		}
    	);
  	});
}


function closeServer() {
 	return mongoose.disconnect().then(() => {
    	return new Promise((resolve, reject) => {
    		console.log('Closing server');
     		server.close(err => {
        		if (err) {
        			return reject(err);
        		}
        		resolve();
      		});
    	});
  	});
}

if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}
const {Searches} = require('./models')

Searches.find().then(res => console.log(res));

module.exports = { app, runServer, closeServer };