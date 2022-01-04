/* eslint-disable no-unreachable */
const { v4: uuid } = require("uuid");

const {
    Op: { or },

} = require("sequelize");

const { constants } = require("../configs");
const { Messages } = require("../models")
const { generalHelperFunctions } = require("../helpers")
const { SmsService } = require("../helpers/emailService");
const { WalletServices } = require("../helpers/walletServices")
const { isUserValid } = require("../helpers/userService")




  
/**
 * Display welcome text
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */
const welcomeText = async () => {
    try {
        return {
            status: true,
            message: "welcome to church app authentication service",
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("WELCOME TEXT"),
        };
    }
}



/**
 * for sending message
 * @param {Object} params email, password, username, profileImageUrl.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const sendMessage = async (params) => {
    try {
        const { 
             email,
             message,
             recieversNumber,
             senderId,
             count,
            
             fullName,
             
            
            
            } = params;

        
       
        
        
        //create account
        const newPersonalAccount = await Messages.create({
            msgId: uuid(),
            senderEmail: email,
            message:message,
            recieversNumber: recieversNumber,
            senderId: senderId,
            count:count,
           
            fullName: fullName,
            dateSent:new Date().toLocaleString()
              })

        
       

        //format registration details 
        //const userDetails = await generalHelperFunctions.formatRegistrationResult( newPersonalAccount.dataValues);

        return {
            status: true,
            message: "Message sent created successfully",
            data: newPersonalAccount,
        };




    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("USERS ACCOUNT"),
        };
    }
}



/**
 * for fetching all messages
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const getAllMessages = async (params) => {
    try {

        const { page } = params;

        const pageCount = 15;

        const allMessages = await Messages.findAll({


            attributes: {
                exclude: [
                    "createdAt",
                    
                    
                ],
            },
            limit: pageCount,
            offset: pageCount * (page - 1),
        });


        return {
            status: true,
            data: allMessages
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL USERS"),
        };
    }
}



/**
 * for fetching all messages for a user
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const getAllMessagesForAUser = async (params) => {
    try {

        const { page, authId } = params;

        const pageCount = 15;

        const allMessages = await Messages.findAll({


            attributes: {
                exclude: [
                    "createdAt",
                    
                    
                ],
            },
            limit: pageCount,
            offset: pageCount * (page - 1),

            where: {
                senderId: authId
            }
        });


        return {
            status: true,
            data: allMessages
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL USERS"),
        };
    }
}



/**
 * for fetching a message 
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */


const getAMessagesByMsgId = async (params) => {

    const { msgId } = params
    try {
        const user = await Messages.findOne({
            where: {
                msgId: msgId
            }
        })

        if (!user) {
            return {
                status: false,
                message: "message not found"
            };
        }

        //format  details 
        //const userDetails = await generalHelperFunctions.formatRegistrationResult( user.dataValues);

        return {
            status: true,
            data: user
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("GETTING A message"),
        };
    }
}





/**
 * for deleting a message by message id and users ID
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const deleteMessage = async (params) => {
    try {
        const { authId, msgId } = params

        //check if the user is already existing
        const user = await Messages.findOne({
            where: {
                [and]: [
                    { senderId: authId },
                    { msgId: msgId },
                ],
            },
        })

        if (!user) {
            return {
                status: false,
                message: "message does not exist"
            };
        }



        //go ahead and delete the account
        await Messages.destroy({
            where: {
                id: authId
            }
        })

        return {
            status: true,
            message: "message deleted successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("DELETING Message"),
        };
    }
}



/**
 * for sending messages
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const sendBulkMessage = async (params) => {
    try {
        const {authId, from, phoneNumber, message } = params;

         //check if  account is already registered

         //update the users wallet
       const { status: isUserValidSatus, message: isUserValidMessage, data: ussrAccount}
       = await isUserValid.isUserValid({
        id: authId,
  
          })
        
        if(isUserValidSatus === false) {
            return {
                status: false,
                message: isUserValidMessage,
            };

        }

        //check if account is not blocked

    

        if (ussrAccount.dataValues.blocked === true) {
            return {
                status: false,
                message: "Sorry your account has been blocked",
            };

        }
 //encrypt message 

        //check if the user wallet is more than 1.3 for per sms
       
        if (ussrAccount.dataValues.wallet >= 100.0) {
            //send sms here

            await SmsService.sendMesssageAPI({
                from: from,
                phoneNumber: phoneNumber,
                message:message
              });

       //minus 1.3 from the users wallet
       let newWallet = ussrAccount.dataValues.wallet - 1.3;

       //update the users wallet
       const { status: updateUsersWallet, message: updateWalletMessage }
            = await WalletServices.updateWalletApi({
        authId: authId,
        amount: newWallet,
       })

       if (updateUsersWallet === false) {
        return {
            status: updateUsersWallet,
            message: updateWalletMessage,
        };
    }

       return {
        status: true,
        message: "sms sent successfully"
    };


        }
        return {
            status: false,
            message: "Sorry insufficient fund"
        };


       
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("SENDING MESSAGE"),
        };
    }
}



module.exports = {
    welcomeText,
    sendMessage,
    getAMessagesByMsgId,
    getAllMessages,
    deleteMessage,
    sendBulkMessage,
    getAllMessagesForAUser
   
}