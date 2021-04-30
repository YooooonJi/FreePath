// 전역 스타일 설정

import styled from "styled-components";

// 사용 예시
const GlobalText = styled.Text`
  font-size: 12px;
  line-height: 14px; // font-size의 1.1배(소수점 올림)
  font-family: "5"; // 숫자가 클 수록 굵음 1~6
`;

export default { GlobalText };
