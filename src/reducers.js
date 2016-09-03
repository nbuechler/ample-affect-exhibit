import { combineReducers } from 'redux';
import {
  SELECT_FRIEND_DATASET, INVALIDATE_DATASET,
  REQUEST_DATA, RECEIVE_DATA
} from './actions/actions';

function selectedFriendDataset(state = 'friendsOverview', action) {
  switch (action.type) {
  case SELECT_FRIEND_DATASET:
    return action.dataset; // these need to be smarter, maybe?
  default:
    return state;
  }
}

function selectedExperienceDataset(state = 'experiencesOverview', action) {
  switch (action.type) {
  case SELECT_EXPERIENCE_DATASET:
    return action.dataset; // these need to be smarter, maybe?
  default:
    return state;
  }
}

function selectedActivityDataset(state = 'activitiesOverview', action) {
  switch (action.type) {
  case SELECT_ACTIVITY_DATASET:
    return action.dataset; // these need to be smarter, maybe?
  default:
    return state;
  }
}

function selectedReflectionDataset(state = 'userSpokeUniqueWord', action) {
  switch (action.type) {
  case SELECT_ACTIVITY_DATASET:
    return action.dataset; // these need to be smarter, maybe?
  default:
    return state;
  }
}

function data(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_DATASET:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_DATA:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.data,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

function dataByDataset(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_DATASET:
  case RECEIVE_DATA:
  case REQUEST_DATA:
    return Object.assign({}, state, {
      [action.dataset]: data(state[action.dataset], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  dataByDataset,
  selectedFriendDataset,
});

export default rootReducer;
