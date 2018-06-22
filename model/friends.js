let mongoose = require('mongoose');
const NOT_ACCEPTED = 0;
const ACCEPTED = 1;
const STATUS_SUCCESS = 1;
const STATUS_ERROR = 0;

let Schema = new mongoose.Schema({
    user_send: Number,
    user_receive: Number,
    accepted: Number,
    time: {type: Number, default: Date.now}
}, {collection: 'friends'});

let Friends = module.exports = mongoose.model('Friends', Schema);

module.exports.const = {
    ACCEPTED: ACCEPTED,
    STATUS_SUCCESS: STATUS_SUCCESS,
    STATUS_ERROR: STATUS_ERROR,
    NOT_ACCEPTED: NOT_ACCEPTED
};

module.exports.getFriendsByUserId = (id, callback) => {
    let query = {
        $and: [
            {$or: [{user_send: id}, {user_receive: id}]},
            {accepted: ACCEPTED}
        ]
    };

    Friends.find(query, callback);
};

module.exports.checkIsFriend = (id_user, id_friend, callback) => {
    let query = {
        $or: [
            {$and: [{user_send: id_user}, {user_receive: id_friend}]},
            {$and: [{user_send: id_friend}, {user_receive: id_user}]}
        ]
    };

    Friends.find(query, callback);
};

module.exports.createFriend = (newChat, callback) => {
    newChat.save(callback);
};