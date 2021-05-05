# draword

An application to play a game where user one draws to communicate the word not revealed to user two (or more). User two can see what user one is drawing live and submits guesses via a text form. If user two can guess it in the allotted time, they win. If not, they lose.


## Requirements
**Note:** This application requires React.js, Ruby on Rails and some additional node packages

## Installation
Clone and download the entire repositories files to a local folder. In the terminal type:
```bash
git clone https://github.com/miloscomplex/draword
cd backend
bundle install
```
The required gems will be installed
```bash
rake db migrate
```
Initialize the database
```bash
rails s
```
Start the server
**Note:** The server must be running on port 3000 to properly function
```bash
cd ../frontend
npm install
```
Install the required packages
```bash
npm start
```
start the react server

## Usage
TBD

## Contributing
Pull requests are welcome. For significant changes, bug fixes, or collaborations, please open an issue to discuss what you would like to change. https://github.com/miloscomplex/draword

## License
This project is available as open-source under the terms of the [MIT License.](https://choosealicense.com/licenses/mit/)
