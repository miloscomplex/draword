import React, { Component } from 'react'
import { API_ROOT } from '../../constants';
import API from '../../services/API'
import { connect } from 'react-redux'

class PhraseSelector extends React.Component {

  render() {

    //console.log('prop.phrases= ', this.props.phrases);
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

export default PhraseSelector
