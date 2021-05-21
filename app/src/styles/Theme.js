// 앱 테마색 설정

const colors = {
  havelockblue: "#5B79E1", // 메인컬러퍼렁
  mandy: "#E96466", // 서브컬러뻘겅
  white: "#FFFFFF", // 하양이
  black: "#000000", // 깜장이
  selago: "#EBF0FC", // 하늘이
  thatch: "#BE9D9D", // 밝은빨강
  hintofred: "#f1eaea", // 더 밝은 빨강
  pastelgreen: "#79e15b",
  greenhaze: "#009D3E",
  domino: "#958164",
  burningsand: "#D68C6D",
};

const DefaultTheme = {
  carousel: {
    bg: colors.black,
    text: colors.white,
  },
  board: {
    bg: colors.white,
    label: {
      title: colors.black,
      setup: colors.mandy,
    },
  },
  card: {
    bg: colors.selago,
    title: colors.black,
    addr: colors.thatch,
    timer: colors.mandy,
    edit: {
      delete: colors.mandy,
      update: colors.thatch,
    },
    time: {
      bg: colors.havelockblue,
      text: colors.white,
    },
    circle: {
      bg: colors.mandy,
      text: colors.white,
    },
    add: colors.thatch,
    expand: {
      bg: colors.white,
      depart: colors.mandy,
      flag: colors.white,
      walk: colors.hintofred,
      walktext: colors.thatch,
      transtext: colors.white,
      bus: colors.pastelgreen,
      subway: colors.greenhaze,
    },
  },
  menu: {
    title: colors.black,
    circle: colors.black,
    login: {
      info: colors.mandy,
    },
    line: colors.pastelgreen,
    copyright: colors.thatch,
  },
  login: {
    bg: colors.havelockblue,
    naver: colors.navergreen,
    kakao: colors.kakaoyellow,
  },
  profile: {
    bg: colors.havelockblue,
  },
};

// const DarkTheme = {
// };

export default {
  DefaultTheme,
  //  DarkTheme
};
