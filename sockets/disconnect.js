let handle = (socket, clientOnline) => {
    clientOnline = clientOnline.filter(value => {
        return value.id_client != socket.id;
    });

    return clientOnline;
};

module.exports = handle;