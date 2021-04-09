import * as types from '../actions/actionTypes'
import initialState from './initialState'
 const LoadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return action.status
    default:
      return state
  }
}
export default LoadingReducer;