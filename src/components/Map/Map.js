import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactDOMServer,
} from 'react';

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
  Circle,
  Tooltip,
  CircleMarker,
  ScaleControl,
} from 'react-leaflet';
import L from 'leaflet';

import './Map.css';

import { PiMapPin, PiMapPinBold } from 'react-icons/pi';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Typography, Box } from '@mui/material';

import MapLogic from './MapLogic';
import Palette from '../../theme/palette';

function StopBubble({ stop, setFocusedStop, map, closeEnough }) {
  const center = [stop.coords.lat + 0.00005, stop.coords.lon];

  const eventHandlers = useMemo(
    () => ({
      click() {
        setFocusedStop(stop);
      },
    }),
    []
  );

  return (
    <CircleMarker
      center={center}
      eventHandlers={eventHandlers}
      radius={40}
      pathOptions={{ color: 'transparent' }}
    >
      <Tooltip direction='top' permanent offset={[0, 20]}>
        {closeEnough ? stop.name : '🚌'}
      </Tooltip>
    </CircleMarker>
  );
}

function PositionMarker({ transparentPosition }) {
  const { STEEL_BLUE } = Palette();

  return (
    <Box
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        backgroundColor: STEEL_BLUE,
        border: '2px solid ' + STEEL_BLUE,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

function Map({
  focusedStop,
  setFocusedStop,
  stopsAround,
  reports,
  center,
  setMapCenter,
  setStopsAround,
  sx,
  ...props
}) {
  const {
    busStops,
    refreshDisplayedStops,
    map,
    scaleRef,
    transparentPosition,
  } = MapLogic({
    setMapCenter,
    stopsAround,
    setStopsAround,
    center,
  });

  const positionMarker = useRef(null);

  /*   useEffect(() => {
    const updateLocalisation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (positionMarker.current)
            positionMarker.current.center = [
              position.coords.latitude,
              position.coords.longitude,
            ];
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    };

    const intervalId =
      'geolocation' in navigator ? setInterval(updateLocalisation, 5000) : null;

    if (intervalId) return () => clearInterval(intervalId);
    else console.log('Loacalisation not supported');
  }, []); */

  const closeEnough =
    !map.current || (map.current && map.current.getZoom() > 15);

  return (
    <Box
      sx={{ width: '100%', height: '100%', position: 'relative', ...sx }}
      onTouchEnd={refreshDisplayedStops}
      {...props}
    >
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        ref={map}
        sx={sx}
        zoomControl={false}
      >
        <Box component={ScaleControl} ref={scaleRef} display='none' />
        <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' />
        {busStops &&
          busStops.map((busStop, i) => (
            <StopBubble
              key={i}
              stop={busStop}
              map={map}
              setFocusedStop={setFocusedStop}
              closeEnough={closeEnough}
            />
          ))}

        <Marker
          position={center}
          icon={L.divIcon({
            html: renderToString(<PositionMarker />),
            className:
              'position-marker' +
              (transparentPosition ? ' transparent-marker' : ''),
          })}
        />
      </MapContainer>
    </Box>
  );
}

export default Map;
