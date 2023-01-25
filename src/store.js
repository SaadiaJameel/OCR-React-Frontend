import {configureStore} from '@reduxjs/toolkit';
import userDataReducer from './Reducers/userDataSlice';

export default configureStore({
    reducer: {
        userData: userDataReducer,
    }
})