
const {createStore, applyMiddleware, compose} = require('redux');

const reducer = require('./reducers/index');
const {addPost} = require('./actions/post');
const {logIn, logOut} = require('./actions/user');


const initialState = {
    user: {
        isLogginIn: true,
        data: null
    },
    posts: [],
    comments: [],
    favorites: [],
    history: [],
    likes: [],
    followers: [],
}

const firstMiddleware = (store) => (dispatch) => (action) => {
    console.log('로깅',action);
    dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
    console.log('로깅',action);
    if(typeof action === 'function'){ //비동기
        return action(store.dispatch, store.getState);
    }
    return dispatch(action);
};

const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);

const store = createStore(reducer, initialState, enhancer);