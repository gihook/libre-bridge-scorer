const ws = require('ws');
const http = require('http');
const express = require('express');
const tournamentData = require('./data/tournaments/mock-service-data.json');
const calculator = require('./calculators/matchPointsCalculator');
const bodyParser = require('body-parser');

const dbProvider = require('./data-access/db-provider');
// const tournamentService = require('./services/tournament-service');

let allPairs = tournamentData.pairs;

dbProvider.registerDb('mongodb://localhost:27017/libre-bridge-test')
    .then(() => {
        console.log('Connected to mongo database');
    }, error => {
        console.log('Connected to mongo database FAILED');
        console.log(error);
    })


let app = express();

app.use(bodyParser.json());


app.use('/pairs', (request, response) => response.send(allPairs));
app.use('/board/:number', (request, response) => {
    let boardNumber = request.params['number'];
    let boardData = tournamentData.boards.filter(x => x.boardNumber == boardNumber)[0];
    let boardResults = calculator.calculateMpsForSingleBoard(boardData);
    response.send(boardResults);
});
app.use('/results/:id', (request, response) => {
    let pairId = request.params['id']
    let sum = 0;
    for (let board of tournamentData.boards) {
        let boardResults = calculator.calculateMpsForSingleBoard(board);
        let mps = calculator.getMatchPoints(boardResults, pairId)
        sum += mps
    }

    response.send({ pairId, mps: sum });
});


const tournamentRouter = require('./routes/tournament');
const roundsRouter = require('./routes/tournament/rounds');
app.use(tournamentRouter);
app.use(roundsRouter);

app.listen(3000);


// let server = http.createServer(app);
// let webSocketServer = new ws.Server({ server });

// webSocketServer.on('connection', socket => {
//     event.addListener('test', () => {
//         console.log('emitting test socket');
//         socket.send('test event occured');
//     })

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


// const tournamentMapper = require('./services/tournament-mapper');

// let data = tournamentMapper.toMongooseModel(tournamentData);

// const fs = require('fs');

// fs.writeFileSync('./test.json', JSON.stringify(data, null, 4))