let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    list_id_user_join: [String],
    namegroup: String,
    history: [{id_chat: String, content: String, time: String}]
},  {collection : 'chatgroup'});

let Chatgroup = module.exports = mongoose.model('Chatgroup', Schema);

module.exports.getGroupsByUserId = (id, callback) => {
    let query = {list_id_user_join: id};
    Chatgroup.find(query, callback);
};

module.exports.getGroupsByGroupId = (id, callback) => {
    Chatgroup.findById(id, callback);
};

module.exports.addUserToGroup = (id, list_id_user_join) => {
    Chatgroup.findById(id, (err, result) => {
        if (err) return handleError(err);
        result.set({ list_id_user_join: list_id_user_join });
        result.save();
    });
};
