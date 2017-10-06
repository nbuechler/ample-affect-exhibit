import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import POSLegendDivList from '../lists/POSLegendDivList'

import { Table, Alert } from 'react-bootstrap';

class NLPNLTKPOSTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { data, isFetching, lastUpdated } = this.props;

    return (
      <div>
        <div className="radiant--graph-title">
          Part-of-speech Legend
        </div>
        <div className="radiant--graph-wrapper">
          <Table condensed key={'table'} style={{
              fontSize: '12px',
              textAlign: 'left',
              width: '100%',
              tableLayout: 'fixed',
              padding: '10px',
            }}>
            <thead>
              <tr>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch here radiant--key-cell_color-swatch_prep"></div>
                    Preposition
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_noun"></div>
                    Noun
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_adj"></div>
                    Adjective
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_verb"></div>
                    Verb
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_other"></div>
                    Other
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <POSLegendDivList/>
            </tbody>
          </Table>
        </div>
        <div className=""
             style={{
               textAlign: 'right',
               fontSize: '10px',
             }}>
          Each double or triple group of letters represents a part-of-speech as denoted by
          <a style={{marginLeft: '3px'}} href="http://www.nltk.org/">NLTK</a>
        </div>
      </div>
    );
  }
}

NLPNLTKPOSTable.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset['nlp'] || {
    isFetching: true,
    items: []
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPNLTKPOSTable);
