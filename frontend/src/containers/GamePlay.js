import React, { Component } from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import ChatArea from '../components/chatBox/ChatArea'
import cable from '../services/Cable'
import { connect } from 'react-redux'
import { releasePhrase } from '../redux/actions'

class GamePlay extends React.Component {

  componentWillUnmount = () => {
    console.log('GamePlay unmounted');
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()

    this.props.releasePhrase( {room_id: this.props.match.params.id, phrase_id: null } )
  }

  render() {
    //console.log(this.props)
    /* this.props.match.params ==> what's the url for the room */
    return (
      <div id='wrapper'>
        <div id='canvas'>
          <Canvas  params={this.props.match.params} />
          <Timer />
          <Score />
          <ToolBox />
        </div>
        <ChatArea params={this.props.match.params} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    phrases: state.phrases.phrasesList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    releasePhrase: phraseObj => { dispatch(releasePhrase(phraseObj)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
