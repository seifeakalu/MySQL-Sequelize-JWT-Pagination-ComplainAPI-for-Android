module.exports = (sequelize, Sequelize) => {
    const DisgreedStorage = sequelize.define("disagree_storage", {
      message_id: {
        type: Sequelize.INTEGER
      },
      disagreed_by: {
        type: Sequelize.INTEGER
      }
     
    });
  
    return DisgreedStorage;
  };