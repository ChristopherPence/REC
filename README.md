# REC
Rensselaer Events Calendar. Team 5's Term Project for ITWS4500 Web Science Systems Development

## Team Members:
- Christopher Pence
- Finnegan Pike
- John Gay
- Carlos Power
- Steven Li

## Naming Conventions:
Please use camel case to name all files. Folders should follow the same but should hopefully be kept to one word. When naming Git branches, please follow the conventions on the slides from LMS. Examples include:
features/[feature_name]
bugfix/[bug_name]
hotfix/[hotfix_name]

## Git Conventions:
We are no longer making any commits to master. Commit to your feature's branch and then we will merge into master.

## How to use our project name in a sentence:
- "Have you checked the REC for that new club event?" - RPI Student
- "REC is so cool! I can see all of the flyers from my dorm room" - Another RPI Student

## Why we chose Node.js (current)
  1. We wanted to use the newsest version of Node.js. This way we can use the most up to date documentation
  (information from 2. and below comes from https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V11.md#11.9.0)
  2. OpenSSL has been updated to 1.1.1a, which is API/ABI compatible with the previous OpenSSL 1.1.0j. Note that while OpenSSL 1.1.1a supports TLS1.3, Node.js still does not. #25381)
  
## Install Node.js 11.9.0 (Current)
### Windows:
  1. Go to "https://nodejs.org/en/" and intall Node.j 11.9.0
  2. Open the Commmand Prompt
  3. Go through the directories using cd and find the folder that contains the server.js
  4. run "node server.js"
  6. stop the node js program with .exit or "ctrl-c" (may be different due to bash configuration)
### Bash:
  1. Go to "https://nodejs.org/en/" and intall Node.j 11.9.0
  2. Open the Commmand Prompt
  3. Go through the directories using cd and find the folder that contains the server.js
  4. run "sudo apt install nodejs-legacy"
  5. run "node server.js"
  6. stop the node js program with .exit or "ctrl-z" (may be different due to bash configuration)
  
  
## Flow Chart 

<img width="802" alt="rec flowchart" src="https://user-images.githubusercontent.com/20056711/52525810-23858d80-2c7d-11e9-817b-b35dd77397f9.png"> 


## Install MongoDB 4.0 (Current)
 1. download the MongoDB server (database software) at https://www.mongodb.com/download-center/community
 2. find the data path to the MongoDB execution files (mongod.exe and mongo.exe)
 ```
 ..../C:/Program Files/MongoDB/Server/4.0/bin/.... 
 ```
 ### Difference between mongod.exe and mongo.exe
 - mongod (Mongo Daemon) is the background process that manages the entirety of the MongoDB servers (basically the MongoDB server)
 - mongo (Javascript shell interface) allows developers to test queries and operations directly with the database (client that interacts with the MongoDB server)

## MONGO DB SERVER COMMANDS
 1. 'sudo service mongodb start'
 2. 'sudo service mongodb stop' 
 
 
 