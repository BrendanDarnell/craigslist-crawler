const axios = require('axios');
const cheerio = require('cheerio');
require ('dotenv').config();


function request() {
	return ( axios.get('https://denver.craigslist.org/search/sss?max_price=70&query=lift%20tickets')
		.then(res => {
			return res.data
		})
		.catch(e => console.error('Request to craigslist failed', e))
	);
}

async function getResults() {
	const html = await request();
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

function handleResults() {
	return getResults().catch(e => console.log('Failed to parse craiglist results', e));
}

module.exports = handleResults;
