import React, { Component, PropTypes } from 'react';
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
import configureStore from './store/configureStore';
import ItemList from './components/ItemList';
import GridList from './components/grid';
import createSagaMiddleware from 'redux-saga'
import mySaga from './actions/sagas'


injectTapEventPlugin();

// create the saga middleware 
const sagaMiddleware = createSagaMiddleware()

//const font = "tahoma";
const store = configureStore([],sagaMiddleware);
/*
const muiTheme = getMuiTheme({
    fontFamily: font
});
*/
const extraProps = {'color' : 'red' };   

const AppComp = () => (
    

    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} />                                
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
