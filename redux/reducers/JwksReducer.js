import { GET_JWKS, GET_JWKS_RESPONSE, RESET } from '../actions/types'
import reducerRegistry from '../../../../app/redux/reducers/ReducerRegistry'

const INIT_STATE = {
  jwks: {},
  loading: false,
}

const reducerName = 'jwksReducer'

export default function jwksReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case GET_JWKS:
      return {
        ...state,
        loading: true,
      }
    case GET_JWKS_RESPONSE:
      if (action.payload.data) {
        return {
          ...state,
          jwks: action.payload.data,
          loading: false,
        }
      } else {
        return handleDefault()
      }
    case RESET:
      return {
        ...state,
        jwks: INIT_STATE.jwks,
        loading: INIT_STATE.loading,
      }
    default:
      return handleDefault()
  }
  function handleDefault() {
    return {
      ...state,
      loading: false,
    }
  }
}
reducerRegistry.register(reducerName, jwksReducer)
