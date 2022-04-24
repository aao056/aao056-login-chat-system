# Login and group chat

Group chat with login built using node express and mongo.Minimal front-end set up with ejs without any style applied.An user can log in or register and can enter the group chat only if they are logged in.I have used sessions so users do not have to log in every single time they visit the website. The chat system was setup using using socket.io library.

# How to run it? 

Clone this repository and then run:

```
npm install
npm start
```

In order to test the group chat functionality you should either go to localhost on an incognito tab (CTRL + SHIFT + N) or tell your friend/colleague from the same network to go to http://YOUR_NETWORK_IP_HERE from his computer and have a chat with him :) I know this can be too much if you want to test if for 5-6 ore more users , this is why I will add a new branch for testing.


In order to be able to run the project create an .env file with 2 lines

```
MONGO_URL={YOUR MONGO URL}
SESSION_SECRET={ANY STRING YOU WISH}
```
