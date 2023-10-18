// store/reducers/index.js
const initialState = {
    name: 'Min Turplats',
    coords: [62.835, 16.216, 3],
    marker: false,
    type: 'Sweden',
    vgho: 'Svs',
    detected: false,
    mapDisabled: false,
    showDialog: false,
    showSearch: false,
    myLocationCoords: null,
    animateMarker: false
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_MARKER':
          return { ...state, marked: action.payload };
      case 'SET_COORDS':
        return { ...state, coords: action.payload };
      case 'SET_TYPE':
          return { ...state, type: action.payload };
      case 'SET_VGHO':
          return { ...state, vgho: action.payload };
      case 'SET_DETECTED':
          return { ...state, detected: action.payload };
      case 'SET_MAP_DISABLED':
          return { ...state, mapDisabled: action.payload };
      case 'SET_SHOW_DIALOG':
            return { ...state, showDialog: action.payload };
      case 'SET_SHOW_SEARCH':
            return { ...state, showSearch: action.payload };
      case 'SET_MY_LOCATION_COORDS':
            return { ...state, myLocationCoords: action.payload };
      case 'SET_ANIMATE_MARKER':
            return { ...state, animateMarker: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;