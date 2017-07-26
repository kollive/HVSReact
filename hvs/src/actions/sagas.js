import { call, put, take, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as _ from 'lodash'
import history from '../history'

//import { push } from 'react-router-redux';

const authApi = {
    register(userData) {
        debugger;
        return fetch("http://localhost:4000/reactlogin/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'TTUSO',
                password: 'HNNTD2W3',
                //name      : userData.name,
                //email     : userData.email,        
            })
        })
            .then(statusHelper)
            .then(response => response.json())
            .catch(error => error)
        //.then(data => data)
    },

    login(userData) {
        debugger;
        console.log( userData.user)
        console.log( userData.password)
        return fetch("http://localhost:4000/reactlogin/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.user,
                password: userData.password                
            })
        })
            .then(statusHelper)
            .then(response => response.json())
            .catch(error => error)
        //.then(data => data)
    }
}

function statusHelper(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}
function updateStatus() {
    debugger;
    return put({ type: "ITEMS_IS_LOADING", isLoading: true });
}
export function* getData(action) {
    debugger;
    console.log('authSaga request', action)
    console.log(action.payload)
    //yield put({ type: "ITEMS_IS_LOADING", isLoading: true });
    //yield call(updateStatus);
    try{
    switch (action.type) {
        case 'FETCH_USER_DATA': {
            var response = yield call(authApi.login, action.payload)
            debugger;
            if (response.error) {
                return yield put({ type: "ITEMS_HAS_ERRORED", hasErrored: true })
            }
            debugger;
            if(JSON.parse(response).message == "ok") {
                yield put({ type: "LOGIN_STATUS", message: JSON.parse(response).message })
                //history.push('/grid')
                 this.props.history.push('/grid');   
                //yield put(push('/next-page'));
            } else {
                yield put({ type: "LOGIN_STATUS", message: JSON.parse(response).message })
            }            
            break;            
        }
        case 'DELETE_ROW': {
            const { items } = yield select();
            const newitems = items.filter((itm) => _.trim(itm.gs_pr_name) !== _.trim(action.payload.gs_pr_name));
            yield put({ type: "ITEMS_FETCH_DATA_SUCCESS", items: newitems })
            break;
        }
        case 'UPDATE_ROW': {
            const { items } = yield select();
            const newitems = items.map((itm, index) => {
                if (_.trim(itm.gs_pr_name) !== _.trim(action.payload.gs_pr_name)) {
                    return itm;
                } else {
                    var newItem = {
                        ...itm,
                        gs_pr_name: "kolli"
                        //...action.item
                    }
                    return newItem;
                }
            })
            yield put({ type: "ITEMS_FETCH_DATA_SUCCESS", items: newitems })
            break;
        }
        case 'FETCH_DATA_REQUEST':
            {
                debugger;
                var response = yield call(authApi.register, action.payload)
                debugger;
                console.log('authSaga response', response)
                if (response.error) {
                    return yield put({ type: "ITEMS_HAS_ERRORED", hasErrored: true })
                }

                yield put({ type: "ITEMS_FETCH_DATA_SUCCESS", items: JSON.parse(response).result })
                break;
            }

        default: {
            return null;
            break;
        }
    }
    }catch(e) {
        yield put({ type: 'ITEMS_HAS_ERRORED', hasErrored: true })
    }
}

function* mySaga() {
    try{
        yield takeLatest(["FETCH_DATA_REQUEST", "UPDATE_ROW", "DELETE_ROW","FETCH_USER_DATA"], getData);
    } catch(e) {
        throw e;
    }
}
/*
export function* mySaga() {
  yield* takeLatest("THING_GET_REQUESTED", getData);
}
//export default authApi

function* getData() {
  // Select username from store
  const requestURL = "http://localhost:4000/reactlogin/";

  const headers = {    
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user: 'ttuso',
        password: 'ttuso',
    })    
  };

  try {
    // Call our request helper (see 'utils/request')
    const products = yield call(request, requestURL, headers);
    yield put(productsLoaded(products));
  } catch (err) {
    yield put(productsLoadingError(err));
  }
}
*/


/*
function* fetchThing(action) {
   try {
      const thing = yield call(fetch, `https://api.example.com/things/${action.payload.thingId}`);
      yield put({ type: "THING_RECEIVED", thing });
   } catch(err) {
      yield put({ type: "THING_GETTING_FAILED", message: err.message});
   }
}

export function* thingRequestSaga() {
  yield* takeLatest("THING_GET_REQUESTED", fetchThing);
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}


  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
*/

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.

function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
*/
//mySaga.contextTypes = {
  //router: PropTypes.object.isRequired,
//};

export default mySaga;