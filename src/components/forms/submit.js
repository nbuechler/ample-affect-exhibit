import { nlpSubmit } from '../../actions/actions'

function submit(values, dispatch) {
  if(values.lang == null){
    values.lang = 'english'
  }
  if(values.emotion_set == null){
    values.emotion_set = 'all_emotions'
  }
  dispatch(nlpSubmit(values));
}

export default submit
