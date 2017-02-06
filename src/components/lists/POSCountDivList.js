import React from 'react';

import { Alert } from 'react-bootstrap';

export default class POSCountDivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // TODO: This is done very brute force!!! Change the code later!!
    let posExtendedData = this.props.posExtendedData
    return (
      <tr>
        <td>

          {/* Preposition */}

          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_prep">
                  IN
                </div>
                <div className="pull-right">
                  {posExtendedData[0]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_prep">
                  CC
                </div>
                <div className="pull-right">
                  {posExtendedData[1]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_prep">
                  RP
                </div>
                <div className="pull-right">
                  {posExtendedData[2]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Noun */}

        <td>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_noun">
                  PRP
                </div>
                <div className="pull-right">
                  {posExtendedData[3]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_noun">
                  PRP$
                </div>
                <div className="pull-right">
                  {posExtendedData[4]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_noun">
                  NN
                </div>
                <div className="pull-right">
                  {posExtendedData[5]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_noun">
                  NNP
                </div>
                <div className="pull-right">
                  {posExtendedData[6]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_noun">
                  NNS
                </div>
                <div className="pull-right">
                  {posExtendedData[7]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Adjective */}

        <td>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  JJ
                </div>
                <div className="pull-right">
                  {posExtendedData[8]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  JJR
                </div>
                <div className="pull-right">
                  {posExtendedData[9]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  JJS
                </div>
                <div className="pull-right">
                  {posExtendedData[10]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  RB
                </div>
                <div className="pull-right">
                  {posExtendedData[11]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  RBR
                </div>
                <div className="pull-right">
                  {posExtendedData[12]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  RBS
                </div>
                <div className="pull-right">
                  {posExtendedData[13]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Verb */}

        <td>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  MD
                </div>
                <div className="pull-right">
                  {posExtendedData[14]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VB
                </div>
                <div className="pull-right">
                  {posExtendedData[15]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBD
                </div>
                <div className="pull-right">
                  {posExtendedData[16]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBG
                </div>
                <div className="pull-right">
                  {posExtendedData[17]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBN
                </div>
                <div className="pull-right">
                  {posExtendedData[18]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBP
                </div>
                <div className="pull-right">
                  {posExtendedData[19]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBZ
                </div>
                <div className="pull-right">
                  {posExtendedData[20]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Other */}

        <td>
          <ul className="radiant--key-cell_body-cell_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_other">
                  CD
                </div>
                <div className="pull-right">
                  {posExtendedData[21]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_other">
                  FW
                </div>
                <div className="pull-right">
                  {posExtendedData[22]}
                </div>
              </li>
              <br></br>
            </div>
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_other">
                  DT
                </div>
                <div className="pull-right">
                  {posExtendedData[23]}
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>
      </tr>
    );

  }

}
