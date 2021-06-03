import React from 'react'

class LeaderboardList extends React.Component {
  state = {
    counter: 0,
    hearts: []
  }

  addHeart = (id, value) => {
    console.log('i was clicked')
    let hearts = [...this.state.hearts];
    if (hearts[id]) {
      hearts[id].count = hearts[id].count + 1
    }
    else {
      hearts[id] = {count: 1}
    }
    this.setState({
      hearts
    })
  }

  render() {
    const scores = this.props.scores.map( (score, index) =>
    <li key={index}> Room: <strong>{score.room.title}</strong>, time it took: <strong>{score.time_in_seconds}</strong> sec, phrase: <strong>{score.phrase}</strong>
    </li> )


    return (
      <ul>
        { scores }
      </ul>
    )
  }
}

export default LeaderboardList
