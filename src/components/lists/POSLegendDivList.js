import React from 'react';

import { Alert } from 'react-bootstrap';

export default class POSLegendDivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // TODO: This is done very brute force!!! Change the code later!!
    let posExtendedData = []
    return (
      <tr>
        <td>

          {/* Preposition */}

          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_prep">
                  IN
                </div>
                <div className="pull-right">
                  Preposition
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
                  Conjunction
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
                  Particle
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Noun */}

        <td>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_noun">
                  PRP
                </div>
                <div className="pull-right">
                  Personal Pro
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
                  Possessive Pro.
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
                  Common
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
                  Proper Singular
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
                  Proper Plural
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Adjective */}

        <td>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_adj">
                  JJ
                </div>
                <div className="pull-right">
                  Numeral or Ordinal Adj.
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
                  Comparative Adj.
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
                  Superlative Adj.
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
                  Adverb
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
                  Comparative Adverb
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
                  Superlative Adverb
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Verb */}

        <td>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  MD
                </div>
                <div className="pull-right">
                  Modal
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VB
                </div>
                <div className="pull-right">
                  Base Form
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBD
                </div>
                <div className="pull-right">
                  Past Tense
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBG
                </div>
                <div className="pull-right">
                  Present Participle
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBN
                </div>
                <div className="pull-right">
                  Past Participle
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBP
                </div>
                <div className="pull-right">
                  Present not 3rd Sing.
                </div>
              </li>
              <br></br>
            </div>
          </ul>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_verb">
                  VBZ
                </div>
                <div className="pull-right">
                  Present 3rd Sing.
                </div>
              </li>
              <br></br>
            </div>
          </ul>
        </td>

        {/* Other */}

        <td>
          <ul className="radiant--key-cell_body-cell_list-legend_list">
            <div>
              <li>
                <div className="pull-left radiant--key-cell_color-swatch_text radiant--key-cell_color-swatch_other">
                  CD
                </div>
                <div className="pull-right">
                  Cardinal Numeral
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
                  Foreign Word
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
                  Determiner
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
