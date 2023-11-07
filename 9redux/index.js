const {createStore} = require('redux');

const reducer = (prevState, action) => {
    switch (action.type){
        case 'CHANGE_COMP_A':
            return {
                ...prevState,
                compA: action.data,
            };
        default:
            return prevState;
    }
};



const initialState = {
    compA: 'a',
    compB: 12,
    compC: null,
};

const store = createStore(reducer, initialState);

store.subscribe(()=>{
    //화면 바꿔주는 코드
})

console.log(store.getState());

const changeCompA = (data) => {
    return {
        type: 'CHANGE_COMP_A',
        data,
    }
};

store.dispatch(changeCompA('b'));