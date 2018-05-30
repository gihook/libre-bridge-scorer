const fs = require('fs');

const fileContent = fs.readFileSync('data/semi-parsed-results.json', { encoding: 'utf-8' });
const json = JSON.parse(fileContent);

const boards = json.tbody.tr;

const test = boards.map(x => {
    const boardNumber = getBoardNumber(x['-id']);
    const trs = x.td.table.tbody.tr;
    const results = getResults(trs);

    return {
        boardNumber,
        results: results.map(or => {
            return getSingleResult(or);
        })
    }
});

// for (let res of test) {
//     console.log('---------');
//     console.log(res.boardNumber);
//     for (let br of res.results)
//         console.log(br.nsPair, br.ewPair, br.score);
//     console.log('---------');
// }



function getBoardNumber(value) {
    return value.replace('lst', '');
}

function getResults(array) {
    let arrayRes = [];

    for (let i = 1; i < array.length; i++) {
        let sampleResults = array[i].td.map(x => x.p["#text"]);
        arrayRes.push(sampleResults);
    }

    return arrayRes;
}

function getSingleResult(item) {
    return {
        score: +item[0] || -item[1],
        nsPair: item[9],
        ewPair: item[10]
    }
}

module.exports = test;