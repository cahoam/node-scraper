import cloudflareScraper from 'cloudflare-scraper';
import Cheerio from 'cheerio';

const fiis = ['snci11', 'cpts11', 'mxrf11', 'urpr11'];
var currentMarketValue, pvp, $;

function floatNumberFilter(value){
    return value.replace(/\n| |\t|[A-Za-z]|\$/g, '').replace(',','.');
}

function fetch(url){
    return cloudflareScraper.get(url);
}

function scraper(html, fii){
    $ = Cheerio.load(html);
    currentMarketValue = floatNumberFilter($('div#stock-price span.price').text());
    pvp = floatNumberFilter($('div.carousel-cell:last-child span.indicator-value').text());
    return {fii, currentMarketValue, pvp};
}

async function main (){
    const promise = fiis.map(async fii => {
        const html = await fetch('https://www.fundsexplorer.com.br/funds/' + fii);
        return scraper(html, fii);
    })
    return await Promise.all(promise);
};

const result = await main()
// result.sort((a,b) => a.pvp - b.pvp);
console.log(result)