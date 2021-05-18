import axios from "axios";
import Constants from "expo-constants";

const restApiKey = `?ServiceKey=${Constants.manifest.extra.dataGoKrApiKey}`;

export const getStationByNameList = async (busStop) => {
  let status;
  let data;

  const url = "http://ws.bus.go.kr/api/rest/stationinfo/getStationByName";
  const getQuery = `&stSrch=${encodeURI(busStop)}`;

  await axios
    .get(url + restApiKey + getQuery)
    .then((res) => {
      status = res.status;
      data = res.data;
    })
    .catch((e) => {
      status = e.response.status;
      data = e.config;
    });

  return { status, data };
};

export const getRouteByStationList = async (arsId) => {
  let status;
  let data;

  const url = "http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation";
  const getQuery = `&arsId=${arsId}`;

  await axios
    .get(url + restApiKey + getQuery)
    .then((res) => {
      status = res.status;
      data = res.data;
    })
    .catch((e) => {
      status = e.response.status;
      data = e.config;
    });

  return { status, data };
};
