import React from 'react';

import DivList from '../lists/DivList'

export default class AffectSummaryRankRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let array = this.props.data;
    let i = this.props.iterator;

    return (
      <tr key={i + '-affect-row'}>
        <td>
          <div className="affect--display_name" key={i + '-r-affect'}>
              {array[i].emotion}
          </div>
        </td>
        <td>
          <div className="affect--display_rank" key={i + '-r-rank'}>
              {i + 1}
          </div>
        </td>
        <td>
          <div className="affect--display_scores" key={i + '-normal-scores'}>
              {array[i].normalized_r_score.toFixed(4)}
          </div>
        </td>
      </tr>
    );

  }
}
