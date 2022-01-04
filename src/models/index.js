/* eslint-disable global-require */
const {
    db: { sequelize },
  } = require("../configs");
  
  module.exports = {
    Messages: require("./message")(sequelize),
    
  };

 
  