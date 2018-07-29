const path = require('path');

const getDefinition = definitionType => {
    const definitionsFolderPath = './data/tournament-definitions/';
    const pathToDefinition = path.resolve(definitionsFolderPath, `${definitionType}.json`);

    return require(pathToDefinition);
}

module.exports = {
    getDefinition
};