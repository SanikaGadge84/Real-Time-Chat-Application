Company: CODTECH IT SOLUTIONS

Name: SANIKA GADGE

Intern ID: CTISAK69

Domain: MERN Stack Development

Duration: 4 Weeks

Mentor: NEELA SANTOSH


**About the Project**

This is a real-time chat application built using React.js for the frontend and Node.js with Socket.IO for the backend.

I created this project mainly to understand how real-time communication works on the web. Before this, I had only worked with normal applications where data is fetched using APIs. In this project, messages are sent and received instantly without refreshing the page, which helped me understand how sockets work.

Users can join a chat room by entering a username and a room name. Once they join, they can chat with other users who are in the same room.



**Technologies Used**

**Frontend**

React.js (Vite)
Used to build the user interface and manage application state.

CSS
Used for styling the app, including the centered layout, chat bubbles, and responsive design.

Socket.IO Client
Used to connect the frontend with the backend in real time.


**Backend**

Node.js
Used to run the server.

Express.js
Used to create the backend server and handle connections.

Socket.IO
Used to manage real-time events like sending messages, joining rooms, leaving rooms, and typing indicators.


**Features**

Users can join a chat room using a username

Messages are sent and received instantly

Room-based chat (users only see messages from their room)

Online users list is shown

Typing indicator shows when someone is typing

Messages are displayed like a real chat app:

Your messages appear on the right

Other users’ messages appear on the left

Simple and clean user interface


**How the App Works**

The user enters a username and room name.

The frontend sends this information to the server using Socket.IO.

The server adds the user to the selected room.

When a user sends a message:

It appears immediately on their screen.

The message is sent to the server.

The server sends it to all other users in the same room.

When a user joins or leaves:

Other users see a system message.

The online users list is updated automatically.


**Where This App Can Be Used**

Group chats for small teams

College project discussions

Classroom or study groups

Learning real-time communication concepts

Basic chat system for other applications


**What I Learned From This Project**

How real-time communication works using Socket.IO

How frontend and backend communicate using events

How to manage users and rooms on the server

How React state updates the UI automatically

How to structure a full-stack project

How to use Git and GitHub to manage code


**Limitations**

Messages are not stored in a database

No user authentication system

Anyone can join any room if they know the room name


**Future Improvements**

Store chat messages using a database

Add login and authentication

Add private chat feature

Improve UI with emojis and file sharing

Deploy the app online


**Final Note**

This project helped me understand how real-time applications are built in practice. It improved my confidence in working with React, Node.js, and Socket.IO, and gave me a clear idea of how frontend and backend work together in real-time systems.
