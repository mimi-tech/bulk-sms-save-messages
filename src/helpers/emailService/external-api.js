const request = require("../request");

const sendMesssageAPI= async (body) => {
    try {

        const url = `${process.env.BULK_SMS_URL}/send-sms`;

        const response = await request(url, "POST", body);


        if (!response || !response.status) {
            if (response) {
                return {
                    status: false,
                    message: response.message,
                };
            }

            return {
                status: false,
                message: "Error sending bulk sms",
            };
        }

        return response;
    } catch (e) {
        console.log(e);
        return { status: false, message: e.message };
    }
};


module.exports = {
    sendMesssageAPI
}