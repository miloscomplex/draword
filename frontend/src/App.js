import './css/Main.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/ui/Header.js'
import GameContainer from './containers/GameContainer'
import LeaderboardContainer from './components/leaderboard/LeaderboardContainer'
import HowToPlay from './components/howToPlay/HowToPlay'
import LandingPage from './components/landingPage/LandingPage'
import Footer from './components/ui/Footer'
import FourOFour from './services/FourOFour'
// action cable
import RoomsList from './components/rooms/RoomsList'

function App() {

  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/draword' component={LandingPage} />
          <Route exact path='/draword/new' component={RoomsList} />
          <Route exact path='/draword/leaderboard' component={LeaderboardContainer} />
          <Route exact path='/draword/how-to-play' component={HowToPlay} />
          <Route exact path='/draword/rooms' component={RoomsList} />
          <Route exact path='/draword/rooms/:id' render={routerProps => <GameContainer {...routerProps} />} />
          <Route path='*' render={routerProps => <FourOFour {...routerProps}  />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
