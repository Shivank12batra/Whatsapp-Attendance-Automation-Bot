const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
// require executablePath from puppeteer
const { executablePath } = require('puppeteer');

const getAttendanceData = async(userName, password) => {
    const loginPage = "https://www.sggscc.ac.in/smartprof/index.php";
    try {
        puppeteer.use(
            RecaptchaPlugin({
                provider: {
                    id: '2captcha',
                    token: process.env.CATPCHA_KEY,
                    // token: 'c2f8c49a5952770a638ac845691ef68a' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
                },
                visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
            })
        )
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: executablePath(),
        });
        const page = await browser.newPage();
        await page.goto(loginPage);
        // login credentials
        // const userName = 'shivank.202203@sggscc.ac.in';
        // const password = '202203';
        console.log('page loading done!');
        // Fill in the login form and select the student radio button
        // await page.evaluate(b => b.click('#loginForm input[value=STUDENT]'));
        await page.evaluate(() => {
            let radio = document.querySelector('#loginForm input[value=STUDENT]');
            radio.click();
        });
        // await page.click('#loginForm input[value=STUDENT]');
        console.log('hie');
        await page.type('#loginForm input[name=username]', userName, {
            delay: 100
        });
        console.log('username typed');
        await page.type('#loginForm input[name=password]', password, {
            delay: 100
        });
        console.log('password typed');

        // Click the captcha
        // await clickCaptcha(page);
        await page.solveRecaptchas();

        // Submit the login form
        await page.click('#loginForm button[name=loginUser]');
        console.log('login successful');
        var url = await page.url();
        console.log(url);
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
         }

        const page2 = await browser.newPage();
        page2.goto('https://www.sggscc.ac.in/smartprof/attendance-summary-student.php'); 

        const page3 = await browser.newPage();
        page3.goto('https://www.sggscc.ac.in/smartprof/attendance-summary-student.php');
        await sleep(3000);
        const currentUrl = await page2.url();
        console.log(currentUrl);

        await sleep(3000);
        await page2.waitForSelector('select#paperId');

        const {
            optionValues,
            subjectNames
        } = await page2.evaluate(() => {
            const optionValues = Array.from(document.querySelectorAll('select#paperId option')).map(option => option.value).slice(1);
            const subjectNames = Array.from(document.querySelectorAll('select#paperId option')).map(option => option.textContent).slice(1);
            return {
                optionValues,
                subjectNames
            }
        })
        // optionElements = optionElements.slice(1, optionElements.length);
        console.log(optionValues);
        console.log(subjectNames);

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
         }

        const getData = async () => {
            const attendanceData = [];
            for (let i=0; i<optionValues.length; i++) {
                const currentSubject = subjectNames[i];
                const data = {};
                await page2.waitForSelector('.select2-selection__arrow');
                await page2.click('.select2-selection__arrow');
                await page2.select('select[name="paperId"]', optionValues[i]);
                await page2.waitForSelector('.select2-selection__arrow');
                await page2.click('.select2-selection__arrow');
                await page2.waitForSelector('.pull-right');
                await sleep(3000);
                let percentage = await page2.$eval('.pull-right div', el => el.textContent);
                percentage = percentage.trim();
                console.log(percentage);
                let fraction = await page2.$eval('.pull-right p', el => el.textContent);
                fraction = fraction.slice(5);
                let successful = fraction.split('/')[0]; 

                data[`${currentSubject}`] = {'percentage' : percentage, 'fraction' : fraction, 'successful' : successful};
                attendanceData.push(data);
            }
            return attendanceData;
        };
        const data = await getData();
        await browser.close();
        return data;
        // return getData();
        // console.log(data);
    } catch (error) {
        console.log(error)
        return null
    }
};

module.exports = getAttendanceData;