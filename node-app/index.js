const ws = require('ws');
const http = require('http');
const express = require('express');
const tournamentData = require('./data/tournaments/klubski-saleski.json');
const calculator = require('./calculators/matchPointsCalculator');

let allPairs = tournamentData.pairs;

let app = express();
app.use('/pairs', (request, response) => response.send(allPairs));
app.use('/board/:number', (request, response) => {
    let boardNumber = request.params['number'];
    let boardData = tournamentData.boards.filter(x => x.boardNumber == boardNumber)[0];
    let boardResults = calculator.calculateMpsForSingleBoard(boardData);
    response.send(boardResults);
});
app.use('/results', (request, response) => response.send({ data: 'not implemented jet' }));
app.listen(3000);


let server = http.createServer(app);
// let webSocketServer = new ws.Server({ server });

// webSocketServer.on('connection', socket => {
//     socket.on('message', message => {
//         console.log('received: %s', message);
//         let m = JSON.parse(message);

//         let response = {
//             message: `Hello, you sent -> ${m}`,
//             data: testData.map(x => {
//                 return {
//                     board: x.boardNumber,
//                     results: getResults(x.results)
//                 }
//             })
//         };

//         socket.send(JSON.stringify(response));
//     });
// });

// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });