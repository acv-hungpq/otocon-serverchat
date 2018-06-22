const ChatoneModel = require('../model/chatone');
const helper = require('../helpers/helper');

let handle = (socket, data, user, clientOnline) => {
    let message = data.message;
    let type = data.type;
    let to_id_user = data.to_id_user;
    let id_user = user.id_user;

    let friend_id = helper.findClientId(clientOnline, to_id_user);
    let time = Date.now();

    socket.broadcast.to(friend_id).emit('receive-message-one',{
        id_user: id_user,
        message: message,
        type: type,
        time: time
    });

    let new_chat = new ChatoneModel({
        user_send: id_user,
        user_receive: to_id_user,
        content: message,
        type: type,
        time: time
    });

    ChatoneModel.createChat(new_chat);
};

module.exports = handle;