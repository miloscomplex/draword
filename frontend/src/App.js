import './css/Main.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/ui/Header.js'
import GameContainer from './containers/GameContainer'
import LeaderboardContainer from './components/leaderboard/LeaderboardContainer'
import HowToPlay from './components/howToPlay/HowToPlay'
import LandingPage from './components/landingPage/LandingPage'
import Footer from './components/ui/Footer'
// action cable
import RoomsList from './components/rooms/RoomsList'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />

        <Route exact path='/' component={LandingPage} />
        <Route exact path='/new' component={RoomsList} />
        <Route exact path='/leaderboard' component={LeaderboardContainer} />
        <Route exact path='/how-to-play' component={HowToPlay} />
        <Route exact path='/rooms' component={RoomsList} />
        <Route exact path='/rooms/:id' render={routerProps => <GameContainer {...routerProps} />} />
        <Footer />
      </Router>
    </div>
  )
}

export default App
