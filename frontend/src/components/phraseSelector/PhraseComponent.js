import React, { Component } from 'react'
import { API_ROOT } from '../../constants';
import API from '../../services/API'
import { connect } from 'react-redux'

class PhraseSelector extends React.Component {

  componentDidMount = () => {
    this.handleFetch()
  }

  handleFetch = () => {
    fetch(`${API_ROOT}/random-phrases`)
      .then(res => res.json())
      .then(phrases => this.props.addPhrases(phrases))
  }

  handleClick = event => {
    alert("i was clicked")
    console.log(event.target.innerText)
    this.props.updatePhrase(event.target.innerText)
  }

  render() {

    console.log(this.props.phrases);
    const phraseList = this.props.phrases.map( (p, index) => <li key={index} onClick={e => this.props.addSelected(e.target.innerText)}> { p.phrase } </li> )

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
    addSelected: phrase => dispatch({ type: 'ADD_SELECTED', payload: phrase }),
    addPhrases: phrases => dispatch({ type: 'ADD_PHRASES', payload: phrases })
  }
}

const mapStateToProps = state => {
  return {
    selectedPhrase: state.selectedPhrase,
    phrases: state.phrases.phrasesList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseSelector)
