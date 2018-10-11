# Project Name

## Description

Real-time chat that allows transcription and search of voice messages.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start chatting with other registered users
-  **Login:** As a user I can login to the platform so that I can chat with other users
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **List current chats** As a user I can see my current chats
-  **Search in chats** As a user I can search words/phrases in my chats
-  **Chat** As a user I can chat with others
-  **Start new chats** As a user I can start new chats

## Backlog

Homepage:
- record voice messages
- transcript a concrete voice messages
- search for a word within a chat (in written or voice messages)
- send/receive instant notifications for new messages
- add sounds for received new messages
  
# Client

## Routes

- `/`
  - HomePageComponent
  - public
  - just promotional copy
- `/auth/signup`
  - SignupPageComponent
  - anon only
  - signup form, link to login
  - navigate to homepage after signup
- `/auth/login`
  - LoginPageComponent
  - anon only
  - login form, link to signup
  - navigate to homepage after login
- `/chats` 
  - ChatsListPageComponent
  - user only
  - shows all chats, links to details
  - search chats by user name
- `/chats/new` 
  - ChatCreatePageComponent
  - user only
  - creates a new chat requesting created user
  - navigates to chat page after creation
  - is user doesn't exist, sends him/her a mail to join the app.
- `/chats/:username` 
  - ChatPageComponent 
  - user only
  - chat
- `**`
  - NotFoundPageComponent


## Components

- Login:
  - userFormComponent(title: string, button: string, onSubmit: function)
- Sign up:
  - userFormComponent(title: string, button: string, onSubmit: function)
- chat list:
  - searchFormComponent
  - chatListComponent (list: array)
  - chatElementListComponent (userName: string, lastDate: timeStamp, newMessages: number, messages: array of objects {message: string, user: string, date: timeStamp, read: boolean})
  - newChatComponent (functional. onSubmit: function)
- single chat:
  - nameComponent (functional. user: string)
  - messageListComponent (messages: array of objects {message: string, user: string, date: timeStamp, read: boolean}
  - addMessageForm
- start new chat:
  - newChatComponent (onSubmit: function)


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Chat Service
  - chat.list()
  - chat.detail(idChat)
  - chat.search({user: string, text: string})
  - chat.create({user})
  - chat.read(idChat)

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required

```
Message model

```
text - String
time - timeStamp
user - String
idChat - ObjectID

```
Chat model

```
idChat - ObjectID
user1 - String
user2 - String

```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- POST /user/me/favorite
  - body:
    - restaurantId
  - validation
    - id is valid (404)
    - id exists (404)
  - add to favorites if not there yet
  - updates user in session
- DELETE /user/me/favorite/:restaurantId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from favorites
  - updates user in session
- GET /chat/list
  - get list
- GET /chat/:id
  - get messages from concrete chat
- POST /chat/:id
  - publish message
- POST /chat/new
  - creates new chat  

## Links
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionAlternative/transcript
- socket.io
- https://www.campusmvp.es/recursos/post/Como-acceder-a-la-camara-de-un-movil-con-HTML-y-JavaScript.aspx

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

https://github.com/grannysimons/chat-frontend
https://github.com/grannysimons/chat-backend

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)