#### VERSIONS:
- Node.js v11.9.0

#### HOW TO USE NODE.JS: 
	WINDOWS:
		1. Navigate to the folder where the node.js file you want to run is located in the Windows CMD.
		2. Call 'node [filename].js' This will start the server and you will be able to go to localhost to see your website.
		3. 'ctrl' + 'c' is how to close the server from the CMD.

	LINUX: 
		1. Navigate to file location
		2. 'ctrl' + 'z'
		3. 'pkill -f node'
		4. 'jobs' 

	Both linux and windows version of node.js now have our terminate function programmed into them. Just type 'k' to kill the server.

#### Using MongoDB:
Install:
>sudo apt-get install -y mongodb

To start mongo: 
>sudo service mongodb start

Connect to recdb:
>mongo
use recdb
show collections
exit

DO NOT MONGODUMP AND PUSH TO THE GITHUB
>~~Export recdb:
	mongodump --db recdb
	Directory above dump folder~~

Import recdb:
>mongorestore
Directory above dump folder