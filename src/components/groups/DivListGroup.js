import React from 'react';

import DivList from '../lists/DivList'

export default class DivListGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;

    function renderLists() {
      return (
        <div>
          <div>
            <span><strong>Unprocessed</strong></span>
          </div>
          <br></br>
          <DivList fdist={data.natural_order_fdist}/>
          <hr></hr>
          <div>
            <span><strong>Stemmed</strong></span>
          </div>
          <br></br>
          <DivList fdist={data.stemmer_order_fdist}/>
          <hr></hr>
          <div>
            <span><strong>Lemmatized</strong></span>
          </div>
          <br></br>
          <DivList fdist={data.lemma_order_fdist}/>
        </div>
        )
    }

    return (
      renderLists()
    );

  }
}
