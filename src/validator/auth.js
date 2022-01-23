const Joi = require("joi");

module.exports = {
  
  sendMessage: {
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    message: Joi.string().required(),
    receiversNumber: Joi.array().required(),
    failedContacts: Joi.array().required(),
    title: Joi.string().required(),
    senderId: Joi.string().required(),
    count: Joi.number().required(),
    amount: Joi.number().required(),
   
  },

  getAllMessages: {
    page: Joi.number().required(),
    
   
  },

  getAMessagesByMsgId: {
    page: Joi.number().required(),
    authId: Joi.string().uuid().required(),
   
  },

  getAMessagesByMsgId: {
    msgId: Joi.string().uuid().required(),
    
   
  },

  deleteMessage: {
    msgId: Joi.string().uuid().required(),
    authId: Joi.string().uuid().required(),
   
  },
  
  sendBulkMessage: {
    authId: Joi.string().uuid().required(),
    from: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    message: Joi.string().required(),
   
  },
  
}