import axios from "axios";

// 그룹 멤버 가져오기 - 로그인 후 그룹 페이지 접근 시
export const getGroupMember = async (req) => {
  let status;
  let data;

  await axios
    .get(`http://k4a104.p.ssafy.io:8080/groupalarm/take/${req.uid}`)
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

// 그룹 알람 가져오기 - 로그인 후 그룹 페이지 접근 시
export const getGroupAlarm = async (req) => {
  let status;
  let data;

  await axios
    .get(`http://k4a104.p.ssafy.io:8080/route/info/group/${req.uid}`)
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

// 그룹 멤버 등록 : List<String> uids 전달
export const createGroupInfo = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/groupalarm/make`, req)
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

// 그룹 알람 등록 - 경로
export const createGroupAlarm = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/groupalarm/register/route`, req)
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

// 그룹 알람 등록 - 막차인 경우
export const createGroupAlarmLast = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/groupalarm/register/last`, req)
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
