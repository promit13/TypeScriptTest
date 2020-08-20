import {createEpicMiddleware} from 'redux-observable';
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from '../reducers/index';
import {authEpic} from '../actions/auth';

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const reduxMiddleware = applyMiddleware(epicMiddleware, thunkMiddleware);
  const store = createStore(rootReducer, {}, reduxMiddleware);

  epicMiddleware.run(authEpic);

  return store;
}
