import React from 'react';

import DivListGroup from '../groups/DivListGroup'
import DivList from '../lists/DivList'
import StatisticGroup from '../groups/StatisticGroup'
import AffectUnprocessedRowTableGroup from '../groups/AffectUnprocessedRowTableGroup'
import AffectStemmedRowTableGroup from '../groups/AffectStemmedRowTableGroup'
import AffectLemmatizedRowTableGroup from '../groups/AffectLemmatizedRowTableGroup'
import AffectCorpusLengthRowTableGroup from '../groups/AffectCorpusLengthRowTableGroup'
import AffectNormalizedScoreRowTableGroup from '../groups/AffectNormalizedScoreRowTableGroup'

import { Table, Alert } from 'react-bootstrap';

export default class NLPComprehensiveTableModule extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let array = this.props.array;
    let i = this.props.iterator;

    return (
      <div key={array[i].emotion + '-group'} className="affect-display_emotion">
        <div className='pull-left'>
          <div>
            <span key={i + '-r-affect'} className="affect--display_name">
              {array[i].emotion}
            </span>
            <span className="affect--display_rank">
              {i + 1}
            </span>
          </div>
          <div className="affect--display_scores">
            <span key={i + '-normal-scores'}>
              {array[i].normalized_r_score.toFixed(4)}
            </span>
            <span style={{marginLeft: '2px', color: '#AAA'}}>
              (<i >{array[i].r_affect_score.toFixed(4)}</i>)
            </span>
          </div>
        </div>
        <Table condensed key={i + '-table'} style={{fontSize: '12px', marginLeft: '0%', textAlign: 'center'}}>
          <thead>
            <tr>
              <th></th>
              <th>I Words</th>
              <th>II Words</th>
              <th>III Words</th>
              <th>I-II Words</th>
              <th>I-III Words</th>
              <th>II-III Words</th>
              <th>I-II-III Words</th>
            </tr>
          </thead>
          <tbody>
            <AffectUnprocessedRowTableGroup data={array[i]}></AffectUnprocessedRowTableGroup>
            <AffectStemmedRowTableGroup data={array[i]}></AffectStemmedRowTableGroup>
            <AffectLemmatizedRowTableGroup data={array[i]}></AffectLemmatizedRowTableGroup>
            <AffectCorpusLengthRowTableGroup data={array[i]}></AffectCorpusLengthRowTableGroup>
            <AffectNormalizedScoreRowTableGroup data={array[i]}></AffectNormalizedScoreRowTableGroup>
          </tbody>
        </Table>
      </div>
    );

  }
}
