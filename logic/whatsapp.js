const decrypt = require('./decrypt')
const getMessagesData = require('./calculate')
const generateMessage = require('./message')
const whatsappMessage = require('./client')
  

const sendMessage = async(userName, contactNumber, email, encryptedPassword, client) => {
    try {
        const password = decrypt(encryptedPassword)
        const {attendanceData, automatedMessageData} = await getMessagesData(email, password)
        const messageData = generateMessage(userName, attendanceData, automatedMessageData)
        await whatsappMessage(contactNumber, messageData)
    } catch (error) {
        console.log(error)
        console.log('Something went wrong!')
    }
}

module.exports = sendMessage;