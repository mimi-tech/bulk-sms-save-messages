const request = require("../request");

const isUserValid= async (body) => {
    try {

        const url = `${process.env.IS_USER_VALID}/get-user-by-id`;

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
                message: "Error getting a user",
            };
        }

        return response;
    } catch (e) {
        console.log(e);
        return { status: false, message: e.message };
    }
};


module.exports = {
    isUserValid
}