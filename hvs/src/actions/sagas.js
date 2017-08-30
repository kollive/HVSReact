import { all, actionChannel, call, put, take, takeEvery, takeLatest, select, cancel, cancelled, fork, race, apply } from 'redux-saga/effects'
import { delay, buffers, eventChannel, END } from 'redux-saga'
import * as _ from 'lodash'
//import history from '../history'
import * as io from 'socket.io-client';

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
        console.log(userData.user)
        console.log(userData.password)
        return fetch("http://localhost:3003/loginsvc/", {
        //return fetch("http://localhost:4000/reactlogin/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usr: userData.user,
                pwd: userData.password
            })
        })
            .then(statusHelper)
            .then(response => response.json())
            .catch(error => error)
    },

    loadTO(userData) {
        debugger;        
        //console.log(userData.password)
        return fetch("http://localhost:3003/toLoadSvc/", {
        //return fetch("http://localhost:4000/reactlogin/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + userData.token
            },
            body: JSON.stringify({
                usr: "",
                pwd: ""
            })
        })
            .then(statusHelper)
            .then(response => response.json())
            .catch(error => {
                debugger;
                console.log(error);
                error
                /*
                console.log( JSON.parse(error.status));
                var retObj = {};
                retObj.status = JSON.parse(error.status);
                retObj.statusText =JSON.parse(error.statusText);
                return retObj
                */
            })
    }
    //.then(data => data)
}

function* login(userData) {
    debugger;
    try {
        //yield call(delay, 5000)
        console.log(userData.user)
        console.log(userData.password)
        yield put({ type: "ITEMS_IS_LOADING", isLoading: false })
        const resultObj = yield call(authApi.login, userData)
        sessionStorage.setItem('token', JSON.parse(resultObj).token);
        yield put({ type: "LOGIN_STATUS", message: JSON.parse(resultObj).message })
        //yield put({ type: "LOGIN_STATUS", message: JSON.parse(resultObj).token })
    } finally {
        debugger;
        if (yield cancelled())
            yield put({ type: "LOGIN_STATUS", message: 'Task Cancelled' })
    }
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket) {
    debugger;
    yield call(delay, 2000);

    debugger;
    yield socket.emit('pong-message','data');
    //yield  apply(socket, socket.emit, ['pong-message',{payload: 'data'}]);
    //yield  apply(socket, socket.emit, ['add-message','data']);
    //yield  apply(socket, socket.emit, ['pong',{payload: 'data'}]);
    //yield socket.send('pong');
    //yield socket.emit('pong', 'Hello');
    //return socket.emit('pong', 'Hello');
    //yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context    
    //this.socket.emit('add-message', message);    
    //yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context
    //socket.send(JSON.stringify({ type: 'setTask', status: 'open' }));
}

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel((emit) => {
        debugger;
        socket.onopen = () => {
            socket.send('Connection estabished'); // Send data to server
        };

        const pingHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            debugger;
            if (event) {
                console.log(event)
                emit(event.payload)
            }
        }

        debugger;
        // setup the subscription
        socket.on('ping', pingHandler);
        //socket.on('pong', pongHandler);

         
        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            //debugger;
            socket.off('ping', pingHandler)
        }
        return unsubscribe;        
        /*
        socket.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          emit({ item:`${msg.variable}`});
        };
        return () => {
          socket.close();
        };
        */
    });
}

function* createWebSocketConnection() {
    //const socket = new WebSocket(`wss://example.com/?token=${token}`);
    //const socket = new WebSocket(`wss://localhost:4000/`);    
    debugger;
    const socket = io("http://localhost:4000/");
    return socket;
}

