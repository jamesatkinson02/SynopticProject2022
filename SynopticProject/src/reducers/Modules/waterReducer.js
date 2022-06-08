const waterReducer = (state, action) => {
  switch(action.type)
  {
      case 'GRAPH DATA':
          return {
              ...state,
              [action.field]: action.payload
          };
      default:
          return state;
  }
}

export default waterReducer;
