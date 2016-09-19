import React from 'react';

export default class DivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let array = this.props.list;
    let list_of_words = [];
    for (var i = 0; i < array.length; i++) {
      list_of_words.push(
        <ul>'hello'</ul>
      )
    }
    return (
      <div>
        {list_of_words}
      </div>
    );

  }

}
