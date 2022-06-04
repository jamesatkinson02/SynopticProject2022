export const loginReducer = (state, action) => {
    switch(action.type)
    {
        case 'FORM INPUT':
            return {
                ...state,
                [action.field]: action.payload
            };
        default:
            return state;
    }
}