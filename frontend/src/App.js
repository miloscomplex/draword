import './css/Main.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './containers/Header.js'
import GameContainer from './containers/GameContainer'
import PhraseSelector from './containers/PhraseSelector'
import Leaderboard from './containers/Leaderboard'
import Footer from './containers/Footer'


function App() {
  return (
    <div className='App'>
      <Header />
        <Router>
          <Route exact path='/' component={GameContainer} />
          <Route exact path='/new' component={PhraseSelector} />
          <Route exact path='/leaderboard' component={Leaderboard} />
        </Router>

      <Footer />
    </div>
  );
}

export default App
