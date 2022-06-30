import clScrapper from 'cloudflare-scraper';
import cheerio from 'cheerio';

const fiis = ['mxrf11','cpts11','snci11'];

const fetch = async function(fii){
  return await clScrapper.get('https://www.fundsexplorer.com.br/funds/' + fii)
  .then(function(response){
    const $ = cheerio.load(response);
    const value = $('span.price').text().replace(/\n| |\t|\$|[A-Za-z]/g,'').replace(',','.');
    return {"name": fii, "value": value}
  })
}

async function webScraping () {
  var array_result = [];
  fiis.forEach(async (fii) => {
    try {
      const temp = await fetch(fii);
      array_result.push(temp);
      // console.log(temp);
    } catch (err) {
      console.error(err);
    }
  })
  return array_result;
}

const aaaa = await webScraping()
setTimeout(function(){
  console.log(aaaa)
},2000)
