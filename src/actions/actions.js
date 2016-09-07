import fetch from 'isomorphic-fetch';


export const REQUEST_DATA = 'REQUEST_DATA';
function requestData(dataset) {
  return {
    type: REQUEST_DATA,
    dataset
  };
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
function receiveData(dataset, json) {

  let data = [json] // makes this an array so that the mapstatetoprops is happy
  if (dataset !== 'nlp') {
    data = json.all
  }

  return {
    type: RECEIVE_DATA,
    dataset,
    data: data,
    receivedAt: Date.now()
  };
}

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
function submitRequest(values) {
  return {
    type: SUBMIT_REQUEST,
    values,
    receivedAt: Date.now()
  };
}

function fetchData(dataset, port) {
  return dispatch => {
    dispatch(requestData(dataset));
    // return fetch(`http://www.user.com/r/${user}.json`)
    // return fetch(`http://127.0.0.1:5000/${user}`)

    let options = {
      credentials: localStorage.getItem('credentials') | 'none'
    }

    let ip = window.location.hostname;
    let portNum = port || 3000

    return fetch(`http://` + ip + `:` + portNum + `/${dataset}/?credentials=` + options.credentials)
      .then(req => req.json())
      .then(json => dispatch(receiveData(dataset, json)));
  };
}

function shouldFetchData(state, dataset) {
  const data = state.dataByDataset[dataset];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
}

export function fetchDataIfNeeded(dataset) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), dataset)) {
      return dispatch(fetchData(dataset));
    }
  };
}

export function nlpSubmit(data) {
  return dispatch => {
    dispatch(submitRequest(data))

    let ip = window.location.hostname;

    // TODO: Change 'emotion_ml' to a paramater that is extacted from the data!
    let url = `http://` + ip + `:5000/helpers/analyze_emotion_set/emotion_ml/`

    fetch(url, {
      // credentials: 'include', //pass cookies, for authentication
      method: 'POST',
      mode: 'CORS',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveData('nlp', json)))
    .catch(err => console.log(err));

  }
}
