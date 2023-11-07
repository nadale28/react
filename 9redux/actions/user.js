
const logIn = (data) => { // async action creator
    return (dispatch, getState) => {
        dispatch(logInRequest(data));
        setTimeout(()=>{
            dispatch(logInSuccess({
                userId: 1,
                nickname: 'inhwan'
            }));
        }, 2000);
    };
}

const logInRequest = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

const logInSuccess = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

const logIn = (data) => { // sync action creator
    return {
        type: 'LOG_IN',
        data,
    };
};

const logOut = (data) => {
    return {
        type: 'LOG_OUT',
    };
};