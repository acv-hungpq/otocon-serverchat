let sockets = {};
sockets.init = server => {
    const chatOneSocket = require('./chat-one');
    const disconnectSocket = require('./disconnect');
    const joinGroup = require('./join-group');
    const pushGroup = require('./push-group');
    const OnlineUser = require('./online-user');

    const io = require('socket.io')(server);
    let clientOnline = [];
    let user;
    io.on('connection', socket => {
        socket.on('online-user', data => {
            user = data;
            let id_user = user.id_user;
            clientOnline.push({
                id_user: id_user,
                id_client: socket.id
            });

            console.log('Co them user: ');
            console.log('id: ' + id_user + ', socket: ' + socket.id);
            // OnlineUser(socket, id_user, clientOnline);
        });

        socket.on('disconnect', () => {
            console.log('User vua thoat: ' + socket.id);
            clientOnline = disconnectSocket(socket, clientOnline);
        });

        /*socket.on('join-group', data => {
            joinGroup(socket, data, user);
        });

        socket.on('push-group', data => {
            pushGroup(socket, data);
        });*/

        socket.on('chat-one', data => {
            console.log('Co user chat: ');
            console.log(data);
            if (user) {
                chatOneSocket(socket, data, user, clientOnline);
            } else {
                console.log('Chua khoi tao user');
            }
        });
    });
};

module.exports = sockets;