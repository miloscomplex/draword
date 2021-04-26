import React from 'react'
import PhraseList from './PhraseList'
import { connect } from 'react-redux'
import { editSelectedRoom, loadPhrases, gamePlayMsg } from '../../redux/actions'

class PhraseContainer extends React.Component {

  componentWillUnmount = () => {
    console.log('PhraseSelector umounted!');
  }

  componentDidMount = () => {
    this.props.loadPhrases()
    console.log('phrase mounted!.. in room', this.props.match.params.id)
  }

  handleClick = (matchObjId, phraseObjId) => {
    //console.log(matchObjId, phraseObjId)
    // set the phrase
    this.props.editSelectedRoom( {room_id: matchObjId, phrase_id: phraseObjId} )
    this.props.gamePlayMsg( { game_state: 'main', user_id: this.props.currentUser.id, room_id: this.props.match.params.id} )
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='phrase-selector'>
          <h2>Phrase Selector</h2>
          <p className='description'>Select One of the phrases/words below to draw.</p>

          <PhraseList phrases={this.props.phrases} handleClick={this.handleClick} match={this.props.match} />

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    phrases: state.phrases.phrasesList,
    busySignal: state.busySignal,
    currentUser: state.users.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPhrases: () => { dispatch(loadPhrases()) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    gamePlayMsg: gamePlayObj => { dispatch(gamePlayMsg(gamePlayObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseContainer)
