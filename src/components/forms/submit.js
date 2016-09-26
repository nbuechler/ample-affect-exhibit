import { nlpSubmit } from '../../actions/actions'

function submit(values, dispatch) {
  if(values.lang == null){
    values.lang = 'english'
  }
  if(values.emotion_set == null){
    values.emotion_set = 'all_emotions'
  }
  if(values.natural == null){
    values.natural = '1'
  }
  if(values.stemmer == null){
    values.stemmer = '1'
  }
  if(values.lemma == null){
    values.lemma = '1'
  }
  dispatch(nlpSubmit(values));
}

export default submit
