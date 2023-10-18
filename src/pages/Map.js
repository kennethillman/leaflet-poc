import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents  } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setCoords, setMarker, setDetected, setMapDisabled, setType, setMyLocationCoords, setAnimateMarker } from '../store/actions';
import L from 'leaflet';

import jsonDefault from '../data/default.json';

import imagePinShadow from "../assets/images/pinShadow.png";
import imagePinIcon from "../assets/images/pinIcon.png";


function Play() {
  const dispatch = useDispatch();

  // State - Redux
  const marked = useSelector((state) => state.marked);
  const detected = useSelector((state) => state.detected);
  const type = useSelector((state) => state.type);
  const myLocationCoords = useSelector((state) => state.myLocationCoords);
  const animateMarker = useSelector((state) => state.animateMarker);

  const mapRef = useRef();

/* 
  "My Location" - Button
*/

  const handleClickMyLocation = () => {
    dispatch(setType('MyLocation'))
    if (myLocationCoords) {
      dispatch(setCoords(myLocationCoords));
    } else {

    }
  }

/* 
  Render
*/

  return ( 
    <div className={`poc-page-map type-${type} ${animateMarker ? 'marker-animate' : 'marker-hide'} ${marked ? 'position-marked' : ''} ${detected ? detected : ''}`}>
      
      {/* THE MAP */}
      <div className='poc-map'>
        <div className='map-animated-wrapper'>
          <div className='map-mask'>
            <MapContainer 
              center={[jsonDefault.map.lat, jsonDefault.map.lng]}
              zoom={jsonDefault.map.zoom} // {customCoords ? customCoords.zoom : coords[2] } // Use customZoom if available, or fallback to the initial zoom level
              attributionControl={false}
              zoomControl={false}
              style={{ height: '100vh', width: '100vw', position: 'absolute' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapHandler />
              <MapMoveEvents />

            </MapContainer>
          </div>
        </div>
      </div>


      {/* BOTTOM BUTTON */}
      <div className='btn-my-location' onClick={handleClickMyLocation}>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
          <path d="M16.1025 32.7895V30.1154C12.8461 29.7826 10.1363 28.5347 7.97331 26.3717C5.81028 24.2087 4.56239 21.499 4.22961 18.2425H1.55554V16.1033H4.22961C4.56239 12.8469 5.81028 10.1371 7.97331 7.9741C10.1363 5.81108 12.8461 4.56318 16.1025 4.23041V1.55634H18.2417V4.23041C21.4982 4.56318 24.2079 5.81108 26.3709 7.9741C28.5339 10.1371 29.7818 12.8469 30.1146 16.1033H32.7887V18.2425H30.1146C29.7818 21.499 28.5339 24.2087 26.3709 26.3717C24.2079 28.5347 21.4982 29.7826 18.2417 30.1154V32.7895H16.1025ZM17.1721 28.0118C20.1433 28.0118 22.6926 26.9481 24.82 24.8207C26.9473 22.6934 28.011 20.1441 28.011 17.1729C28.011 14.2017 26.9473 11.6524 24.82 9.52506C22.6926 7.39769 20.1433 6.33401 17.1721 6.33401C14.2009 6.33401 11.6516 7.39769 9.52427 9.52506C7.3969 11.6524 6.33321 14.2017 6.33321 17.1729C6.33321 20.1441 7.3969 22.6934 9.52427 24.8207C11.6516 26.9481 14.2009 28.0118 17.1721 28.0118ZM17.1721 22.521C15.6746 22.521 14.4089 22.0041 13.3749 20.9701C12.341 19.9361 11.824 18.6704 11.824 17.1729C11.824 15.6754 12.341 14.4097 13.3749 13.3757C14.4089 12.3418 15.6746 11.8248 17.1721 11.8248C18.6696 11.8248 19.9353 12.3418 20.9693 13.3757C22.0033 14.4097 22.5203 15.6754 22.5203 17.1729C22.5203 18.6704 22.0033 19.9361 20.9693 20.9701C19.9353 22.0041 18.6696 22.521 17.1721 22.521ZM17.1721 20.3818C18.0754 20.3818 18.836 20.0728 19.454 19.4548C20.072 18.8368 20.381 18.0761 20.381 17.1729C20.381 16.2697 20.072 15.509 19.454 14.891C18.836 14.273 18.0754 13.964 17.1721 13.964C16.2689 13.964 15.5082 14.273 14.8902 14.891C14.2722 15.509 13.9632 16.2697 13.9632 17.1729C13.9632 18.0761 14.2722 18.8368 14.8902 19.4548C15.5082 20.0728 16.2689 20.3818 17.1721 20.3818Z"/>
        </svg>
      </div>

      {/* LOCATION LOADING OVERLAY */}
      <div className='poc-location-overlay'>
        <div className='location-icon'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.239 7.237c-.004-.009-.288-.017-.24-.078l.137-.085c.013-.077.072-.162-.007-.304l.047-.125-.1.029s.141-.606.33-.332l-.08.093c.122.122.155.426.195.623.115.06.294.071.088.175.106-.018-.561.286-.648.161-.065-.076.288-.127.278-.157zm-.715-.159c-.077.078.003.128.082.094.114-.05.269-.048.284-.202l.073-.091-.101-.135c-.06-.012-.1.064-.137.095l-.066.017-.062.08.007.044-.08.098zm7 9.167l-.733-1.206-.724-1.186c-.73-1.194-1.388-2.276-1.961-3.296l-.07.067c-.376.156-.942-.509-1.339-.531.192.03.018-.49.018-.524-.153-.189-1.123.021-1.378.055-.479.063-.979.057-1.346.355-.258.21-.262.551-.524.716-.17.106-.356.072-.502.209-.258.245-.553.607-.697.929-.062.135.077.458.043.632-.336 1.063.085 2.538 1.375 2.701.312.039.638.209.955.114.252-.076.474-.248.745-.268.377-.025.22.529.737.379.251-.074.365.172.365.359-.084.391-.268.609.088.883.242.188.442.456.486.78.026.182.196.494-.015.602-.149.075-.259.507-.257.649.031.165.365.481.466.621.146.2.039.436.158.663.122.232.237.41.323.645.111.324.958-.007 1.156-.006.673.004 1.014-.944 1.487-1.235.267-.165.192-.616.51-.848.296-.215.608-.344.636-.741.021-.344-.259-1.062-.104-1.353l.102-.165zm-7.301-7.76c.041.172-.119.645-.154.795-.031.138.442.226.415.295.004-.008.642-.22.705-.275l.144-.323c.121-.081.248-.146.384-.196l.164-.285c.056-.021.71-.123.756-.101.165.075.469.389.583.531l.041.032c-.326-.67-.59-1.314-.796-1.942l-.083.036c-.222 0-.528.251-.663.405-.095.104-.669.337-.732.33.33.035.314.276.288.482-.068.476-1.096.035-1.052.216zm10.904 5.049c-.277 4.807-4.253 8.623-9.13 8.623-2.603 0-4.951-1.086-6.618-2.83-.198-.208-.346-.7-.02-.9l.331-.085c.259-.22-.242-1.111-.044-1.254.617-.441.324-.982-.055-1.429-.161-.19-1.043-1.1-1.143-.937.074-.249-.16-.85-.302-1.087-.239-.398-.553-.643-.679-1.081-.05-.174-.05-.704-.153-.826-.041-.05-.358-.185-.347-.257.305-1.82 1.147-3.458 2.364-4.751l.821-.33c.515-.773.545-.173 1.008-.375.154 0 .331-.634.496-.734.289-.185.068-.185.015-.27-.112-.184 2.411-1.103 2.453-.938.034.14-1.249.809-1.108.788-.326.043-.388.627-.328.625.163-.005 1.182-.774 1.657-.61.466.161 1.301-.37 1.627-.64l.04-.038c.029-.761.195-1.494.481-2.172l-.493-.026c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.074 0 11-4.925 11-11 0-.764-.078-1.509-.227-2.229-.491.864-1.044 1.779-1.646 2.763zm1.873-9.1c0 2.45-1.951 5.373-4.5 9.566-2.549-4.193-4.5-7.116-4.5-9.566 0-2.449 2.139-4.434 4.5-4.434s4.5 1.985 4.5 4.434zm-2.75.066c0-.966-.784-1.75-1.75-1.75s-1.75.784-1.75 1.75.784 1.75 1.75 1.75 1.75-.784 1.75-1.75z"/></svg>
        </div>
        <div className='location-text'>
          <h1>Searching</h1>
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        </div>
      </div>

    </div>
  );
}


/*
  MapMove
*/

function MapMoveEvents() {
  const dispatch = useDispatch();
  const map = useMap();
  const marked = useSelector((state) => state.marked);

  useEffect(() => {
    
    // If marker is visible
    const onMoveStart = () => {
      dispatch(setAnimateMarker(false))
    };

    const onMoveEnd = () => {
      if (marked){
        dispatch(setAnimateMarker(true))
      }
    };

    map.on('movestart', onMoveStart);
    map.on('moveend', onMoveEnd);

    return () => {
      map.off('movestart', onMoveStart);
      map.off('moveend', onMoveEnd);
    };
  }, [dispatch, map, marked]);

  return null;
}


/*
  MapHandler
*/

function MapHandler() {
  const dispatch = useDispatch();
  const map = useMap();

  // State - Local
  const [position, setPosition] = useState(null)

  // State - Redux
  const coords = useSelector((state) => state.coords);
  const type = useSelector((state) => state.type);
  const detected = useSelector((state) => state.detected);
  const mapDisabled = useSelector((state) => state.mapDisabled);
  const myLocationCoords = useSelector((state) => state.myLocationCoords);


  const customIcon = L.icon({
    className: 'poc-custom-pin',
    iconUrl: imagePinIcon,
    iconSize: [61, 80],
    iconAnchor: [30, 80],
    shadowUrl: imagePinShadow,
    shadowSize: [38, 8], 
    shadowAnchor: [18, 4] 
  });

  const handleLocationError = () => {
    dispatch(setDetected('not-detected'))
  }

  const handleLocationFound = (e) => {
    dispatch(setDetected('detected'))
    dispatch(setMarker(true));
    dispatch(setType('MyLocation'));
    dispatch(setMyLocationCoords([e.latlng.lat,e.latlng.lng]));
    dispatch(setCoords([e.latlng.lat,e.latlng.lng]));
  }

  const handleClick = (e) => {
    dispatch(setType('MyChoice'))
    if (position) {
      dispatch(setMarker(false));
      setPosition(null);
      dispatch(setMapDisabled(false))
      // map.panBy([0, 126], {animate: false});
    } else {
      dispatch(setMarker(true));
      setPosition(e.latlng)
      dispatch(setCoords([e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6)]))
      dispatch(setMapDisabled(true))
      map.flyTo(e.latlng, 16);
    }
  }

  useMapEvents({ 
    click: handleClick,
  });

  useEffect(() => {
    if (mapDisabled) {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
      map.doubleClickZoom.disable();
    } else {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
      map.doubleClickZoom.enable();
    }
  }, [mapDisabled]);


  useEffect(() => {

    if (detected === 'detected') {
      dispatch(setMarker(true));
      setPosition(myLocationCoords)
      map.flyTo(myLocationCoords, 16);
    }

  }, [coords]);

  useEffect(() => {

    if (!detected) {
      // If detection is not done, false.
      dispatch(setDetected('detection-pending'))
    }

    if (type === 'MyLocation' && detected === 'detection-pending') {
      dispatch(setDetected('detecting'))
      map.locate();
      map.on('locationfound', handleLocationFound);
      map.on('locationerror', handleLocationError);
    }

    return () => {
      if (type === 'MyLocation'  && !detected) {
        map.off('locationfound', handleLocationFound);
        map.off('locationerror', handleLocationError);
      }
    };
  }, [type]);

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      {/* <Popup>You are here</Popup> */}
    </Marker>
  )
}

export default Play;
