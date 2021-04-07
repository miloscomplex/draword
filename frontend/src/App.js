import './App.css';
import Header from './containers/Header.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GameContainer from './containers/GameContainer'
import ChatBox from './containers/ChatBox'
import Footer from './containers/Footer'


function App() {
  return (
    <div className='App'>
      <Header />
        <Router>
          <Route path='/' component={GameContainer} />
          <ChatBox />
        </Router>

      <Footer />
    </div>
  );
}

export default App
