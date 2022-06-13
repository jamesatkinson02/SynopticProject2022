export default formReducer = (state, action) => {
  switch(action.type)
  {
    case 'FORM INPUT':
        return {
            ...state,
            [action.field]: action.payload
        };
    case 'FORM ERROR':
        return {
            ...state,
            error: action.error
        };
    default:
        return state;
  }
}
