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
    const leaders = this.props.leaders.map( (leader, index) =>
    <li key={index}> {leader.name}, score: {leader.score}, time: {leader.time}
      <a key={index} name={index} onClick={ () => this.addHeart(index, !this.state.hearts[index] ? 0 : this.state.hearts[index].count ) } className='heart'> heart(s): {!this.state.hearts[index]? 0 : this.state.hearts[index].count }</a>
    </li> )


    return (
      <ul>
        { leaders }
      </ul>
    )
  }
}

export default LeaderboardList
