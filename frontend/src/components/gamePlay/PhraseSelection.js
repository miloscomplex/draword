import React from 'react'
import PhraseContainer from '../phraseSelector/PhraseContainer'

class PhraseSelection extends React.Component {

  render() {
    return (
      <div className='wrapper'>
        {
          this.props.currentUser.is_drawing
          ?
          <React.Fragment>
            <PhraseContainer match={this.props.match} />
          </React.Fragment>
          :
          <React.Fragment>
            <h2>The drawer is selecting a phrase</h2>
            <p className='description'>The game will appear once they have decided on a clue</p>
          </React.Fragment>
        }
      </div>
    )
  }

}

export default PhraseSelection
