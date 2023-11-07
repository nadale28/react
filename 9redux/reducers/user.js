const initialState = {
    isLogginIn: false,
    data: null
};

const userReducer = (prevState, action) => {
    switch (action.type){
        case 'LOG_IN':
            return {
                ...prevState,
                data: action.data,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                data: null,
            };
        default:
            return prevState;
    }
};

module.exports = userReducer;