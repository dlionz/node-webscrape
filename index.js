const rp = require('request-promise');
const cheerio = require('cheerio');
const chalk = require('chalk');
//set up options to pass to the request func
const options = {
    uri: 'https://m.cnn.com/en',
    transform: (body) => cheerio.load(body)
};

( async () => {
    try {
        //makes the request and load page into the $ symbol
        const $ = await rp(options); 
        //loop the elemnts on the page 10 times
        $('li > a').each((i, element) => {
            if(i >= 10){
                return false;
            }
            const link = `https://m.cnn.com${$(element).attr('href')}`;

            console.log(`${$(element).text()} : ${chalk.green(link)}`);
        });
    } catch (err) {
        console.log(err);
    }
})();