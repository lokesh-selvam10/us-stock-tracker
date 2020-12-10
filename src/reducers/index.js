import themeReducer from './theme';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    theme: themeReducer,
})

export default allReducers