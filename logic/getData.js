const decrypt = require('./decrypt')
const getMessagesData = require('./calculate')
const generateMessage = require('./message')
  

const attendanceMessage = async(userName, email, encryptedPassword) => {
    try {
        const password = decrypt(encryptedPassword)
        const {attendanceData, automatedMessageData} = await getMessagesData(email, password)
        const messageData = generateMessage(userName, attendanceData, automatedMessageData)
        return messageData
        // await whatsappMessage(contactNumber, messageData)
    } catch (error) {
        console.log(error)
        console.log('Something went wrong!')
    }
}

module.exports = attendanceMessage;