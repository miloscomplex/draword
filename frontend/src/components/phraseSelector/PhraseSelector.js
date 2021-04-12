import React, { Component } from 'react'
import { API_ROOT } from '../../constants';
import API from '../../services/API'

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

  render() {
    const phraseList = this.state.phrases.map( (p, index) => <li key={index}> { p.phrase } </li> )

    return (
      <div>
        <ul className='phrases'>
          { phraseList }
        </ul>
      </div>
    )
  }

}

export default PhraseSelector
