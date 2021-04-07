import React, { Component } from 'react'

class PhraseSelector extends React.Component {

  render() {
    const phrases = this.props.phrases.map( (phrase, index) => <li key={index}> { phrase } </li> )

    return (
      <ul className='phrases'>
        { phrases }
      </ul>
    )
  }
}

export default PhraseSelector
