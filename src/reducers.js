import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  INVALIDATE_DATASET,
  REQUEST_DATA, RECEIVE_DATA
} from './actions/actions';

function data(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  metadata: {}
}, action) {
  console.log(state);
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
      metadata: action.metadata,
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
  form: formReducer     // <---- Mounted at 'form'
});

export default rootReducer;
