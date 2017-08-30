
import React, { Component, PureComponent,PropTypes } from 'react';
import { all, actionChannel, call, put, take, takeEvery, takeLatest, select, cancel, cancelled, fork, race, apply } from 'redux-saga/effects'
import { delay, buffers, eventChannel, END } from 'redux-saga'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createSagaMiddleware from 'redux-saga'
import configureStore from './store/configureStore';
import ToComponent from './components/To';
import ItemList from './components/ItemList';
import GridList from './components/grid';
import mySaga from './actions/sagas'


injectTapEventPlugin();

const extraProps = {'color' : 'red' };   

/*
const muiTheme = getMuiTheme({
    fontFamily: font
});
*/
/*
// Routes
const routes = {
  '/': Index,
  *'/tower'() {
    yield call(delay, 1000);
    yield Tower;
  }
};


function Navigation() {
  return <ul>
    <li><a href='#/'>Index</a></li>
    <li><a href='#/tower'>Tower</a></li>
  </ul>;
}

class Index extends PureComponent {
  render() {
    return <div>
      <h1>Index</h1>
      <Navigation />
      <p>Hi, I'm index page.</p>
    </div>;
  }
}

class Tower extends PureComponent {
  render() {
    return <div>
      <h1>Tower</h1>
      <Navigation />
      <p>Here is tower page. You waited a while for loading this page.</p>
    </div>;
  }
}


// History
const history = createHashHistory();

// Saga
function* rootSaga() {
  yield fork(routerSaga, { history, routes });
}
*/

// create the saga middleware 
const sagaMiddleware = createSagaMiddleware()

//const font = "tahoma";
const store = configureStore([],sagaMiddleware);

/*
// Reducer
const reducer = combineReducers(
  { router: routerReducer }
);

const store = createStore(reducer, {}, applyMiddleware(
  sagaMiddleware, logger()
));
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <Router />
</Provider>
*/


const AppComp = () => (
    

    <Provider store={store}>
        <MuiThemeProvider>
            
            
            <BrowserRouter>            
                <div>                    
                    <Route exact path="/" component={App} />                                
                    <Route exact path="/to" component={ToComponent} />     
                    <Route path="/grid"  render={(props) => (
                        <GridList {...props} data={extraProps}/>
                    )} />    
                    
                </div>
            </BrowserRouter>
            
        </MuiThemeProvider>
    </Provider>
);

// then run the saga 
sagaMiddleware.run(mySaga)
 
ReactDOM.render(< AppComp />, document.getElementById('root'));
registerServiceWorker();

