const db = require("../models");
const jwt= require("../middleware/authJwt");
const { authJwt } = require("../middleware");
const Message = db.message;
const AgreedStorage = db.agreed_user;
const DisAgreedStorage = db.disagreed_user;
const { Op } = require("sequelize");
const { disagreed_user } = require("../models");

exports.saveMessage = (req, res) => {
  // Save User to Database
  Message.create({
    subject: req.body.subject,
    message: req.body.message,

  })
    .then(message => {
        // user role = 1
          res.send({ success: true, responseMessage: "message created!" });
              
    })
    .catch(err => {
      res.send({ responseMessage: err.message });
    });
};



exports.countDisagreed = (req, res) => {
  const messageId = Number.parseInt(req.query.messageId);

  DisAgreedStorage.findOne({
    where: {
      message_id: messageId,
      disagreed_by: req.userId,
    },
  }).then((agreedUser) => {
    if (!agreedUser) {
      
      Message.increment({ disagree_count: +1 }, { where: { id: messageId } })
        .then((messages) => {
          DisAgreedStorage.create({
            message_id: messageId,
            disagreed_by: req.userId,
          });
        })
        .catch((err) => console.log("error: " + err));
        res.status(200).send({message:"Disagreed"});
    } else {
      res.status(500).send({
        message: "You have already disagreed to this message"
      })
    }
  });
};

exports.countAgreed = (req, res) => {
  const messageId = Number.parseInt(req.query.messageId);
  AgreedStorage.findOne({
    where: {
      message_id: messageId,
      agreed_by: req.userId,
    },
  }).then((disagreedUser) => {
    if (!disagreedUser) {
      Message.increment({ agree_count: +1 }, { where: { id: messageId } })
        .then((messages) => {
          AgreedStorage.create({
            message_id: messageId,
            agreed_by: req.userId,
          });
         
        })
        .catch((err) => console.log("error: " + err));
        res.status(200).send({message:"Agreed"});
    } else {
      res.status(500).send({
        message: "You have already agreed to this message"
      })
    }
  });
};
exports.getMessages = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 10) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }
  const messagesWithCount = await Message.findAndCountAll({
    // where: {

    //   sender_id: {
    //   [Op.eq]: 5
    //}
    //},
    limit: size,
    offset: page * size,
    order: [["id", "DESC"]],
  });
  res.send({
    content: messagesWithCount.rows,
    totalElements: messagesWithCount.count,
    totalPageNos: Math.ceil(messagesWithCount.count / Number.parseInt(size)),
  });
};
