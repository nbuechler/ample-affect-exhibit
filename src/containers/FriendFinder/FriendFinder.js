import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectFriendDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';

import Picker from '../../components/Picker';

import { Table } from 'react-bootstrap';

class Display extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedFriendDataset } = this.props;
    dispatch(fetchDataIfNeeded(selectedFriendDataset));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFriendDataset !== this.props.selectedFriendDataset) {
      const { dispatch, selectedFriendDataset } = nextProps;
      dispatch(fetchDataIfNeeded(selectedFriendDataset));
    }
  }

  handleChange(nextDataset) {
    this.props.dispatch(selectFriendDataset(nextDataset));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedFriendDataset } = this.props;
    dispatch(invalidateDataset(selectedFriendDataset));
    dispatch(fetchDataIfNeeded(selectedFriendDataset));
  }

  render () {
    const { selectedFriendDataset, data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedFriendDataset) {
        case 'friendsOverview':
          //Primary Area
          primaryArea = <div>Hello Friends!</div>

          //Secondary Area
          secondaryArea = <div></div>;
          break;
        default:
          break;
      }
    }
    return (
      <div style={{paddingBottom: '100px'}}>
        <h1>Friend Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedFriendDataset}
                onChange={this.handleChange}
                options={['0', '1', '2', '3']}
                apiOptions={['friendsOverview']}
                displayOptions={['View all friends']}
                descriptionPrimary={data[2].description_primary ? data[2].description_primary : 'None' }
                descriptionSecondary={data[3].description_secondary ? data[3].description_secondary : 'None' }
                title={data[4].title} />
        }
          <p style={{borderTop: 'solid #BBB 1px', margin: '50px'}}>
            <br></br>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
            <br></br>
            <br></br>
          {!isFetching &&
            <a href='#'
               className='btn btn-default'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && data.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && data.length === 0 &&
          <h2>Empty.</h2>
        }
        {data.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
                {primaryArea}
            </div>
            <br></br>
            <div style={{ textAlign: 'center' }}>
                {secondaryArea}
            </div>
          </div>
        }
      </div>
    );
  }
}

Display.propTypes = {
  selectedFriendDataset: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedFriendDataset, dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset[selectedFriendDataset] || {
    isFetching: true,
    items: []
  };

  return {
    selectedFriendDataset,
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Display);
