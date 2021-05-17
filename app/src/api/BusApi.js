import axios from "axios";
import Constants from "expo-constants";

const convert = require("xml-js");

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
      data = JSON.parse(
        convert.xml2json(res.data, {
          compact: true,
          spaces: 4,
        })
      ).ServiceResult.msgBody.itemList;
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
      data = JSON.parse(
        convert.xml2json(res.data, {
          compact: true,
          spaces: 4,
        })
      ).ServiceResult.msgBody.itemList;
    })
    .catch((e) => {
      status = e.response.status;
      data = e.config;
    });

  return { status, data };
};
