// 전역 스타일 설정

import styled from "styled-components";

// 사용 예시
const GlobalText = styled.Text`
  font-size: 12px;
  line-height: 14px;
  // font-size의 1.1 ~ 1.2배(크기마다 적용해보고 잘리지 않을 정도로)
  // ** font-size 20px 넘어가면 1.1배로 잘려서 수정함 **
  font-family: "5";
  // 숫자가 클 수록 굵음 1~6
`;

export default { GlobalText };
