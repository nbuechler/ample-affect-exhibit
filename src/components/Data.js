import React, { PropTypes, Component } from 'react';

export default class Data extends Component {
  render () {
    return (
      <ul>
        {this.props.data.map((data, i) =>
          <li key={i}>{data}</li>
        )}
      </ul>
    );
  }
}

Data.propTypes = {
  data: PropTypes.array.isRequired
};
