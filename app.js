require('dotenv').config();
// const cron = require('node-cron');

const connectDB = require('./db/connect')
const User = require('./models/User')
const sendMessage = require('./logic/whatsapp')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Database connection done!')
        const users = await User.find({})
        for (const user of users) {
            await sendMessage(user.name, user.contactNumber, user.email, user.password)
        }
    } catch (error) {
        console.log(error)
        console.log('Something went wrong!')
    }
} 

// cron.schedule('33 0 * * 0', () => {
//     start()
//     console.log('Running script at 12:15am every Sunday');
// });
// cron.schedule('*/6 * * * *', () => {
//   start()
//   console.log('Running task every 6 minutes');
//   // Your script code goes here
// });

start()

  