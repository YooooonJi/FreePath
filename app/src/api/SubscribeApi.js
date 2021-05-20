import axios from "axios";

// 구독 & 특정시간 & 비로그인
export const getSubsWithout = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/subscribe/find/without`, req)
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

// 구독 & 특정시간 & 로그인
export const getSubsWith = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/subscribe/find/with`, req)
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
