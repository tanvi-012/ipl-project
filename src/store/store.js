import {configureStore} from '@reduxjs/toolkit';
import timerReducer from '../reducers/reducers';

export const store = configureStore(
    timerReducer
);