export function* watchOnPings() {
    debugger;
    const socket = yield call(createWebSocketConnection)
    const socketChannel = yield call(createSocketChannel, socket)

    while (true) {
        debugger;
        const payload = yield take(socketChannel)
        debugger;
        yield put({ type: 'INCOMING_PONG_PAYLOAD', payload })
        yield fork(pong, socket)
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function statusHelper(response) {
    if (!response.ok) {
        console.log(response)
        throw Error(response.status);
    }
    return response;
    /*
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
    */
}
function updateStatus() {
    debugger;
    return put({ type: "ITEMS_IS_LOADING", isLoading: true });
}

function* loadTO(userData) {
    debugger;
    try {
        //yield call(delay, 5000)
        console.log("saga s" + userData.token)
        //console.log(userData.password)
        //yield put({ type: "ITEMS_IS_LOADING", isLoading: false })
        const resultObj = yield call(authApi.loadTO, userData)
        debugger;
        console.log(resultObj);
        if (resultObj !== null && resultObj !== undefined) {        
            sessionStorage.setItem('token', JSON.parse(resultObj).token);
            //yield put({ type: "LOGIN_STATUS", message: JSON.parse(resultObj).message })
            yield put({ type: "LOGIN_STATUS", message: JSON.parse(resultObj).message })            
        } else {
            //yield put({ type: "LOGIN_STATUS", message: JSON.parse(resultObj).message })
            yield put({ type: "LOGIN_STATUS", message: "Unauthorized"})
        }
    } finally {
        debugger;
        if (yield cancelled())
            yield put({ type: "LOGIN_STATUS", message: 'Task Cancelled' })
    }
}


export function* handleRequest(action) {
    debugger;
    console.log('authSaga request', action)
    console.log(action.payload)
    //yield put({ type: "ITEMS_IS_LOADING", isLoading: true });
    //yield call(updateStatus);
    try {
        switch (action.type) {
            case 'FETCH_TO_DATA': {
                const fetchTO = yield fork(loadTO, action.payload)
                break;
            }
            case 'FETCH_USER_DATA': {
                yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
                /*
                debugger;
                const {loginret, timeout} = yield race({
                    posts: call(login, action.payload),
                    timeout: call(delay, 1000)
                })
                if (loginret)
                    put({type: 'LOGIN_STATUS',  message: 'never reaches' })
                else
                    put({type: 'LOGIN_STATUS',  message: 'Timed out in race'})                
                */

                //yield put({ type: "LOGIN_STATUS", message: ''})
                //yield put ({ type: "ITEMS_IS_LOADING", isLoading: true })            
                //var response = yield call(authApi.login, action.payload)
                debugger;
                const fetchTask = yield fork(login, action.payload)
                debugger;
                //yield call(delay, 2000)
                //yield cancel(fetchTask)
                //yield put({ type: "ITEMS_IS_LOADING", isLoading: false })
                //debugger;
                /*
                if (response.error) {
                    return yield put({ type: "ITEMS_HAS_ERRORED", hasErrored: true })
                }
                debugger;
                if (JSON.parse(response).message == "ok") {
                    yield put({ type: "LOGIN_STATUS", message: JSON.parse(response).message })
                    //history.push('/grid')
                    //this.props.history.push('/grid');   
                    //yield put(push('/next-page'));
                } else {
                    yield put({ type: "LOGIN_STATUS", message: JSON.parse(response).message })
                }
                */
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
    } catch (e) {
        yield put({ type: 'ITEMS_HAS_ERRORED', hasErrored: true })
    }
}

function* mySaga() {

    try {
        //yield watchOnPings()
        yield [watchOnPings(),takeLatest(["FETCH_DATA_REQUEST", "UPDATE_ROW", "DELETE_ROW", "FETCH_USER_DATA","FETCH_TO_DATA"], handleRequest)];
        /*
        const requestChan = yield actionChannel(["FETCH_DATA_REQUEST", "UPDATE_ROW", "DELETE_ROW", "FETCH_USER_DATA"])
        while (true) {
            debugger;
            // 2- take from the channel
            const  payload  = yield take(requestChan)
            // 3- Note that we're using a blocking call
            yield call(handleRequest, payload)
        }
        */
    } catch (e) {
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