const { auth } = require("../services");
const { response } = require("../helpers");



const welcomeText = async (req, res) => {
    const data = await auth.welcomeText(req.form);
    return response(res, data);
  };

  const sendMessage = async (req, res) => {
    const data = await auth.sendMessage(req.form);
    return response(res, data);
  };

  const getAllMessages = async (req, res) => {
    const data = await auth.getAllMessages(req.form);
    return response(res, data);
  };


  const getAllMessagesForAUser = async (req, res) => {
    const data = await auth.getAllMessagesForAUser(req.form);
    return response(res, data);
  };


  const deleteMessage = async (req, res) => {
    const data = await auth.deleteMessage(req.form);
    return response(res, data);
  };

  const sendBulkMessage = async (req, res) => {
    const data = await auth.sendBulkMessage(req.form);
    return response(res, data);
  };

const getAMessagesByMsgId = async (req, res) => {
    const data = await auth.getAMessagesByMsgId(req.form);
    return response(res, data);
  };

  const deleteAllMessage = async (req, res) => {
    const data = await auth.deleteAllMessage(req.form);
    return response(res, data);
  };
  



  



  module.exports = {
    welcomeText,
    sendMessage,
    getAllMessages,
    getAllMessagesForAUser,
    getAllMessages,
    deleteMessage,
    sendBulkMessage,
    getAMessagesByMsgId,
    sendBulkMessage,
    deleteAllMessage
    
}