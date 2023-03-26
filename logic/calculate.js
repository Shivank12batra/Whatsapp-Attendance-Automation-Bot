const getAttendanceData = require('./scraper.js')

// function to calculate the required classes to attend to reach a particular % of pass percentage
const getMessagesData = async(userName, password) => {
    try {
        const classes = 10;
        const percentages = [33, 50, 67, 85];
        const automatedMessageData = [];
        const attendanceData = await getAttendanceData(userName, password);
        console.log(attendanceData);
        attendanceData.map(subject => {
            console.log(subject);
            const currentSubject = Object.keys(subject)[0];
            const data = {};
            // minimum classes to attend to get to an attendance of 33%:
            const totalClasses = Number(subject[`${currentSubject}`].fraction.split('/')[1]);
            const classesPresent = Number(subject[`${currentSubject}`].fraction.split('/')[0]);
            const futureClasses = totalClasses + classes;
            for (const percentage of percentages) {
                console.log(percentage);
                const required = Math.floor(percentage/100 * (futureClasses)) - classesPresent;
                console.log(required); 
                data[`${currentSubject}`] = {...data[`${currentSubject}`], [`${percentage}`] : required}
            }
            // percentages.map((percentage) => {
            //     console.log(percentage);
            //     const required = Math.floor(percentage/100 * (futureClasses)) - classesPresent;
            //     console.log(required); 
            //     data[`${currentSubject}`] = {[`${percentage}`] : required}
            // })
            automatedMessageData.push(data);
            // const presentsRequired_33 = percentage[0]
        })
        console.log(automatedMessageData);
        return {attendanceData, automatedMessageData};
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getMessagesData