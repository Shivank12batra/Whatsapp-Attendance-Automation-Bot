const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const whatsappMessage = async(contactNumber, messageData) => {
    const client = new Client({
        authStrategy: new LocalAuth(),
    });
    try {
        client.initialize();
    } catch (error) {
        console.log(error)
    }
    console.log('client intialised')
      
    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });
      
    client.on('authenticated', (session) => {
        console.log('WHATSAPP WEB => Authenticated');
    });
    console.log('authentication done!')
    client.on("ready", async () => {
        // 
        console.log(contactNumber)
        console.log("WHATSAPP WEB => Ready");
        // const number = "9654425881";
        const sanitized_number = contactNumber.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
        const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
    
        const number_details = await client.getNumberId(final_number); // get mobile number details
        console.log(number_details)
        if (number_details) {
            try {
                await client.sendMessage(number_details._serialized, messageData.msg1); //send message
                const delay =(ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms));
                  }
                await delay(5000)
                console.log(messageData)
                console.log('message 1 sent')
                await client.sendMessage(number_details._serialized, messageData.msg2); //send message
                console.log('message 2 sent')
                console.log('all messages send successfully!')
                await delay(5000)
                await client.destroy()
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log(final_number, "Mobile number is not registered");
        }
    });
    console.log('function processing ended!')
}

module.exports = whatsappMessage