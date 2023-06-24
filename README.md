# Whatsapp-Attendance-Automation-Bot

A Whatsapp bot which weekly sends automated attendance reports to the students of my college who are registered to the bot.

## The Attendance Report Contains The Following:

1. Their current attendance in all the subjects.
2. Classes they need to attend from the next ten classses in order to reach a certain % of attendance (in all the subjects): 33%, 50%, 75%, 90%

   Example: if the current attendance of a student in his Micro Economics class is 20% (2/10), in the next ten classes, to reach a percentage of 50%, he would need to attend atleast 8 micro economic classes.

   The following is done for each subject and gives the student a good overview of his attendance condition and saves him mental bandwith of calculating it himself.

3. Attendance Marks (out of 5) they will get based on their current attendance and also, the potential marks they can fetch if they decide to attend all the next 10 classes. This is again extremely useful and can help them decide, based on their respective attendance goal, whether it is worth attending the classes or bunking with friends is a better option :)

## Attendance Report Sample:

![Sample Message](https://i.imgur.com/JR8HNsP.jpg)

## How It Works:

First, I created a simple frontend bot registeration page, where the college students can enter their necessary credentials to get registered with the bot for weekly updated. The code for this is in a separate repo, please visit this: [https://github.com/Shivank12batra/Bot-Registration-Page](https://github.com/Shivank12batra/Bot-Registration-Page)

Then the scripts is scheduled to run weekly on Monday which loops over the users registered with the bot i.e. stored in the database, and then scrapes their data fromt their individual private url on the college website. This is done via web scraping. Once, the attendance data is attained, functions are called to process the data and convert it into an object with the required details. Finally, these message objects are sent over and consumed via the whatsapp-web.js through which the messages are delivered to the students on their registered phone number.

## Tech Stack Used

- Node.js
- MongoDB
- Mongoose
- Puppeteer (for web scraping and validation of credentials)

## Issues And Potential Improvements:

Currently, I am facing the issues with session persistence via whatsapp-web.js and yet to figure out a solution for it. So, for the time being I am running the script from my end every Monday on local which obviously contradicts the automation part of the project.

Potential Improvement: The next obvious step to imrpove this would be to transition to a real time chatbot and give the user the option to customise the claases and percentage they are aiming, because currently, they are being hardcoded from my end: 10 classes and the percentage slab(33, 50, 75, 90)%.
