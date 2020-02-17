'use strict';

const mongoose = require('mongoose');

const resultsSchema = mongoose.Schema({
	title: String,
	date: String,
	price: String,
	craigslistID: String
});

const searchSchema = mongoose.Schema({
	searchQuery: String,
	results: [resultsSchema]
})

const Results = mongoose.model('Results', resultsSchema);
const Searches = mongoose.model('Searches', searchSchema);

module.exports = {Results, Searches}