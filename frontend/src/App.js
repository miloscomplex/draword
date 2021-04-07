import './css/Main.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './containers/Header.js'
import GameContainer from './containers/GameContainer'
import Footer from './containers/Footer'


function App() {
  return (
    <div className='App'>
      <Header />
        <Router>
          <Route path='/' component={GameContainer} />

        </Router>

      <Footer />
    </div>
  );
}

export default App
