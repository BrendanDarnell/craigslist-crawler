const sendEmail = require('./sendEmail');
const getResults = require('./craigslistRequest');
const {Results, Searches} = require('./models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

mongoose.connect(DATABASE_URL, err => console.log(err));

async function handleSearch(query) {
	let searchResults = await getResults(query);
	// console.log(searchResults)
	return (
		Searches.findOne({searchQuery: query})
			.then(search => {
				let oldResults = [...search.results];
				let newResults = [];
				if(oldResults.length > 0) {
					searchResults.forEach(searchResult => {
						for(i=0; i < oldResults.length; i++) {
							if(searchResult.craigslistID === oldResults[i].craigslistID) {
								oldResults.splice(i,1);
								break
							}
							if (i === oldResults.length - 1) {
								newResults.push(searchResult);
								search.results.push(searchResult);
							}
						}	
					});
				}
				else {
					searchResults.forEach(result => search.results.push(result));
					search.save();
					return searchResults;
				}
				search.save();
				return newResults;
			})
	);
}

async function automatedEmail() {
	const searches = await Searches.find();
	const searchQueries = [];
	searches.forEach(search => searchQueries.push(search.searchQuery));
	const searchResults = await Promise.all(searchQueries.map(async(searchQuery) => await handleSearch(searchQuery)))
	let combinedResults = [];
	searchResults.forEach(result => combinedResults = [...combinedResults, ...result]);
	console.log('combinedResults', combinedResults)
	if(combinedResults.length > 0) {
		sendEmail(combinedResults);
	}
}

setInterval(() => automatedEmail().catch(e => console.log(e)), 1000*60*15);



