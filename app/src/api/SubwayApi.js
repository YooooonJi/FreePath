import axios from "axios";
import Constants from "expo-constants";

const restApiKey = Constants.manifest.extra.seoulDataApiKey;

export const searchInfoBySubwayNameService = async (station) => {
  let status;
  let data;

  const url = `http://openAPI.seoul.go.kr:8088/${restApiKey}/json/SearchInfoBySubwayNameService/1/5/`;

  await axios
    .get(url + station)
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

export const SearchSTNBySubwayLineInfo = async (line) => {
  let status;
  let data;

  const url = `http://openAPI.seoul.go.kr:8088/${restApiKey}/json/SearchSTNBySubwayLineInfo/1/100/ / /`;

  await axios
    .get(url + line)
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
