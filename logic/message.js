const generateMessage = (name, attendanceData, automatedMessageData) => {
    const messageData = {
        'msg1' : `Hola ${name}! Here is your bi-weekly attendance report:\n Current Attendance:`,
        'msg2' : 'Number of classes that you need to attend from the next 10 to reach a certain % (33, 50, 75, 90) attendance:'
    };

    attendanceData.map((data) => {
        const subject = Object.keys(data)[0]
        messageData.msg1 += `\n\n${subject}: ${data[`${subject}`].percentage}`
    })

    automatedMessageData.map((data) => {
        const subject = Object.keys(data)[0]
        const percentages = Object.keys(data[`${subject}`])
        messageData.msg2 += `\n\n${subject}:`
        percentages.map((percentage) => {
            const classes = data[`${subject}`][`${percentage}`]
            if (classes > 10) {
                messageData.msg2 += `\n\nEven if you attend all the next 10 classes, you would not reach the mark of ${percentage}%`
            }
            else if (classes < 0) {
                messageData.msg2 += `\n\nEven if you do not attend any of the next 10 classes, you will still have your attendance higher than ${percentage}%`
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