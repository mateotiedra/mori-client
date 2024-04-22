import axios from 'axios';
import { useEffect, useState } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { navigate, useLoadPage, API_ORIGIN, pageStatus, setPageStatus } =
    PageLogicHelper();

  const [focusOnMap, setSetFocusOnMap] = useState(true);
  const setFocusOnMap = (newFocusOnMap) => {
    setSetFocusOnMap(newFocusOnMap);
    if (pageStatus !== 'recent') setPageStatus('recent');
  };

  const [focusedStop, setFocusedStop] = useState(null);
  const [reports, setReports] = useState();
  const [mapCenter, setMapCenter] = useState([46.520308, 6.630665]);
  const [stopsAround, setStopsAround] = useState([]);

  useLoadPage(async () => {
    await axios
      .get(API_ORIGIN + '/latest')
      .then(({ data }) => setReports(data.reports))
      .catch((err) => console.log(err));

    setPageStatus('recent');
  });

  const selectFocusedStop = (stop) => {
    setPageStatus('stop');
    setFocusedStop(stop);
  };

  const newReport = () => {
    setPageStatus('new-report');
  };

  return {
    reports,
    focusOnMap,
    setFocusOnMap,
    pageStatus,
    focusedStop,
    selectFocusedStop,
    newReport,
    mapCenter,
    setMapCenter,
    stopsAround,
    setStopsAround,
  };
};

/*  // Fetch the best sellers
    axios
      .get(API_ORIGIN + '/book/best', { params: { limit: 3 } })
      .then(({ data }) => setBestSellers(data))
      .catch((err) => console.log(err)); */
/*// Fetch the best school
     axios
      .get(API_ORIGIN + '/institution/best')
      .then(({ data }) => setBestInstitutions(data))
      .catch((err) => console.log(err)); */
/* 
  const goToSearch = () => {
    navigate('/search');
  }; */

export default HomeLogic;
