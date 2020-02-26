const sendEmail = require('./sendEmail');
const getResults = require('./craigslistRequest');
const {Results, Searches} = require('./models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

mongoose.connect(DATABASE_URL, err => console.log(err));

async function handleSearch(query) {
	let searchResults = await getResults(query);
	return (
		Searches.findOne({searchQuery: query})
			.then(search => {
				let oldResults = [...search.Results];
				let newResults = [];
				searchResults.forEach(searchResult => {
					oldResults.forEach((oldResult, i) => {
						if(searchResult.craigslistID === oldResult.craigslistID) {
							oldResults.splice(i,1);
							newResults.push(searchResult);
						}
					});
				});
				return newResults;
			})
	)
}

async function automatedEmail() {
	const searches = await Searches.find()
		.then(res => {
			console.log(res);
			return res
		})
		.catch(e => console.log(e));
	const searchQueries = [];
	searches.forEach(search => searchQueries.push(search.searchQuery));
	console.log(searchQueries);
	const searchResults = await Promise.all(searchQueries.map(async(searchQuery) => handleSearch(searchQuery)))
	const combinedResults = [];
	results.forEach(result => combinedResults = [...combinedResults, ...result]);
	await sendEmail(combinedResults);
}

automatedEmail();



// console.log(Searches.find())
// setTimeout(()=>console.log('finished'), 10000);