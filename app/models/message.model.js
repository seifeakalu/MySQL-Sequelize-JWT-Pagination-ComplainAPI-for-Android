module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      subject: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      receiver_id : {
        type: Sequelize.STRING
      },
      sender_id: {
        type: Sequelize.STRING
      },
      agree_count: {
        type: Sequelize.INTEGER
      },
      disagree_count: {
        type: Sequelize.INTEGER
      }
    });
  
    return Message;
  };
  