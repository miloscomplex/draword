import './css/Main.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './containers/Header.js'
import GameContainer from './containers/GameContainer'
import PhraseSelector from './containers/PhraseSelector'
import Leaderboard from './containers/Leaderboard'
import HowToPlay from './components/howToPlay/HowToPlay'
import LandingPage from './components/landingPage/LandingPage'
import Footer from './containers/Footer'
// action cable
import RoomsList from './components/rooms/RoomsList'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />

        <Route exact path='/' component={LandingPage} />
        <Route exact path='/new' component={RoomsList} />
        <Route exact path='/leaderboard' component={Leaderboard} />
        <Route exact path='/how-to-play' component={HowToPlay} />
        <Route exact path='/rooms/:id' render={routerProps => <GameContainer {...routerProps} />} />
        <PhraseSelector />
        <Footer />
      </Router>
    </div>
  )
}

export default App
