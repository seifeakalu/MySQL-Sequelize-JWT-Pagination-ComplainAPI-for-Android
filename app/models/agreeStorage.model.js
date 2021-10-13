module.exports = (sequelize, Sequelize) => {
    const AgreedStorage = sequelize.define("agree_storage", {
      message_id: {
        type: Sequelize.INTEGER
      },
      agreed_by: {
        type: Sequelize.INTEGER
      }
     
    });
  
    return AgreedStorage;
  };