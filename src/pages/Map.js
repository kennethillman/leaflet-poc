import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents  } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setCoords, setName, setMarker, setDetected, setMapDisabled, setType, setMyLocationCoords, setAnimateMarker } from '../store/actions';
import L from 'leaflet';

import jsonDefault from '../data/default.json';

import imagePinShadow from "../assets/images/pinShadow.png";
import imagePinIcon from "../assets/images/pinIcon.png";


function Play() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State - Local
  const [showDialog, setShowDialog] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [gamePlayed, setGamePlayed] = useState(null);
  const [searchOption, setSearchOption] = useState('SÖK');

  // State - Redux
  const marked = useSelector((state) => state.marked);
  const detected = useSelector((state) => state.detected);
  const coords = useSelector((state) => state.coords);
  const name = useSelector((state) => state.name);
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
    <div className={`sal-page-play type-${type} ${animateMarker ? 'marker-animate' : 'marker-hide'} ${marked ? 'position-marked' : ''} ${detected ? detected : ''}  ${showDialog ? 'show-dialog' : ''} ${showSearchOverlay ? 'show-search-overlay' : ''}`}>
      
      
      {/* THE MAP */}
      <div className='sal-map'>
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




      {/* BOTTOM BUTTONS */}
      <div className='sal-bottom-buttons'>
        <div className='bottom-btn btn-my-location' onClick={handleClickMyLocation}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <path d="M16.1025 32.7895V30.1154C12.8461 29.7826 10.1363 28.5347 7.97331 26.3717C5.81028 24.2087 4.56239 21.499 4.22961 18.2425H1.55554V16.1033H4.22961C4.56239 12.8469 5.81028 10.1371 7.97331 7.9741C10.1363 5.81108 12.8461 4.56318 16.1025 4.23041V1.55634H18.2417V4.23041C21.4982 4.56318 24.2079 5.81108 26.3709 7.9741C28.5339 10.1371 29.7818 12.8469 30.1146 16.1033H32.7887V18.2425H30.1146C29.7818 21.499 28.5339 24.2087 26.3709 26.3717C24.2079 28.5347 21.4982 29.7826 18.2417 30.1154V32.7895H16.1025ZM17.1721 28.0118C20.1433 28.0118 22.6926 26.9481 24.82 24.8207C26.9473 22.6934 28.011 20.1441 28.011 17.1729C28.011 14.2017 26.9473 11.6524 24.82 9.52506C22.6926 7.39769 20.1433 6.33401 17.1721 6.33401C14.2009 6.33401 11.6516 7.39769 9.52427 9.52506C7.3969 11.6524 6.33321 14.2017 6.33321 17.1729C6.33321 20.1441 7.3969 22.6934 9.52427 24.8207C11.6516 26.9481 14.2009 28.0118 17.1721 28.0118ZM17.1721 22.521C15.6746 22.521 14.4089 22.0041 13.3749 20.9701C12.341 19.9361 11.824 18.6704 11.824 17.1729C11.824 15.6754 12.341 14.4097 13.3749 13.3757C14.4089 12.3418 15.6746 11.8248 17.1721 11.8248C18.6696 11.8248 19.9353 12.3418 20.9693 13.3757C22.0033 14.4097 22.5203 15.6754 22.5203 17.1729C22.5203 18.6704 22.0033 19.9361 20.9693 20.9701C19.9353 22.0041 18.6696 22.521 17.1721 22.521ZM17.1721 20.3818C18.0754 20.3818 18.836 20.0728 19.454 19.4548C20.072 18.8368 20.381 18.0761 20.381 17.1729C20.381 16.2697 20.072 15.509 19.454 14.891C18.836 14.273 18.0754 13.964 17.1721 13.964C16.2689 13.964 15.5082 14.273 14.8902 14.891C14.2722 15.509 13.9632 16.2697 13.9632 17.1729C13.9632 18.0761 14.2722 18.8368 14.8902 19.4548C15.5082 20.0728 16.2689 20.3818 17.1721 20.3818Z" fill="#1047B8"/>
          </svg>
        </div>
      </div>

      {/* LOCATION OVERLAY */}
      <div className='sal-location-overlay'>
        <div className='location-icon'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 26" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.60859 17.7287C4.34766 20.2746 6.97812 23.0317 10.5 26C14.0219 23.0317 16.6523 20.2746 18.3914 17.7287C20.1305 15.1829 21 12.8267 21 10.66C21 7.41 19.9445 4.82083 17.8336 2.8925C15.7227 0.964167 13.2781 0 10.5 0C7.72187 0 5.27734 0.964167 3.16641 2.8925C1.05547 4.82083 0 7.41 0 10.66C0 12.8267 0.869532 15.1829 2.60859 17.7287ZM9.96251 14.4579L10.5006 14.9501L11.0388 14.4579C11.9663 13.5978 12.7319 12.8551 13.3356 12.2299C13.9394 11.6048 14.4206 11.0461 14.7794 10.554C15.1381 10.0618 15.3897 9.6162 15.5341 9.21716C15.6784 8.81811 15.7506 8.41463 15.7506 8.00672C15.7506 7.20863 15.4859 6.54134 14.9566 6.00484C14.4272 5.46835 13.7731 5.2001 12.9944 5.2001C12.5219 5.2001 12.08 5.31317 11.6688 5.53929C11.2575 5.76542 10.8681 6.11791 10.5006 6.59676C10.1856 6.14451 9.81595 5.79867 9.39158 5.55924C8.9672 5.31982 8.50564 5.2001 8.00689 5.2001C7.22814 5.2001 6.57408 5.46835 6.0447 6.00484C5.51533 6.54134 5.25064 7.20863 5.25064 8.00672C5.25064 8.41463 5.32283 8.81811 5.4672 9.21716C5.61158 9.6162 5.86314 10.0618 6.22189 10.554C6.58064 11.0461 7.06189 11.6048 7.66564 12.2299C8.26939 12.8551 9.03501 13.5978 9.96251 14.4579Z" fill="#ffffff"></path></svg>
        </div>
        <div className='location-text'>
          <h1>Vi letar efter dig.</h1>
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
    className: 'sal-custom-pin',
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

  // detected (clicked ACCEPT and found)
  // not-detected (Timeed out or click BLOCK)
  // detection-pending  (clicked play home adress on startpage. not touched "location")
  // detecting ()


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
      map.panBy([0, 126], {animate: false});
      // console.log(map.getCenter(), coords)
      // console.log(map.distance(map.getCenter(),coords))
      // map.flyTo(coords, 16);
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
