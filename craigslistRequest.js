const axios = require('axios');
const cheerio = require('cheerio');
require ('dotenv').config();


function request(searchQuery) {
	return ( axios.get(`https://denver.craigslist.org/search/sss?${searchQuery}`)
		.then(res => {
			return res.data
		})
		.catch(e => console.error('Request to craigslist failed', e))
	);
}

async function parseRequest(searchQuery) {
	const html = await request(searchQuery);
	const $ = cheerio.load(html);
	let results = $('.rows li').map((i,el) => {
		let result = {};
		result.price = $(el).find('.result-price').first().text();
		result.title = $(el).find('.result-title').first().text();
		result.craiglistID = $(el).attr('data-pid');
		result.date = $(el).find('time').attr('datetime')
		return result
	}).get()
	return results
}

function getResults(searchQuery) {
	return parseRequest(searchQuery).catch(e => console.log('Failed to parse craiglist results', e));
}

module.exports = getResults;
