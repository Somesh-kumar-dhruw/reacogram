

const initialaState = {
    user: {}
}

export const userReducer = (state = initialaState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state, user: action.payload
            }; 
        case "LOGIN_ERROR":
            return initialaState;
        default:
            return initialaState;
    }
}