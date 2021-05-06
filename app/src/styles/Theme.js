// 앱 테마색 설정

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  mandy: "#DD5254",
  prim: "#F9F1F7",
  bonjour: "#EDE9EC",
  shadylady: "#ADA9AC",
  fallgreen: "#E7E8B7",
  domino: "#958164",
  havelockblue: "#5B79E1",
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
    bg: colors.prim,
    title: colors.black,
    addr: colors.shadylady,
    timer: colors.mandy,
    time: {
      bg: colors.fallgreen,
      text: colors.domino,
    },
    circle: {
      bg: colors.mandy,
      text: colors.white,
    },
    add: colors.shadylady,
  },
  menu: {
    title: colors.black,
    circle: colors.black,
    login: {
      info: colors.mandy,
    },
    line: colors.bonjour,
    copyright: colors.shadylady,
  },
  login: {
    bg: colors.havelockblue,
    naver: colors.navergreen,
    kakao: colors.kakaoyellow,
  },
};

// const DarkTheme = {
// };

export default {
  DefaultTheme,
  //  DarkTheme
};
