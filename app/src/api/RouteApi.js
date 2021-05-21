import axios from "axios";

export const getAllRoute = async (req) => {
  let status;
  let data;

  await axios
    .get(`http://k4a104.p.ssafy.io:8080/route/info/${req.uid}`)
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

// 경로 & 막차 & 비로그인
export const getRouteLastWithout = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/route/findLast/without`, req)
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

// 경로 & 막차 & 로그인
export const getRouteLastWith = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/route/findLast/with`, req)
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

// 경로 & 특정시간 & 비로그인
export const getRouteWithout = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/route/find/without`, req)
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

// 경로 & 특정시간 & 로그인
export const getRouteWith = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/route/find/with`, req)
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
