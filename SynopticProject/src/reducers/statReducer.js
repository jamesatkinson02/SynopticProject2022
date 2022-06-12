const statReducer = (state, action) => {
  switch(action.type)
  {
    case 'STAT DATA':
        return {
            ...state,
            [action.field]: action.payload
        };
    default:
        return state;
  }
}

export default statReducer;
