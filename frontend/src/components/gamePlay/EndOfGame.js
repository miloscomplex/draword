import React from 'react'

class EndOfGame extends React.Component {

  matchId = this.props.match.params.id

  componentDidMount = () => {
    // ping the db to update status
    this.props.setSelectedRoom(this.matchId)
    console.log('match= ', this.props.match)
  }

  render() {
    return (
      <div className='wrapper'>
        <h2>
          End of Game
        </h2>
        <p>
          Wow you won !
        </p>
        <p>
          Dang better luck next time !
        </p>
      </div>
    )
  }

}

export default EndOfGame
