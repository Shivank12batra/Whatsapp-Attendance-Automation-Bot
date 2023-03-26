const maxPercentage = require('./maxPercentage.js')
const getAttendanceMarks = require('./marks.js')

const generateMessage = (name, attendanceData, automatedMessageData) => {
    const messageData = {
        'msg1' : `Hola ${name}! Here is your bi-weekly attendance report:\n Current Attendance:`,
        'msg2' : 'Number of classes that you need to attend from the next 10 to reach a certain % (33, 50, 67, 85) attendance:',
        'msg3': 'Attendance marks that you will be getting based on your current attendance and your future attendance(if you decide to attend all the next 10 classes):',
    };

    attendanceData.map((data) => {
        const subject = Object.keys(data)[0]
        messageData.msg1 += `\n\n${subject}: ${data[`${subject}`].percentage}`
    })

    automatedMessageData.map((data, i) => {
        const subject = Object.keys(data)[0]
        const percentages = Object.keys(data[`${subject}`])
        messageData.msg2 += `\n\n${subject}:`
        messageData.msg3 += `\n\n${subject}`

        let currentPercentage = attendanceData[i][`${subject}`].percentage
        console.log(currentPercentage)
        currentPercentage = Number(currentPercentage.substring(0, currentPercentage.length-1))
        const fraction = attendanceData[i][`${subject}`].fraction
        const max = maxPercentage(fraction, true)
        // attendance marks
        const currentMarks = getAttendanceMarks(Number(currentPercentage))
        const futureMarks = getAttendanceMarks(max)
        messageData.msg3 += `\n\nCurrent Marks: ${currentMarks}/5`
        messageData.msg3 += `\nFuture Marks(if you attend all next 10): ${futureMarks}/5`

        percentages.map((percentage) => {
            // classes required to attend to reach x% 
            const classes = data[`${subject}`][`${percentage}`]
            if (classes > 10) {
              messageData.msg2 += `\n\n${percentage}%: ${max}% (max percentage you can reach even if you attend all 10 classes)`
            }
            else if (classes < 0) {
              const min = maxPercentage(fraction, false)
              messageData.msg2 += `\n\nEven if you dont attend any of the next 10 classes, your attendance will be above ${percentage} ~ ${min}% (minimum if you dont attend any)`
            }
            else {
                messageData.msg2 += `\n\n${percentage}%: ${classes}/10`
            }
        })
    })
    // console.log(messageData)
    return messageData
}

const arr1 = [
    {
      ' DSE 1- FMI- BCP SEM 6 ': { percentage: '8.33%', fraction: '1/12', successful: '1' }
    },
    {
      ' DSE 2- FUNDAMENTALS OF INVESTMENT- BCP SEM 6 ': { percentage: '27.27%', fraction: '3/11', successful: '3' }    
    },
    {
      ' SEC- ADVERTISING & PERSONAL SELLING- BCP SEM 6 ': { percentage: '0%', fraction: '0/3', successful: '0' }       
    },
    {
      ' GE-Principles of Macro Economics -BCP SEM 6 ': { percentage: '0%', fraction: '0/7', successful: '0' }
    }
  ]

const arr2 = [
    {
      ' DSE 1- FMI- BCP SEM 6 ': { '33': 6, '50': 10, '75': 15, '90': 18 }
    },
    {
      ' DSE 2- FUNDAMENTALS OF INVESTMENT- BCP SEM 6 ': { '33': 3, '50': 7, '75': 12, '90': 15 }
    },
    {
      ' SEC- ADVERTISING & PERSONAL SELLING- BCP SEM 6 ': { '33': 4, '50': 6, '75': 9, '90': 11 }
    },
    {
      ' GE-Principles of Macro Economics -BCP SEM 6 ': { '33': 5, '50': 8, '75': 12, '90': 15 }
    }
  ]

// generateMessage('Ansh Gupta', arr1, arr2)
module.exports = generateMessage