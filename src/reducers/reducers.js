const initialState = {
    timeRunning: false,
}

const timerReducer = (state = initialState , action) => {
    switch (action.type){
        case 'START_TIMER':
            return{ ...state, timeRunning: true};
        default:
            return state;
    }
};

export default timerReducer;