const sendEmail = require('./sendEmail');
const getResults = require('./craigslistRequest');
const {Results, Searches} = require('./models');


// function automatedEmail() {
// 	return (
		Searches.findOne({searchQuery: 'max_price=70&query=lift%20tickets'})
			.then(res => console.log(res));
	// )
	
	// const searches = await Searches.find().exec().then(results => console.log(results));
	// const searchQueries = [];
	// searches.forEach((search, i) => { 
	// 	console.log(search.searchQuery);
	// 	searchQueries.push(search.searchQuery)
	// });
	// console.log(searches);
	// console.log(searchQueries[0]);
// }

// automatedEmail();

// console.log(Searches.find())
console.log('finished');