import axios from "axios";

export const getTestProfile = async () => {
  let status;
  let data;

  await axios
    .get("http://k4a104.p.ssafy.io:8080/profile/testing")
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

export const postSampleCode = async (req, config) => {
  let status;
  let data;

  await axios
    .post(
      "http://k4a104.p.ssafy.io:8080/route/findLast",
      req,
      config
      // config는 header 설정 같은거 넣어서 같이 보낼 때 쓰임 (예시)
      // {
      //   headers: {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      // }
    )
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
