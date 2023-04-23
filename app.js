require('dotenv').config();
const async = require('async');

const connectDB = require('./db/connect')
const User = require('./models/User')
const attendanceMessage = require('./logic/getData')
const sendMessage = require('./logic/client')
const delay = require('./logic/delay')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Database connection done!')
        let users = await User.find({})
        users = users.slice(0, 2)
        console.log(users)

        await new Promise((resolve, reject) => {
          async.eachLimit(users, 5, async (user) => {
            try {
              const { name, contactNumber, email, password } = user;
              const messageData = await attendanceMessage(name, email, password);
              await delay(10000)
              await sendMessage(contactNumber, messageData);
              resolve();
            } catch (error) {
              reject(error);
            }
          }, (err) => {
            if (err) {
              console.log(err);
              console.log('Something went wrong!');
              reject(err);
            } else {
              console.log('All messages sent successfully!');
              resolve();
            }
          });
        });
        

    } catch (error) {
        console.log(error)
        console.log('Something went wrong!')
    }
} 

start();

  