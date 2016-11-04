import React from 'react';

import DivList from '../lists/DivList'

export default class DivListGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;
    let order = this.props.order;

    function renderLists(order) {
      switch (order) {
        case '1':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_order_1_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_order_1_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_order_1_fdist}/>
            </div>
            )
          break;
        case '2':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_order_2_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_order_2_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_order_2_fdist}/>
            </div>
            )
          break;
        case '3':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_order_3_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_order_3_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_order_3_fdist}/>
            </div>
            )
          break;
        case '1_2':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_order_1_and_2_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_order_1_and_2_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_order_1_and_2_fdist}/>
            </div>
            )
          break;
        case '1_3':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_order_1_and_3_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_order_1_and_3_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_order_1_and_3_fdist}/>
            </div>
            )
          break;
        case '2_3':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_order_2_and_3_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_order_2_and_3_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_order_2_and_3_fdist}/>
            </div>
            )
          break;
        case '123':
          return (
            <div>
              <div>
                <span><strong>Unprocessed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.natural_all_orders_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Stemmed</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.stemmer_all_orders_fdist}/>
              <hr></hr>
              <div>
                <span><strong>Lemmatized</strong></span>
              </div>
              <br></br>
              <DivList fdist={data.lemma_all_orders_fdist}/>
            </div>
            )
          break;
        default:
          return 'Unable to render'

      }
    }

    return (
      renderLists(order)
    );

  }
}
