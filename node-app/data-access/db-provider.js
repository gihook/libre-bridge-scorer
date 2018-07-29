const mongoose = require('mongoose');

const registerDb = connectionString => mongoose.connect(connectionString, { useNewUrlParser: true });

module.exports = { registerDb }

