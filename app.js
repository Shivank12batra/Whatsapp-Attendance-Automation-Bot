require('dotenv').config();

const connectDB = require('./db/connect')
const User = require('./models/User')
const sendMessage = require('./logic/whatsapp')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Database connection done!')
        // User.find({}, (err, users) => {
        //     console.log(users)
        // })
        const users = await User.find({})
        for (user of users) {
            await sendMessage(user.name, user.contactNumber, user.email, user.password)
            console.log('Message send successfully!')
        }
        // users.map((user) => {
        //     sendMessage(user.name, user)
        // })
    } catch (error) {
        console.log(error)
        console.log('Something went wrong!')
    }
} 

start()