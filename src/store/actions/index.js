export const setName = (name) => ({
  type: 'SET_NAME',
  payload: name
});

export const setCoords = (coords) => ({
  type: 'SET_COORDS',
  payload: coords
});

export const setMarker = (marked) => ({
  type: 'SET_MARKER',
  payload: marked
});

export const setType = (type) => ({
  type: 'SET_TYPE',
  payload: type
});

export const setVgho = (vgho) => ({
  type: 'SET_VGHO',
  payload: vgho
});

export const setDetected = (detected) => ({
  type: 'SET_DETECTED',
  payload: detected
});

export const setMapDisabled = (mapDisabled) => ({
  type: 'SET_MAP_DISABLED',
  payload: mapDisabled
});

export const setShowDialog = (showDialog) => ({
  type: 'SET_SHOW_DIALOG',
  payload: showDialog
});

export const setShowSearch = (showSearch) => ({
  type: 'SET_SHOW_SEARCH',
  payload: showSearch
});

export const setMyLocationCoords = (MyLocationCoords) => ({
  type: 'SET_MY_LOCATION_COORDS',
  payload: MyLocationCoords
});

export const setAnimateMarker = (animateMarker) => ({
  type: 'SET_ANIMATE_MARKER',
  payload: animateMarker
});