const mongoose = require('mongoose');

const registerDb = connectionString => mongoose.connect(connectionString);

module.exports = { registerDb }

