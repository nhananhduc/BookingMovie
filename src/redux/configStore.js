import { applyMiddleware, combineReducers, legacy_createStore as createStore, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
import { QuanLyUserReducer } from './reducers/QuanLyUserReducer';
import { VideoModalReducer } from './reducers/VideoModalReducer';

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyUserReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    VideoModalReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk))