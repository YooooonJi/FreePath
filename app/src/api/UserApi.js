import axios from "axios";

// 회원가입 시
export const createUser = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/profile/join`, req)
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

// 로그인 후 프로필 페이지 접근 시
export const getAllProfile = async (req) => {
  let status;
  let data;

  await axios
    .get(`http://k4a104.p.ssafy.io:8080/profile/total/${req.uid}`)
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

// 즐겨찾기 업데이트
export const updateLocation = async (req) => {
  let status;
  let data;

  await axios
    .put(`http://k4a104.p.ssafy.io:8080/profile/update/location`, req)
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

// 추가정보 업데이트
export const updateCustom = async (req) => {
  let status;
  let data;

  await axios
    .put(`http://k4a104.p.ssafy.io:8080/profile/update/custom`, req)
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
