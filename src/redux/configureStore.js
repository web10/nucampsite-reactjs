import { createStore } from 'redux';
import { Reducer, initialState } from './reducers';

export const configureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
}