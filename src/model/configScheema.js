const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    configurationId: { type: String, required: true, unique: true },
    data: [[String]],
    remark: String,
});


module.exports = mongoose.model('Config', configSchema) ;