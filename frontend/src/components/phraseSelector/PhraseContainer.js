import React from 'react'
import PhraseList from './PhraseList'
import { connect } from 'react-redux'
import { editSelectedRoom, loadPhrases, setPhrase } from '../../redux/actions'

class PhraseContainer extends React.Component {

  componentWillUnmount = () => {
    // change this to a rails call to set to active?: true and allow drawee rights to the room.
    console.log('PhraseSelector umounted!');
  }

  componentDidMount = () => {
    this.props.loadPhrases()
    console.log('phrase mounted!..', this.props.match.params.id);
    this.props.getRoom(this.props.match.params.id)
  }

  // passed down to PhraseList
  handleClick = (matchObjId, phraseObjId) => {
    //console.log(matchObjId, phraseObjId)
    this.props.editSelectedRoom( {room_id: matchObjId, phrase_id: phraseObjId} )
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
    busySignal: state.busySignal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPhrases: () => { dispatch(loadPhrases()) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    setPhrase: phraseObj => { dispatch(setPhrase(phraseObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseContainer)
