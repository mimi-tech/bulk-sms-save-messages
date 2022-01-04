const request = require("../request");

const updateWalletApi= async (body) => {
    try {

        const url = `${process.env.UPDATE_WALLET_URL}/update-wallet`;

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
                message: "Error updating wallet",
            };
        }

        return response;
    } catch (e) {
        console.log(e);
        return { status: false, message: e.message };
    }
};


module.exports = {
    updateWalletApi
}