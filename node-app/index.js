const ws = require('ws');
const http = require('http');
const express = require('express');
const tournamentData = require('./data/tournaments/klubski-saleski.json');
const calculator = require('./calculators/matchPointsCalculator');
const bodyParser = require('body-parser');

const dbProvider = require('./data-access/db-provider');
const tournamentService = require('./services/tournament-service');

let allPairs = tournamentData.pairs;

dbProvider.registerDb('mongodb://localhost/libre-bridge-test')
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

app.get('/tournament/:id', (request, response) => {
    let id = request.params['id'];
    console.log('tournamnet id:', id);
    tournamentService.getTournamentById(id)
        .then((model) => {
            console.log('model', model);
            response.status(200).send(model);
        })
        .catch(error => {
            response.status(404).send(error);
        });
});

app.post('/tournament', (request, response) => {
    let data = request.body;
    tournamentService.createNewTournament(data)
        .then((model) => {
            response.status(201).send(model);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});


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