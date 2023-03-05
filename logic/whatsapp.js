const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')
const decrypt = require('./decrypt')
const getMessagesData = require('./calculate')
const generateMessage = require('./message')

const sendMessage = async(userName, contactNumber, email, encryptedPassword) => {
    try {
        const password = decrypt(encryptedPassword)
        const {attendanceData, automatedMessageData} = await getMessagesData(email, password)
        const messageData = generateMessage(userName, attendanceData, automatedMessageData)
        console.log(messageData)
        // sending message using whatsapp-web.js
        const client = new Client({
            authStrategy: new LocalAuth(),
        });
        client.initialize();
          
        client.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });
          
        client.on('authenticated', (session) => {
            console.log('WHATSAPP WEB => Authenticated');
        });
        client.on("ready", async () => {
            console.log(contactNumber)
            console.log("WHATSAPP WEB => Ready");
            // const number = "9654425881";
            const sanitized_number = await contactNumber.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
            const final_number = await `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
        
            const number_details = await client.getNumberId(final_number); // get mobile number details
            console.log(number_details)
            if (number_details) {
                try {
                    await client.sendMessage(number_details._serialized, messageData.msg1); //send message
                    await client.sendMessage(number_details._serialized, messageData.msg2); //send message
                    await client.sendMessage(number_details._serialized, messageData.msg3); //send message
                    console.log('all messages send successfully!')
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log(final_number, "Mobile number is not registered");
            }
        });
    } catch (error) {
        console.log(error)
        console.log('Something went wrong!')
    }
}

module.exports = sendMessage;

// process.on("SIGINT", async () => {
//     console.log("(SIGINT) Shutting down...");
//     await client.destroy();
//     process.exit(0);
// })