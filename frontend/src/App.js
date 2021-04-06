import './App.css';
import Header from './containers/Header.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CanvasContainer from './containers/CanvasContainer'
import ChatBox from './containers/ChatBox'
import Footer from './containers/Footer'


function App() {
  return (
    <div className='App'>
      <Header />
      <div id='wrapper'>
        <Router>
          <Route path='/' component={CanvasContainer} />
          <ChatBox />
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App
