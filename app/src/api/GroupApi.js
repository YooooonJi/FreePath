import axios from "axios";

// 그룹원 정보 가져오기
export const getGroupMember = async (req) => {
  let status;
  let data;

  await axios
    .get(`http://k4a104.p.ssafy.io:8080/groupalarm/member/${req.uid}`)
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
export const findProfileByEmail = async (req) => {
  let status;
  let data;

  await axios
    .post(`http://k4a104.p.ssafy.io:8080/profile/basic`, req)
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

// 그룹 생성 : List<String> uids 전달
export const createGroup = async (req) => {
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

// 그룹 카운트 호출
export const getGroupCount = async (req) => {
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

// 그룹 알림 경로 리스트 가져오기
export const getAllGroupAlarm = async (req) => {
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

// 그룹 알람 등록 - 경로 - 특정시간
export const addGroupAlarmTime = async (req) => {
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

// 그룹 알람 등록 - 경로 - 막차
export const addGroupAlarmLast = async (req) => {
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
