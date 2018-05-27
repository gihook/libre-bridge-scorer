const ws = require('ws');
const http = require('http');
const express = require('express');
const testData = require('./boardMock');

console.log(JSON.stringify(testData, null, 4));

let mappedTestData = testData.map(x => {
    let id = 1;
    x.results = x.results.map(r => {
        r.pair = id;
        id++;
        return r;
    })

    return x;
});

console.log(JSON.stringify(mappedTestData, null, 4));


// let results = [
//     { pair: 1, score: 50 },
//     { pair: 2, score: -460 },
//     { pair: 3, score: -460 },
//     { pair: 4, score: 50 },
//     { pair: 5, score: -460 },
//     { pair: 6, score: -430 },
//     { pair: 7, score: -430 },
//     { pair: 8, score: -430 },
//     { pair: 9, score: -430 },
// ]

function calculateMatchPoints(results, pairId) {
    let totalMps = (results.length - 1) * 2;
    let score = results.filter(r => r.pair === pairId)[0].score;

    let points = 0;
    for (let result of results.filter(r => r.pair !== pairId)) {
        if (score > result.score) points += 2;
        if (score === result.score) points += 1;
    }

    let nsMps = points;
    let ewMps = totalMps - points;
    let nsPercentage = nsMps / totalMps;
    let ewPercentage = ewMps / totalMps;

    return { nsMps, ewMps, nsPercentage, ewPercentage };
}


function getResults(boardResults) {
    let resultsToReturn = [];

    for (let result of boardResults) {
        let score = calculateMatchPoints(boardResults, result.pair);
        resultsToReturn.push({
            pair: result.pair,
            score: result.score,
            nsPercentage: score.nsPercentage,
            ewPercentage: score.ewPercentage,
            nsMps: score.nsMps,
            ewMps: score.ewMps
        });
    }

    return resultsToReturn;
}

let app = express();
let server = http.createServer(app);
let webSocketServer = new ws.Server({ server });

webSocketServer.on('connection', socket => {
    socket.on('message', message => {
        console.log('received: %s', message);
        let m = JSON.parse(message);

        let response = {
            message: `Hello, you sent -> ${m}`,
            data: testData.map(x => {
                return {
                    board: x.boardNumber,
                    results: getResults(x.results)
                }
            })
        };

        socket.send(JSON.stringify(response));
    });
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});