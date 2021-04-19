import React from 'react'
import GamePlay from './GamePlay'
import GamePlayGuesser from './GamePlayGuesser'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON } from '../constants'
import { getRoom, getPhrase } from '../redux/actions'


class GameContainer extends React.Component {

  matchId = this.props.match

  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    console.log('GameContainer didUpdate')
  }

  render() {
    console.log('this.props.selectedRoom= ', this.props.selectedRoom);
    // match is this browser props
    const uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchId.url}</code> isn't a valid room</h2>

    const { selectedRoom, isDrawing } = this.props
    //const isDrawing = this.props.isDrawing
    // load different gamePlay if the passed props are true or false
    // prop passsed from roomList.js

    // should only contain Game Play and drawee can have the phrase component
    // TODO: setup a dispatch and prop for guesser/drawer role
    
    return (
      <div>
        { selectedRoom ?
          <React.Fragment>
            {
              selectedRoom.isDrawing
              ?
              <GamePlay match={this.props.match} />
              :
              <PhraseContainer match={this.props.match} getRoom={this.props.getRoom} />
            }
          </React.Fragment>
          :
          uhOh
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
