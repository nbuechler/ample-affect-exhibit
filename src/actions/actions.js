import fetch from 'isomorphic-fetch';

function getCredentials(){
  return localStorage.getItem('credentials');
}

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
  let metadata = {}
  if (dataset == 'nlp-stats') {
    data = json.statistics
  }
  else if (dataset == 'nlp-analyses') {
    data = json.data
    metadata['totalAnalyses'] = json['total_analyses']
    metadata['countPerPage'] = json['count_per_page']
    metadata['totalPages'] = Math.ceil(json['total_analyses'] / json['count_per_page'])
  }
  else if (dataset == 'nlp-analyses-stats') {
    data = json.data
  }
  else if (dataset !== 'nlp') {
    data = json.all
  }

  return {
    type: RECEIVE_DATA,
    dataset,
    data: data,
    metadata: metadata,
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

function fetchData(dataset, port, metadata) {
  return dispatch => {
    dispatch(requestData(dataset));
    // return fetch(`http://www.user.com/r/${user}.json`)
    // return fetch(`http://127.0.0.1:5000/${user}`)

    let credentials = localStorage.getItem('credentials')

    let options = {
      credentials: credentials
    }

    let ip = window.location.hostname;
    let portNum = port || 3000

    if (dataset == 'nlp-stats') {
      return fetch(`http://` + ip + `:` + port + `/helpers/stats/0/truncated/1`)
        .then(req => req.json())
        .then(json => dispatch(receiveData(dataset, json)));
    } else if (dataset == 'nlp-analyses') {
      let url = `http://` + ip + `:` + `3000/retrieveAllRunAnalyses`
      url += `?page=` + metadata.page
      url += `&countPerPage=` + metadata.countPerPage
      return fetch(url, {
        // credentials: 'include', //pass cookies, for authentication
        method: 'GET',
        // mode: 'CORS', // This line didn't work in firefox
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(req => req.json())
      .then(json => dispatch(receiveData(dataset, json)));
    } else if (dataset == 'nlp-analyses-stats') {
      console.log('rere');
      let url = `http://` + ip + `:` + `3000/retrieveRunAnalysesStats`
      return fetch(url, {
        // credentials: 'include', //pass cookies, for authentication
        method: 'GET',
        // mode: 'CORS', // This line didn't work in firefox
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(req => req.json())
      .then(json => dispatch(receiveData(dataset, json)));
    } else {
      return fetch(`http://` + ip + `:` + portNum + `/${dataset}/?credentials=` + options.credentials)
        .then(req => req.json())
        .then(json => dispatch(receiveData(dataset, json)));
    }
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

export function fetchDataIfNeeded(dataset, port, metadata) {
  console.log(metadata);
  return (dispatch, getState) => {
    let alwaysInvalidate = ['nlp-analyses']
    if (alwaysInvalidate.indexOf(dataset) >= 0) {
      return dispatch(fetchData(dataset, port, metadata));
    }
    else if (shouldFetchData(getState(), dataset, metadata)) {
      return dispatch(fetchData(dataset, port, metadata));
    }
  };
}

export function nlpSubmit(data) {
  return dispatch => {
    dispatch(submitRequest(data))

    let ip = window.location.hostname;

    // let url = `http://` + ip + `:5000/helpers/analyze_emotion_set/` + data.emotion_set +`/`
    let url = `http://` + ip + `:3000/analyzeEmotionSet/`

    fetch(url, {
      // credentials: 'include', //pass cookies, for authentication
      method: 'POST',
      // mode: 'CORS', // This line didn't work in firefox
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveData('nlp', json.data)))
    .catch(err => console.log(err));

  }
}

export function loadNLPAnalysis(data) {
  return dispatch => {
    dispatch(submitRequest(data))

    let ip = window.location.hostname;

    let url = `http://` + ip + `:3000/retrieveRunAnalysis/`
    url += `?analysis_id=` + data.analysis_id
    fetch(url, {
      // credentials: 'include', //pass cookies, for authentication
      method: 'GET',
      // mode: 'CORS', // This line didn't work in firefox
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveData('nlp', json.data)))
    .catch(err => console.log(err));

  }
}
