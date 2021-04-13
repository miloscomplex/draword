import React, { Component } from 'react'
import { API_ROOT } from '../../constants';
import API from '../../services/API'
import { connect } from 'react-redux'

class PhraseSelector extends React.Component {

  state = {
    phrases: [],
  }

  componentDidMount = () => {
    this.handleFetch()
  }

  handleFetch = () => {
    fetch(`${API_ROOT}/random-phrases`)
      .then(res => res.json())
      .then(phrases => this.setState({ phrases }))
  }

  handleClick = event => {
    alert("i was clicked")
    console.log(event.target.innerText)
    this.props.updatePhrase(event.target.innerText)
  }

  render() {

    const phraseList = this.state.phrases.map( (p, index) => <li key={index} onClick={e => this.props.addPhrase(e.target.innerText)}> { p.phrase } </li> )

    return (
      <div>
        <ul className='phrases' >
          { phraseList }
        </ul>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    addPhrase: phrase => dispatch({ type: 'ADD_PHRASE', payload: phrase })
  }
}

const mapStateToProps = state => {
  return {
    selectedPhrase: state.selectedPhrase,

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseSelector)
