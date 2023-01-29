require('dotenv').config();
const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')
const crypto = require('crypto')

const connectDB = require('./db/connect')
const User = require('./models/User')
const generateMessage = require('./logic/message')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Database connection done!')
        // User.find({}, (err, users) => {
        //     console.log(users)
        // })
        const users = await User.find({})
        for (user of users) {
            await generateMessage(user.name, user.contactNumber, user.email, user.password)
            console.log(user)
        }
        // users.map((user) => {
        //     sendMessage(user.name, user)
        // })
    } catch (error) {
        console.log(error)
    }
} 

start()