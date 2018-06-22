const express = require('express');
const router = express.Router();
const FriendsModel = require('../model/friends');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    if (req.body.id_friend == undefined || req.body.id_friend == null) {
        res.send({
            status: FriendsModel.const.ERROR,
            message: "Khong co id friend"
        })
    } else {
        let id_friend = req.body.id_friend.toString();
        FriendsModel.checkIsFriend(id_user, id_friend, (err, results) => {
            if (results.length == 0) {
                let new_friend = new FriendsModel({
                    user_send: id_user.toString(),
                    user_receive: req.body.id_friend.toString(),
                    accepted: FriendsModel.const.NOT_ACCEPTED
                });

                FriendsModel.createFriend(new_friend, (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({
                            status: FriendsModel.const.STATUS_SUCCESS,
                            message: "gui loi moi thanh cong"
                        })
                    }
                });
            } else {
                res.send({
                    status: FriendsModel.const.STATUS_ERROR,
                    message: "Gui loi moi that bai | Hai nguoi da la ban be hoac da co loi moi duoc gui truoc do"
                })
            }
        });
    }
});

module.exports = router;
