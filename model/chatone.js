let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    user_send: Number,
    user_receive: Number,
    content: String,
    type: String,
    time: { type : Number, default: Date.now }
}, {collection : 'chatone'});

let Chatone = module.exports = mongoose.model('Chatone', Schema);

module.exports.createChat = (newChat) => {
    newChat.save();
};