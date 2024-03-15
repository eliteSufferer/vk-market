import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { productsReducer, cartReducer } from './reducers';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

//@ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;