const { Router } = require("express");
const { auth } = require("../controllers");
const { validate } = require("../middlewares");
const { auth: validator } = require("../validator");

const routes = Router();

routes.get("/", auth.welcomeText);

routes.post("/save-message",validate(validator.sendMessage), auth.sendMessage);

routes.get("/get-all-messages",validate(validator.getAllMessages), auth.getAllMessages);

routes.get("/get-all-message-by-authId",validate(validator.getAllMessagesForAUser), auth.getAllMessagesForAUser);

routes.get("/get-message-by-msg-id",validate(validator.getAMessagesByMsgId), auth.getAMessagesByMsgId);

routes.delete("/delete-message",validate(validator.deleteMessage), auth.deleteMessage);

routes.delete("/delete-all-messages",validate(validator.deleteAllMessage), auth.deleteAllMessage);

routes.post("/send-bulk-message",validate(validator.sendBulkMessage), auth.sendBulkMessage);

module.exports = routes; 
