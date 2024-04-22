import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { LatLng } from 'leaflet';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import Helper from '../../helpers';

const MapLogic = ({ setMapCenter, stopsAround, setStopsAround, center }) => {
  const { API_ORIGIN } = PageLogicHelper();
  const { findListDifference } = Helper();

  const map = useRef(null);
  const scaleRef = useRef(null);

  const [busStops, setBusStops] = useState(stopsAround);
  const [transparentPosition, setTransparentPosition] = useState(false);

  // Initialize the breathing effect and get the user's position
  useEffect(() => {
    const breathingPosition = setInterval(() => {
      setTransparentPosition((prev) => {
        return !prev;
      });
    }, 1000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [46.537314, 6.578413]; // [position.coords.latitude, position.coords.longitude]
        setMapCenter(coords);

        axios
          .get(API_ORIGIN + '/stop', {
            params: {
              lat: coords[0],
              lon: coords[1],
              radius: 300,
            },
          })
          .then(({ data }) => {
            setStopsAround(data);
            clearInterval(breathingPosition);
            setTransparentPosition(false);
          })
          .catch((err) => console.log(err));
      },
      (error) => {
        console.error('Error getting location:', error.message);
      }
    );

    return () => clearInterval(breathingPosition);
  }, []);

  // Center the map to the center given by the parent component and refresh the displayed stops
  useEffect(() => {
    if (!map.current || !center) return;
    map.current.setView(center);
    refreshDisplayedStops(center);
  }, [center]);

  const refreshDisplayedStops = () => {
    axios
      .get(API_ORIGIN + '/stop', {
        params: {
          lat: map.current.getCenter().lat,
          lon: map.current.getCenter().lng,
          radius: computeViewRadius(),
        },
      })
      .then(({ data }) => {
        const [addedStops, removedStops] = findListDifference(busStops, data);

        if (busStops.length > 120) setBusStops(data);
        else setBusStops(busStops.concat(addedStops));
      })
      .catch((err) => console.log(err));
  };

  const computeViewRadius = () => {
    const dist = map.current
      .containerPointToLatLng([0, 0])
      .distanceTo(
        map.current.containerPointToLatLng([
          map.current.getSize().x,
          map.current.getSize().y,
        ])
      );

    return Math.round(dist / 2);
  };

  return {
    busStops,
    refreshDisplayedStops,
    map,
    scaleRef,
    transparentPosition,
  };
};

export default MapLogic;
