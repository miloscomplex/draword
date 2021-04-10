import React, { Component } from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import ChatArea from '../components/chatBox/ChatArea'


class GameContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <div id='wrapper'>
        <div id='canvas'>
          <Canvas />
          <Timer />
          <Score />
          <ToolBox />
        </div>
        <ChatArea />
      </div>
    )
  }
}

export default GameContainer
