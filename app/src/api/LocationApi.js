import axios from "axios";
import Constants from "expo-constants";

const restApiKey = Constants.manifest.extra.kakaoRestApiKey;

export const searchLocationByAddress = async (address) => {
  let status;
  let data;

  const url = "https://dapi.kakao.com/v2/local/search/address.json";
  const getQuery = `?query=${address}`;

  await axios
    .get(url + getQuery, {
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    })
    .then((res) => {
      status = res.status;
      data = res.data;
    })
    .catch();

  return { status, data };
};

export const searchLocationByKeyword = async (keyword) => {
  let status;
  let data;

  const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
  const getQuery = `?query=${keyword}`;

  await axios
    .get(url + getQuery, {
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    })
    .then((res) => {
      status = res.status;
      data = res.data;
    })
    .catch();

  return { status, data };
};
