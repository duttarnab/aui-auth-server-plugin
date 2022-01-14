import { call, all, put, fork, takeLatest, select } from 'redux-saga/effects'
import { isFourZeroOneError } from '../../../../app/utils/TokenController'
import { getAcrsResponse, editAcrsResponse } from '../actions/AcrsActions'
import { getAPIAccessToken } from '../../../../app/redux/actions/AuthActions'
import { GET_ACRS, PUT_ACRS } from '../actions/types'
import AcrApi from '../api/AcrApi'
import { getClient } from '../../../../app/redux/api/base'
const JansConfigApi = require('jans_config_api')

function* newFunction() {
  const token = yield select((state) => state.authReducer.token.access_token)
  const issuer = yield select((state) => state.authReducer.issuer)
  const api = new JansConfigApi.DefaultAuthenticationMethodApi(
    getClient(JansConfigApi, token, issuer),
  )
  return new AcrApi(api)
}

export function* getCurrentAcrs() {
  try {
    const api = yield* newFunction()
    const data = yield call(api.getAcrsConfig)
    yield put(getAcrsResponse(data))
  } catch (e) {
    yield put(getAcrsResponse(null))
    if (isFourZeroOneError(e)) {
      const jwt = yield select((state) => state.authReducer.userinfo_jwt)
      yield put(getAPIAccessToken(jwt))
    }
  }
}

export function* editAcrs({ payload }) {
  try {
    const api = yield* newFunction()
    const data = yield call(api.updateAcrsConfig, payload.data)
    yield put(editAcrsResponse(data))
  } catch (e) {
    yield put(editAcrsResponse(null))
    if (isFourZeroOneError(e)) {
      const jwt = yield select((state) => state.authReducer.userinfo_jwt)
      yield put(getAPIAccessToken(jwt))
    }
  }
}

export function* watchGetAcrsConfig() {
  yield takeLatest(GET_ACRS, getCurrentAcrs)
}

export function* watchPutAcrsConfig() {
  yield takeLatest(PUT_ACRS, editAcrs)
}
export default function* rootSaga() {
  yield all([fork(watchGetAcrsConfig), fork(watchPutAcrsConfig)])
}
