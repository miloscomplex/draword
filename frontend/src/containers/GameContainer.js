import React, { Component } from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import ChatArea from '../components/chatBox/ChatArea'
import cable from '../services/Cable'


class GameContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillUnmount = () => {
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
  }

  render() {
    console.log(this.props)
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

export default GameContainer
