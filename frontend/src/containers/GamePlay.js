import React from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import ChatArea from '../components/chatBox/ChatArea'
import cable from '../services/Cable'
import { connect } from 'react-redux'
import { releasePhrase, getPhrase } from '../redux/actions'

class GamePlay extends React.Component {

  componentWillUnmount = () => {

    console.log('GamePlay unmounted');
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    this.props.releasePhrase( {room_id: this.props.match.params.id, phrase_id: null } )
    this.props.resetPhrase()
  }

  componentDidMount = () => {
    this.props.getPhrase(this.props.phrase)
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    return (
      <React.Fragment>
      <div className='phraseReminder'> Your phrase/word is <strong>{this.props.selectedPhrase}</strong></div>
      <div id='wrapper'>
        <div id='canvas'>
          <Canvas  params={this.props.match.params} />
          <Timer />
          <Score />
          <ToolBox />
        </div>
        <ChatArea params={this.props.match.params} />
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    phrases: state.phrases.phrasesList,
    selectedPhrase: state.phraseSelect.selectedPhrase.phrase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    releasePhrase: phraseObj => { dispatch(releasePhrase(phraseObj)) },
    resetPhrase: phraseObj => dispatch({ type: 'RESET_PHRASE' }),
    getPhrase: phraseId => { dispatch(getPhrase(phraseId)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
