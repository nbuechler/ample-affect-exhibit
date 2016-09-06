import { nlpSubmit } from '../../actions/actions'

function submit(values, dispatch) {
  dispatch(nlpSubmit(values));
}

export default submit
