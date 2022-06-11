const moduleReducer = (state, action) => {
  switch(action.type)
  {
      case 'GRAPH DATA':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.field]: action.payload
                }
            };
        case 'LAYOUT DATA':
            return {
                ...state,
                layout: {
                    ...state.layout,
                    [action.field]: action.payload
                }
            };
        default:
            return state;
  }
}

export default moduleReducer;
