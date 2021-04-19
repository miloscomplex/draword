import React from 'react'
import GamePlay from './GamePlay'
import GamePlayGuesser from './GamePlayGuesser'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON } from '../constants'
import { getRoom, setPhrase } from '../redux/actions'


class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match

  // make a call to the server for updated Room
  // dispatch will update state good for direct link
  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    //console.log('GameContainer didUpdate')
  }

  render() {
    //console.log('this.props.selectedRoom= ', this.props.selectedRoom);

    const uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>

    const { selectedRoom, isDrawing } = this.props


    // load different gamePlay if the passed props are true or false
    // prop passsed from roomList.js
    // should only contain Game Play and drawee can have the phrase component
    // TODO: setup a dispatch and prop for guesser/drawer role

    /* <GamePlay match={this.props.match} getRoom={this.props.getRoom} /> */
    /*<PhraseContainer match={this.props.match} getRoom={this.props.getRoom}
    /> */

    return (
      <div>
        { selectedRoom ?
          <GamePlay match={this.props.match}/>
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
    selectedPhrase: state.phrases.selectedPhrase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) },
    setPhrase: phraseId => { dispatch(setPhrase(phraseId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
