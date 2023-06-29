# draword

An application loosely based on Pictionary, user 1 (drawer) draws to communicate the phrase selected from 3 randomly displayed phrases which are not revealed to user 2 (guesser). The guessers can be at minimum one, but an unlimited amount can be participate. User 2 (guesser) can see what user 1 (drawer) is drawing live on a JavaScript canvas and submits guesses via a text form. If user two can guess it in the allotted time, they win. If not, they lose. The frontend technology is React.js and utilizing Thunk and ActionCable (WebSocket) to allow for live updates to and from individual users logged into the same room. The backend is a Ruby on Rails API that also incorporates ActionCable (WebSocket).


## Requirements
**Note:** This application requires React.js, Ruby on Rails and some additional node packages

## Installation
Clone and download the entire repository's files to a local folder. In the terminal type:
```bash
git clone https://github.com/miloscomplex/draword
cd draword
cd backend
bundle install
```
The required gems will be installed

```bash
rake db migrate
```
Initialize the database

```bash
cd ../frontend
npm install
```
Install the required packages

## Usage
Make sure you are in the `/backend` folder
```bash
cd ../backend
rails s
```
Start the server
**Note:** The server must be running on port 3000 to properly function

```bash
cd ../frontend
npm start
```
start the react server

The webpage should automatically open in your web-browser. If not goto ```http://localhost:3001/```
or the preselected port number when prompted when npm said something is already running on Port 3000.
You are now able to open multiple browser windows and either enter rooms as a drawer or guesser.

## Contributing
Pull requests are welcome. For significant changes, bug fixes, or collaborations, please open an issue to discuss what you would like to change. https://github.com/miloscomplex/draword

## License
This project is available as open-source under the terms of the [MIT License.](https://choosealicense.com/licenses/mit/)
