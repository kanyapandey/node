const fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch("https://codequiz.azurewebsites.net", {
    headers: {
        Cookie: "hasCookie=true"
    }
}).then(e => e.text()).then(e => {
    let data = [];
    const $ = cheerio.load(e);
    const keys = Object.keys($('table tr').find('td'));
    let count = 0;
    let tmpArr = [];
    keys.map((key, index) => {
        if(index <= 19){
            const tmpData = $('table tr').find('td')[key].children[0].data;
            if(count < 5){
                tmpArr.push(tmpData)
                count++;
            }else{
                count = 1;
                tmpArr = [];
                tmpArr.push(tmpData);
            }
            if(count === 5){
                data.push(tmpArr);
            }
        }
    });
    // console.log(data);
    data.map(item => {
        if(item[0] === process.argv[2]){
            console.log(`Your requested nav for ${process.argv[2]} is ${item[1] ?? 'Not Available'}`);
            console.log(`Your requested bid for ${process.argv[2]} is ${item[2] ?? 'Not Available'}`);
            console.log(`Your requested offer for ${process.argv[2]} is ${item[3] ?? 'Not Available'}`);
            console.log(`Your requested change for ${process.argv[2]} is ${item[4] ?? 'Not Available'}`);
        }
    })
}).catch(err => console.log(err));
