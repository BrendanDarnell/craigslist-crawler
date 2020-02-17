'use strict';

const express = require('express');
const router = express.Router();

const {Results, Searches} = require('./models');

router.get('/', (req, res) => {
	Searches.find()
		.then(searches => {
			res.status(200).json(searches)
		})
		.catch(e => {
			console.error(e);
			res.status(500).json({message: 'internal server error'})
		})
});

router.post('/', (req, res) => {
	if(req.body.searchQuery) {
		Searches.create(req.body)
		.then(() => {
			Searches.find()
				.then(searches => {
					res.status(201).json(searches);
				})
				.catch(e => {
					console.error(e);
					res.status(500).json({message: 'internal server error'})
				})
		})
	}
	else {
		res.status(400).json({message: 'a search query is required'})
	}
});

module.exports = router;